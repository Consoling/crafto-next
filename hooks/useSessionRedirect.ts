import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useSessionRedirect = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const session = sessionStorage.getItem('access_token'); // or check cookies here

        // Check session and redirect
        if (session) {
            router.push('/home');
        } else {
            router.push('/sign-in');
        }

        setLoading(false);
    }, [router]);

    return loading;
};

export default useSessionRedirect;
