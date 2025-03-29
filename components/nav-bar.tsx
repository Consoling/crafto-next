'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Plus, User } from 'lucide-react';
import { Input } from './ui/input';


const TopBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Mock API search (replace with actual API call)
      const mockResults = ['Apple', 'Banana', 'Cherry'].filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 shadow-md flex items-center justify-between px-4 py-3 md:px-8 z-10 bg-gradient-to-r from-[#fd4878] to-[#d7043e]"
    >
      {/* Search Bar */}
      <div className="relative w-1/2 md:w-1/3">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="rounded-full border-2 border-white bg-white/10 text-white px-4 py-2 focus:ring-2 focus:ring-white focus:outline-none placeholder:text-white"
        />
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-1 z-10">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => router.push(`/search?query=${result}`)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {result}
              </button>
            ))}
          </div>
        )}
      </div>

      
     <div className='flex justify-center items-center space-x-5'>
     <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={() => router.push('/create')}
        className="bg-white text-[#fd4878] p-3 rounded-full shadow-md hover:bg-[#d7043e] hover:text-white transition-transform"
      >
        <Plus size={18} />
      </motion.button>

      
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

export default TopBar;
