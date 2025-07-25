'use client';

import { clearUser, selectCurrentUser, setUser } from '@/redux/features/api/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [debouncedEmail, setDebouncedEmail] = useState('');

    const validateEmailAPI = async (email) => {
        try {
            // const res = await axios.post('http://localhost:5000/auth/validate/email', {
            //     email,
            // });
            // return res.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // mock success/failure based on email content
                    if (email.includes('fail')) {
                        reject(new Error('Mock: Email already exists'));
                    } else {
                        resolve({ valid: true });
                    }
                }, 800); // simulate network delay
            });
        } catch (error) {
            if (error.response) {
                // Server responded with status code outside 2xx
                throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
            } else if (error.request) {
                // Request was made but no response (e.g., server offline)
                throw new Error('Cannot connect to the server.');
            } else {
                // Other errors
                throw new Error(error.message || 'Unexpected error');
            }
        }
    };
    // Debounce email input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedEmail(formData.email);

            validateEmailAPI(formData.email)
                .then((data) => {
                    console.log('Email valid:', data);
                })
                .catch((err) => {
                    console.error('Email invalid:', err?.message);
                });
        }, 500);

        return () => clearTimeout(handler);
    }, [formData.email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        if (formData.email && formData.password) {
            // const res = await fetch('http://localhost:5000/auth/login', {
            //   method: 'POST',
            //   credentials: 'include', // ⬅️ This will receive cookie
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email: 'test@example.com', password: '123456' }),
            // });
            //res.ok
            //   const { user } = await res.json();
            let user = {
                name: 'Bhuban',
                email: formData.email,
            };
            dispatch(setUser(user));
        } else {
            alert('Please enter email and password');
        }
    };

    if (!user) {
        return (
            <div className="max-w-md mx-auto mt-10 p-4 border rounded space-y-4">
                <p className="text-lg font-semibold">Login</p>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full p-2 border rounded"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <p className="text-sm text-gray-500 mt-1">Debounced: {debouncedEmail}</p>
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full p-2 border rounded"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded max-w-md mx-auto mt-10">
            <h2 className="text-lg font-bold mb-2">Logged in User Info</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button
                onClick={() => dispatch(clearUser())}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}
