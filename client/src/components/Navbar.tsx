"use client";

import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import { Bell, MessageCircle, Plus, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SidebarTrigger } from './ui/sidebar';

const Navbar = () => {


  const { data: authUser } = useGetAuthUserQuery();
  // const { data: authUser, isLoading, isFetching, error } = useGetAuthUserQuery();

  const router = useRouter();
  const pathname = usePathname();

  // if (isLoading || isFetching || !authUser?.userRole) {
  //   return null; 
  // }

  const isDashboardPage = pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };


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
              <div className='text-2xl lg:text-3xl font-bold'>
                Residential
                <span className='text-red-400 font-light'>
                  Rentals
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className='flex items-center gap-5'>
          {authUser ? (
            <>
              <div className='relative hidden md:block'>
                <MessageCircle className='w-6 h-6 cursor-pointer text-neutral-300 hover:text-neutral-50' />
                <span className='absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full'></span>
              </div>
              <div className='relative hidden md:block'>
                <Bell className='w-6 h-6 cursor-pointer text-neutral-300 hover:text-neutral-50' />
                <span className='absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full'></span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-2 focus:outline-none'>
                  <Avatar>
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className='bg-neutral-600'>
                      {authUser.userRole?.[0].toUpperCase()}
                      {/* {authUser.userInfo?.name[0].toUpperCase()} */}
                    </AvatarFallback>
                  </Avatar>
                  <p className='text-neutral-300 text-lg hidden md:block'>
                    {authUser.userInfo?.name}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white text-neutral-800'>
                  <DropdownMenuItem
                    className='cursor-pointer hover:!bg-neutral-700 hover:!text-neutral-100 font-medium text-lg'
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    Dashboard
                  </DropdownMenuItem>
                  {/* <DropdownMenuSeparator className='bg-neutral-200' /> */}
                  <DropdownMenuItem
                    className='cursor-pointer hover:!bg-neutral-700 hover:!text-neutral-100 font-medium text-lg'
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='bg-neutral-200' />
                  <DropdownMenuItem
                    className='cursor-pointer hover:!bg-neutral-700 hover:!text-neutral-100 font-medium text-lg'
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>

          ) : (
            <>

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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar