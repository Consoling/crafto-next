'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, User, Plus, Settings, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNavBar = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('');

    const navItems = [
        { icon: <Home size={24} />, path: '/home', label: 'Home' },
        { icon: <Bookmark size={24} />, path: '/saved-posts', label: "Saved" },
        { icon: <Plus size={28} />, path: '/create', label: 'Create' },
        { icon: <Settings size={24} />, path: '/settings', label: 'Settings' },
        { icon: <User size={24} />, path: '/profile', label: 'Profile' },
    ];
    const pathname = usePathname();

    // Update activeTab based on the current route
    useEffect(() => {
        const activeItem = navItems.find(item => item.path === pathname);
        if (activeItem) {
            setActiveTab(activeItem.label);
        }
    }, [pathname]);

    const handleNavClick = (path: string, label: string) => {
        if (pathname !== path) {
            router.push(path);
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-md h-16 flex items-center justify-around border-t border-gray-200 lg:hidden"
        >
            {navItems.map((item) => (
                <motion.div
                    key={item.label}
                    onClick={() => handleNavClick(item.path, item.label)}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`flex flex-col items-center justify-center cursor-pointer transition-transform transform ${
                        activeTab === item.label ? 'scale-110 text-[#fd4878]' : 'text-gray-500'
                    }`}
                >
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default BottomNavBar;
