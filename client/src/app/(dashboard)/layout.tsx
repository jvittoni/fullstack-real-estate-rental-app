"use client";

import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname } from 'next/navigation';
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    const { data: authUser } = useGetAuthUserQuery();

    const pathname = usePathname();

    if (!authUser?.userRole) return null;

    const isDashboardPage = pathname.includes("/managers") || pathname.includes("/tenants");


    return (
        <SidebarProvider>
            <div className='min-h-screen w-full bg-neutral-100'>
                <Navbar />
                <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
                    <main className='flex'>
                        <AppSidebar userType={authUser.userRole.toLowerCase()} />
                        {isDashboardPage && (
                            <div className='md:hidden'>
                                <SidebarTrigger className=' text-black' />
                            </div>
                        )}
                        <div className='flex-grow transition-all duration-300'>
                            {children}
                        </div>

                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout