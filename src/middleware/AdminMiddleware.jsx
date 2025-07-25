'use client';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/api/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminMiddleware = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // If user is not an admin, redirect to home page
    if (user.role !== 'admin') {
      router.push('/');
      return;
    }
  }, [user, router]);

  // Show loading or nothing while checking authentication
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // If user is admin, render the children
  return <>{children}</>;
};

export default AdminMiddleware; 