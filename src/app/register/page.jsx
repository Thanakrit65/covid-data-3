"use client";

import React, { useState, useEffect } from 'react';
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.replace('/welcome');
        }
    }, [session, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError("Please complete all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Check if the user already exists
        try {

            const resCheckUser = await fetch("/api/usercheck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const { user } = await resCheckUser.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            // Register the user
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            if (res.ok) {
                setError("");
                setSuccess("User registered successfully!");
                e.target.reset(); // Clears the form
            } else {
                setError("User registration failed.");
            }
        } catch (error) {
            console.error("Error during registration: ", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className="flex justify-center items-center">
                    <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-3xl'>Register Page</h3>
                        <hr className='my-3' />
                        <form onSubmit={handleSubmit}>

                            {error && (
                                <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                    {success}
                                </div>
                            )}

                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                                placeholder='Enter your name' 
                            />
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                                placeholder='Enter your email' 
                            />
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                                placeholder='Enter your password' 
                            />
                            <input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                                placeholder='Confirm your password' 
                            />
                            <button type='submit' className='bg-[#73C088] text-white py-2 px-4 rounded-md hover:bg-[#459866] transition-colors duration-300'>
                                Sign Up
                            </button>
                        </form>
                        <hr className='my-3' />
                        <p>
                            Go to <Link href="/login" className='text-blue-500 hover:underline'>Login</Link> Page
                        </p>
                    </div>
                </div>
            </div>
            
        </Container>
    );
}

export default RegisterPage;
