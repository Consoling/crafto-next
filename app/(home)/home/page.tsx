'use client'

import React from 'react';
import TopBar from '@/components/navbars/nav-bar';
import { motion } from 'framer-motion';
import { FaDownload, FaEdit, FaWhatsapp, FaInstagram, FaFacebook, FaSave } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const posts = [
  {
    id: 1,
    image: '/assets/post1.jpg',
    caption: 'Beautiful scenery of nature 🌄',
    likes: 120,
    comments: 45,
  },
  {
    id: 2,
    image: '/assets/post1.jpg',
    caption: 'Delicious food to savor 🍽️',
    likes: 98,
    comments: 30,
  },
  {
    id: 3,
    image: '/assets/post1.jpg', 
    caption: 'A masterpiece of art 🎨',
    likes: 150,
    comments: 60,
  },
];

const tags = ['Nature', 'Travel', 'Food', 'Art', 'Music', 'Tech', 'Sports', 'Fashion', 'Photography', 'Lifestyle'];

const HomePage = () => {
  const handleDownload = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename || 'download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      <TopBar />

      <main className="flex flex-col flex-1">
        {/* Fixed Top Section */}
        <div className="h-[15vh] overflow-hidden px-2 bg-white bg-opacity-20 backdrop-blur-md border border-white/30 shadow-md rounded-md py-24">
          <div className="space-y-2 -my-3">
            {['ltr', 'rtl', 'ltr'].map((direction, index) => (
              <motion.div
                key={index}
                className="flex space-x-2 "
                animate={{
                  x: direction === 'ltr' ? ['100%', '-100%'] : ['-100%', '100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {['Nature', 'Travel', 'Food', 'Art', 'Music', 'Tech', 'Sports', 'Fashion'].map((tag, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 bg-[#fd4878] text-white text-sm rounded-full shadow-md"
                  >
                    {tag}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scrollable Post Section */}
        <div className="flex-1 overflow-y-auto mt-4 bg-white shadow-md rounded-md p-4 px-4">
          {posts.map((post) => (
            <div key={post.id} className="mb-8">
              <div className="relative w-full h-[70vh] bg-gray-100 rounded-md overflow-hidden">
              <Image
              src={post.image}
              alt={`Post ${post.id}`}
              layout="fill" // Makes the image cover the container
              objectFit="cover" // Maintains aspect ratio while covering the area
              priority={true} // Optional: load important images faster
            />
              </div>
              <div className="mt-4 space-y-2">


                {/* Horizontal Scrollable Section */}
                <div className="flex space-x-4 justify-center overflow-x-auto bg-gray-100 p-2 rounded-md shadow-md">
                  {/* Download Button */}
                  <Button className="flex items-center justify-center w-10 h-10 bg-white text-blue-500 hover:bg-blue-50 rounded-full shadow-md" onClick={() => handleDownload(post.image, `post-${post.caption}.jpg`)}>
                    <FaDownload size={20} />
                  </Button>

                  {/* Edit Button */}
                  <Button className="flex items-center justify-center w-10 h-10 bg-white text-green-500 hover:bg-green-50 rounded-full shadow-md">
                    <FaEdit size={20} />
                  </Button>

                  {/* WhatsApp Button */}
                  <Button className="flex items-center justify-center w-10 h-10 bg-white text-green-500 hover:bg-green-50 rounded-full shadow-md">
                    <FaWhatsapp size={20} />
                  </Button>

                  {/* Instagram Button */}
                  <Button className="flex items-center justify-center w-10 h-10 bg-white text-pink-500 hover:bg-pink-50 rounded-full shadow-md">
                    <FaInstagram size={20} />
                  </Button>

                  {/* Facebook Button */}
                  <Button className="flex items-center justify-center w-10 h-10 bg-white text-blue-700 hover:bg-blue-50 rounded-full shadow-md">
                    <FaFacebook size={20} />
                  </Button>
                  
                  <Button className="flex items-center justify-center w-10 h-10 bg-white text-blue-700 hover:bg-blue-50 rounded-full shadow-md">
                    <FaSave size={20} />
                  </Button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
