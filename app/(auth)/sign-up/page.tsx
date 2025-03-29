'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  phoneNumber: z.string().min(10, 'Phone number is required').regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: FormData) => {
    try {

      toast('Submitting...', { icon: '⏳' });

      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_SIGNUP_ROUTE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Success
        toast.success('Account created successfully!');
        router.push('/home')

      } else {

        toast.error(result.message || 'Something went wrong');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error('Error: ' + error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg-crafto.png')" }}>
      <div className="flex justify-center items-center h-full ">
        <div className="w-full max-w-md bg-white/90 p-10  rounded-3xl shadow-lg">
          {/* Logo at the top of the form */}
          <div className="mb-8 text-center">
            <img src="/assets/logo-cropped.png" alt="Logo" className="w-40 mx-auto" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-3xl font-semibold mb-6">
              <span className="block text-2xl font-bold">Welcome to</span>
              <span className="block text-3xl font-extrabold text-[#fd4878]">Perfect Photo Frame</span>
            </h2>

            <div className="mb-6">
              <PhoneInput
                international
                defaultCountry="IN"
                value={watch('phoneNumber')}
                onChange={(value) => setValue('phoneNumber', value || '')}
                className="w-full py-3 px-4 border border-gray-400 rounded-md focus:outline-none  focus:ring-2 focus:ring-[#fd4878] focus:border-none"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}

            <div className="mb-6 relative">
              <input
                type="password"
                placeholder="Password"
                {...register('password')}
                className="w-full py-3 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fd4878] focus:border-none "
              />
               <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500 hover:text-[#fd4878] transition"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              {/* Forgot Password link */}
              {/* <Link href="/forgot-password" className="absolute right-3 -bottom-7 text-sm text-[#fd4878] font-semibold">
                Forgot Password?
              </Link> */}
            </div>


            <button
              type="submit"
              className="w-full py-3 mt-6 bg-[#fd4878] text-white font-semibold rounded-md hover:bg-[#d7043e] transition"
            >
              Create Account
            </button>

            <div className="mt-6 text-center text-sm">
              <span>Already have an account? </span>
              <Link href="/sign-in" className="text-[#fd4878] font-semibold">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
