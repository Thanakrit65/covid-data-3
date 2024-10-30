"use client";

import React from 'react'
import Link from 'next/link'
import NextLogo from '../../../public/CovidLogo.png'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

function Navbar({ session }) {
  return (
    <nav className='flex justify-between items-center shadow-md p-5'> 
        <div className='mt-[-5px]'> 
            <Link href="/">
                <Image src={NextLogo} width={150} height={100} alt='nextjs logo' /> 
            </Link>
        </div>
        <ul className='flex space-x-4'>
            {!session ? (
                <>
                    <li>
                        <Link href="/dashboard"className = 'bg-[#51c2d5] text-white py-2 px-4 rounded-md hover:bg-[#006a7d] transition-colors duration-300'>
                            Dashboard</Link></li>
                    <li>
                        <Link href="/login" className='bg-[#73C088] text-white py-2 px-4 rounded-md hover:bg-[#459866] transition-colors duration-300'>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className = 'bg-[#FBD741] text-white py-2 px-4 rounded-md hover:bg-[#FFA500] transition-colors duration-300'>
                            Register
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    {/* <li> */}
                        {/* <Link href="/dashboard"className = 'bg-[#FBD741] text-white py-2 px-4 rounded-md hover:bg-[#FFA500] transition-colors duration-300'>
                            Dashboard
                        </Link></li> */}
                    
                    <li>
                        <Link href="/dashboard"className = 'bg-[#51c2d5] text-white py-2 px-4 rounded-md hover:bg-[#006a7d] transition-colors duration-300'>
                            Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/welcome" className='bg-[#bc8fd0] text-white py-2 px-4 rounded-md hover:bg-[#957dad] transition-colors duration-300'>
                            Profile
                        </Link>
                    </li>
                    <li>
                    <a onClick={() => signOut()} className='bg-[#DC493F] text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 cursor-pointer'>
                          Logout
                      </a>

                    </li>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar
