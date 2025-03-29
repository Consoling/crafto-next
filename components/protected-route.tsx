'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthedContext';
import { useRouter } from 'next/navigation';
import { BarLoader } from 'react-spinners';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push('/sign-in'); 
        }
        console.log(isAuthenticated)
    }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
        return <div><BarLoader color="#7c30d2" /></div>; 
    }

    return <>{children}</>; 
}
