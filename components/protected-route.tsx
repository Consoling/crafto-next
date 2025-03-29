'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { BarLoader } from 'react-spinners';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { authStatus } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (authStatus === false) {
            router.push('/sign-in'); 
        }
        console.log(authStatus)
    }, [authStatus, router]);

    if (authStatus === null) {
        return <div><BarLoader color="#7c30d2" /></div>; 
    }

    return <>{children}</>; 
}
