"use client";

import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <div
      className='fixed top-0 left-0 w-full z-50 shadow-xl'
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className='flex justify-between items-center w-full py-3 px-8 bg-neutral-800 text-white'>
        <div className='flex items-center gap-4 md:gap-6'>
          <Link
            href="/"
            className='cursor-pointer'
            scroll={false}
          >
            <div className='flex items-center gap-3'>
              <Image
                src='/logo.svg'
                alt='Residential Rentals Logo'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className='text-2xl font-bold'>
                Residential
                <span className='text-red-400 font-light'>
                  Rentals
                </span>
              </div>
            </div>
          </Link>
        </div>
        <p className='text-neutral-200 hidden md:block'>
          Discover your perfect residential rental with our advanced search
        </p>
        <div className='flex items-center gap-5'>
          <Link
            href="/signin"
          >
            <Button
              variant="outline"
              className='text-white border border-white bg-transparent hover:bg-white hover:text-neutral-800 rounded-lg font-semibold cursor-pointer'
            >Sign In</Button>
          </Link>
          <Link
            href="/signup"
          >
            <Button
              variant="outline"
              className='text-white bg-red-400/70 border border-red-400/80 hover:bg-white hover:border-white hover:text-neutral-800 rounded-lg font-semibold cursor-pointer'
            >Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar