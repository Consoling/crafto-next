import {TopBar} from '@/components/navbars/saved-post-nav'
import { Bookmark } from 'lucide-react';
import React from 'react'

const SavedPosts = () => {
  const savedPosts: string[] = []; // Mock empty data array
  return (
    <div className='relative min-h-screen bg-gray-50 flex flex-col'>
      <TopBar />
     <>
     <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      {savedPosts.length === 0 ? (
        <div className="flex flex-col items-center">
          <Bookmark size={100} className="text-gray-500" />
          <p className="text-gray-500 text-lg mt-4">No Saved Posts Found</p>
        </div>
      ) : (
        <div>
          {/* Render saved posts if any */}
          <ul>
            {savedPosts.map((post, index) => (
              <li key={index}>{post}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
     </>
    </div>
  )
}

export default SavedPosts
