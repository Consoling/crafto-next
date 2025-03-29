'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, User, Bookmark } from 'lucide-react';


const TopBar = () => {
  const router = useRouter();
  
  // Mock array for saved posts (initially empty)
  const savedPosts: string[] = [];

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 shadow-md flex items-center justify-between px-4 py-3 md:px-8 z-10 bg-gradient-to-r from-[#fd4878] to-[#d7043e]"
    >
      {/* Saved Posts Text */}
      <div className="text-white font-bold text-xl md:text-2xl">
        Settings
      </div>

      <div className='flex justify-center items-center space-x-5'>
        {/* Create Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => router.push('/create')}
          className="bg-white text-[#fd4878] p-3 rounded-full shadow-md hover:bg-[#d7043e] hover:text-white transition-transform"
        >
          <Plus size={18} />
        </motion.button>

        {/* Profile Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => router.push('/profile')}
          className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-md"
        >
          <User size={20} className="text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};


export { TopBar };
