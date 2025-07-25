'use client';

// RegistrationForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { selectCurrentUser, setUser } from '@/redux/features/api/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

// Yup validation schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name is too short'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', // real-time validation
    });

    const onSubmit = (data) => {
        console.log('✅ Form submitted:', data);
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
        dispatch(setUser(user));
        router.push(user.redirect);
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
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600">Join us and start your journey</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1">Name</label>
                <input
                    {...register('name')}
                    className="w-full border border-gray-300 p-2 rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Email</label>
                <input
                    {...register('email')}
                    className="w-full border border-gray-300 p-2 rounded"
                    type="email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Password</label>
                <input
                    {...register('password')}
                    className="w-full border border-gray-300 p-2 rounded"
                    type="password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Confirm Password</label>
                <input
                    {...register('confirmPassword')}
                    className="w-full border border-gray-300 p-2 rounded"
                    type="password"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Register
            </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
