'use client'

import { TopBar } from '@/components/navbars/profile-nav-bar'
import React from 'react'
import { Edit, ChevronRight } from 'lucide-react'
import { useUser } from '@/context/UserContext'

const ProfilePage = () => {
  const {userId, userName, phoneNumber, membershipType, language} = useUser()
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      <TopBar />
      
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-8">
        {/* Profile Picture Section */}
        <div className="relative mb-6 mt-8">
          <img 
            src="/assets/logo-cropped.png" 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-1 shadow-lg border-[#fd4878]" 
          />
          <button className="absolute bottom-0 right-0 bg-[#fd4878] text-white rounded-full p-2 shadow-lg hover:bg-[#fd4878]/70 transition-all">
            <Edit size={20} />
          </button>
        </div>

        {/* User Information Box */}
        <div className="w-full max-w-md space-y-4">
          {/* Username */}
          <div className="flex items-center justify-between p-4 bg-[#fd4878]/10 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl">
            <div className="font-semibold">Username</div>
            <div className="flex items-center">
              <div className="text-sm font-mono text-right">{userName ? userName : 'N/A'}</div>
              <ChevronRight size={20} className="ml-2 text-[#fd4878]" />
            </div>
          </div>

          {/* Email */}
          {/* <div className="flex items-center justify-between p-4 bg-[#fd4878]/10 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl">
            <div className="font-semibold">Email</div>
            <div className="flex items-center">
              {}
              <ChevronRight size={20} className="ml-2 text-[#fd4878]" />
            </div>
          </div> */}

          {/* Membership Type */}
          <div className="flex items-center justify-between p-4 bg-[#fd4878]/10 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl">
            <div className="font-semibold">Membership</div>
            <div className="flex items-center">
              <div className="text-sm font-mono text-right">{membershipType ? membershipType : "Free"}</div>
              <ChevronRight size={20} className="ml-2 text-[#fd4878]" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between p-4 bg-[#fd4878]/10 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl">
            <div className="font-semibold">Phone</div>
            <div className="flex items-center">
              <div className="text-sm font-mono text-right">{phoneNumber? phoneNumber : "N/A"}</div>
              <ChevronRight size={20} className="ml-2 text-[#fd4878]" />
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between p-4 bg-[#fd4878]/10 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl">
            <div className="font-semibold">Language</div>
            <div className="flex items-center">
              <div className="text-sm font-mono text-right">{language ? language : "en"}</div>
              <ChevronRight size={20} className="ml-2 text-[#fd4878]" />
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-7">
          <button className="px-6 py-2 bg-[#fd4878] text-white rounded-full hover:bg-blue-700 transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
