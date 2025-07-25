'use client';

// RegistrationForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
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
    );
}
