'use client';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/api/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RoleMiddleware = ({ 
  children, 
  allowedRoles = ['admin'], 
  redirectTo = '/',
  showLoading = true 
}) => {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // If user's role is not in allowed roles, redirect
    if (!allowedRoles.includes(user.role)) {
      router.push(redirectTo);
      return;
    }
  }, [user, router, allowedRoles, redirectTo]);

  // Show loading or nothing while checking authentication
  if (!user || !allowedRoles.includes(user.role)) {
    if (showLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking permissions...</p>
          </div>
        </div>
      );
    }
    return null;
  }

  // If user has required role, render the children
  return <>{children}</>;
};

export default RoleMiddleware; 