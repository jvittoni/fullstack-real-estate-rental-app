"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SearchIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setFilters } from '@/state';

const HeroSection = () => {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    const handleLocationSearch = async () => {
        try {
            const trimmedQuery = searchQuery.trim();
            // if (!trimmedQuery) return;
            
            if (!trimmedQuery) {
                router.push("/search");
                return;
            }

            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    trimmedQuery
                )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&fuzzyMatch=true&limit=1`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const feature = data.features[0];
                const [lng, lat] = feature.center;
                const bbox = feature.bbox;

                let city: string | undefined;
                let state: string | undefined;

                // 1. Check main feature place_type
                if (feature.place_type.includes("place")) {
                    city = feature.text;
                } else if (feature.place_type.includes("region")) {
                    // Extract state code like 'CA' from 'region' short_code e.g. 'US-CA'
                    state = feature.short_code?.split("-")[1];
                }

                // 2. Check context array for city and state
                feature.context?.forEach((item: any) => {
                    if (item.id.startsWith("place") && !city) {
                        city = item.text;
                    } else if (item.id.startsWith("region") && !state) {
                        state = item.short_code?.split("-")[1];
                    }
                });

                // Context: city, state, county (district)
                // feature.context?.forEach((item: any) => {
                //     if (item.id.startsWith("place") && !city) {
                //         city = item.text;
                //     } else if (item.id.startsWith("region") && !state) {
                //         state = item.short_code?.split("-")[1];
                //     } else if (item.id.startsWith("district") && !county) {
                //         county = item.text;
                //     }
                // });

                // Dispatch to Redux
                dispatch(
                    setFilters({
                        location: trimmedQuery,
                        coordinates: [lng, lat],
                        bbox: bbox || undefined,
                        city: city || undefined,
                        state: state || undefined,
                    })
                );

                // Push to search page with city & state params
                const params = new URLSearchParams({
                    location: trimmedQuery,
                    lat: lat.toString(),
                    lng: lng.toString(),
                    city: city || "",
                    state: state || "",
                });
                router.push(`/search?${params.toString()}`);
            }
        } catch (error) {
            console.error("error search location:", error);
        }
    };


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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search by city, state, or address'
                            className='w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12'
                        />
                        <Button
                            onClick={handleLocationSearch}
                            className='bg-red-400/85 text-white rounded-none rounded-r-xl border-none hover:bg-red-400 h-12 w-12 cursor-pointer '
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