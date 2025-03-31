"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUserNameModal } from "@/hooks/useUserNameModal";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthedContext";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1),
});

export const UsernameModal = () => {
  const usernameModal = useUserNameModal();

  const [loading, setLoading] = useState(false);

  const { userId } = useUser();
  const { authToken } = useAuth();
  const router = useRouter();
  const {  setUserName } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Your dashboard is getting prepared...", {
      duration: Infinity,
    });

    try {
      setLoading(true);

      for (let progress = 0; progress <= 100; progress += 10) {
        await delay(300);
        toast.loading(`Preparing your app.. ${progress}%`, {
          id: toastId,
        });
      }

      await delay(3000 - 300 * 10);

      const uservalues = {
        userId: userId,
        username: values.username,
      };

      

      const response = await axios.put(
        `/api/v1/update-username`,
        uservalues,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status !== 200) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        const data = response.data;
        console.log(data)
        toast.success("Dashboard generated successfully!", { id: toastId });
        setUserName(values.username);
        localStorage.setItem("user_name", values.username);
        router.push("/home");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Username"
      description="Please enter your desired username"
      isOpen={usernameModal.isOpen}
      onClose={usernameModal.onClose}
    >
      <div className="">
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Shopify Store Name</FormLabel> */}
                      <FormControl>
                        <Input
                          disabled={loading}
                          className="placeholder:text-[#000000] placeholder:font-normal ring-2 ring-[#fd4878]/70 outline-1 active:outline-none active:border-none active:ring-0"
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    className=""
                    variant="outline"
                    onClick={usernameModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
