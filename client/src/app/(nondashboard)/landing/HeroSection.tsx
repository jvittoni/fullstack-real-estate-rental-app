"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SearchIcon } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className='relative h-screen'>
            <Image
                src='/landing-splash.jpg'
                alt='Residential Rentals Platform Hero Section'
                fill
                className='object-cover object-center'
                priority
            />
            <div className='absolute inset-0 bg-black/55'></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full'
            >
                <div className='max-w-4xl mx-auto px-16 sm:px-12'>
                    <h1 className='text-5xl font-bold text-white mb-4'>
                        {/* Start your journey to finding the perfect place to call home. */}
                        Your journey begins here — find the perfect place to call home.
                    </h1>
                    <p className='text-xl text-white mb-8'>
                        Explore our wide range of rental properties tailored to fit your lifestyle.
                    </p>
                    <div className='flex justify-center'>
                        <Input
                            type='text'
                            value='search query'
                            onChange={() => { }}
                            placeholder='Search by city, neighborhood or address'
                            className='w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12'
                        />
                        <Button
                            onChange={() => { }}
                            className='bg-red-400/80 text-white rounded-none rounded-r-xl border-none hover:bg-red-400 h-12 w-12 cursor-pointer '
                        >

                            <Search
                                style={{ width: 23, height: 23 }}
                                strokeWidth={2.5}
                            />

                        </Button>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default HeroSection;