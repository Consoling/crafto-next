'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthedContext";
import BottomNavBar from "@/components/bottom-navbar"; 

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayouts = ({ children }: HomeLayoutProps) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="relative min-h-screen pb-16"> 
            {children}
            <BottomNavBar /> 
        </div>
    );
};

export default HomeLayouts;
