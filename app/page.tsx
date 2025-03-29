'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { SeparatorVertical, Smartphone, Tablet } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarLoader } from "react-spinners";
import useSessionRedirect from "@/hooks/useSessionRedirect";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useSessionRedirect();

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <motion.div
            className="text-white text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center items-center">
              <BarLoader color="#7c30d2" />
            </div>
            <p className="text-sm font-thin font-mono mt-4 text-center">Initializing...</p>
          </motion.div>
        </div>
      ) : (
        !isMobile && (
          <div className="relative h-screen w-full flex justify-center items-center bg-[#18181b] overflow-hidden">
            {/* <div className="absolute top-0 left-0 w-full h-full">
              <Image
                src="/assets/logo-cropped.jpg"
                alt="logo"
                width={500}
                height={500}
                objectFit="cover"
                className="opacity-10"
              />
            </div> */}
            <motion.div
              className="relative p-20 max-w-xl text-center border-l-purple-600 border-l-4 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg text-white"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <motion.h1
                className="text-xl font-semibold"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Welcome to
              </motion.h1>
              <motion.h1
                className="text-3xl font-bold mb-10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Perfect Photo Frame
              </motion.h1> */}
               <div className=" flex justify-center pb-8 items-center w-full h-full">
              <Image
                src="/assets/logo.png"
                alt="logo"
                width={150}
                height={150}
                objectFit="cover"
                
              />
            </div> 
              <motion.div
                className="flex justify-center items-center mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Smartphone size={40} className="mr-2" />
                <SeparatorVertical size={40} className="mx-2" />
                <Tablet size={40} />
              </motion.div>
              <motion.p
                className="text-2xl mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Please use mobile or tablet to access this app
              </motion.p>
              <motion.p
                className="text-sm font-normal leading-0 text-yellow-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                This site is designed for mobile/tablet devices only.
              </motion.p>
            </motion.div>
          </div>
        ) 
      )}
    </>
  );
};

export default Layout;
