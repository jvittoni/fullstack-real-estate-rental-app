"use client";

import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();

    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);


    const isDashboardPage = pathname.includes("/managers") || pathname.includes("/tenants");

    useEffect(() => {
        if (authUser) {
            const userRole = authUser.userRole?.toLowerCase();
            if (
                (userRole === "manager" && pathname.startsWith("/tenants")) ||
                (userRole === "tenant" && pathname.startsWith("/managers"))
            ) {
                router.push(
                    userRole === "manager"
                        ? "/managers/properties"
                        : "tenants/favorites",
                    { scroll: false }
                )
            } else {
                setIsLoading(false)
            }
        }
    }, [authUser, router, pathname]);

    if (authLoading || isLoading) return <>Loading...</>

    if (!authUser?.userRole) return null;


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