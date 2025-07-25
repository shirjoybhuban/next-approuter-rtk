'use client';

import { clearUser, selectCurrentUser, setUser } from '@/redux/features/api/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const loginSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
}).required();

export default function LoginPage() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setError,
        clearErrors
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange'
    });

    const watchedEmail = watch('email');

    // Email validation effect
    useEffect(() => {
        if (!watchedEmail || errors.email) return;

        const validateEmail = async () => {
            try {
                // const res = await axios.post('http://localhost:5000/auth/validate/email', {
                //     email: watchedEmail,
                // });
                // return res.data;

                // Mock validation
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (watchedEmail.includes('fail')) {
                            reject(new Error('Mock: Email already exists'));
                        } else {
                            resolve({ valid: true });
                        }
                    }, 800);
                });

                clearErrors('email');
            } catch (error) {
                setError('email', {
                    type: 'manual',
                    message: error.message || 'Email validation failed'
                });
            }
        };

        const timeoutId = setTimeout(validateEmail, 500);
        return () => clearTimeout(timeoutId);
    }, [watchedEmail, setError, clearErrors, errors.email]);

    const onSubmit = async (data) => {
        try {
            // const res = await fetch('http://localhost:5000/auth/login', {
            //   method: 'POST',
            //   credentials: 'include',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data),
            // });
            // const { user } = await res.json();

            // Mock user data based on email
            let user = {
                user_id: 2,
                name: 'Bhuban Malek',
                role: 'student',
                role_id: 2,
                email: data.email,
                studentId: 'STU123',
                grade: '12th',
                joinedDate: '2023-01-15',
                redirect: '/'
            };

            if (data.email === 'admin@bs.com') {
                user = {
                    user_id: 1,
                    name: 'Admin User',
                    role: 'admin',
                    role_id: 1,
                    email: data.email,
                    adminId: 'ADM001',
                    department: 'School Administration',
                    joinedDate: '2022-06-01',
                    redirect: '/dashboard'
                };
            } else if (data.email === 'teacher@bs.com') {
                user = {
                    user_id: 3,
                    name: 'Teacher User',
                    role: 'teacher',
                    role_id: 3,
                    email: data.email,
                    teacherId: 'TCH001',
                    department: 'Mathematics',
                    joinedDate: '2023-01-01',
                    redirect: '/dashboard'
                };
            }

            dispatch(setUser(user));
            router.push(user.redirect);
        } catch (error) {
            setError('root', {
                type: 'manual',
                message: error.message || 'Login failed. Please try again.'
            });
        }
    };

    if (user) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Logged in User Info</h2>
                <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
                <button
                    onClick={() => dispatch(clearUser())}
                    className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                    Logout
                </button>
            </div>
        );
    }


    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
                        <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {errors.root && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <p className="text-red-600 text-sm">{errors.root.message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-600 mt-5">
                        <p>Fixed Accounts:</p>
                        <p className="text-xs mt-1">
                            Admin: admin@bs.com | Teacher: teacher@bs.com | Student: any other email
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
