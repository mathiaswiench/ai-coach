import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && process.env.NEXT_PUBLIC_USER_AUTHENTICATION === "True") {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    if (process.env.NEXT_PUBLIC_USER_AUTHENTICATION === "False") {
        return <>{children}</>
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;