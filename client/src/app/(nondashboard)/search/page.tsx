"use client";

import { NAVBAR_HEIGHT } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import FiltersBar from './FiltersBar';
import FiltersFull from './FiltersFull';
import { cleanParams } from '@/lib/utils';
import { setFilters } from '@/state';
import Map from './Map';
import Listings from './Listings';

const fetchBoundingBox = async (place: string) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?types=place,region&access_token=${accessToken}&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.features?.length > 0) {
        const feature = data.features[0];

        const bbox = feature.bbox;
        const placeType = feature.place_type?.[0]; // "place" (city) or "region" (state)

        let city = null;
        let state = null;

        // Extract city/state from context if available
        feature.context?.forEach((ctx: any) => {
            if (ctx.id.startsWith("place")) city = ctx.text;
            if (ctx.id.startsWith("region")) state = ctx.text;
        });

        // If feature itself is city or state
        if (placeType === "place") city = feature.text;
        if (placeType === "region") state = feature.text;

        return {
            bbox,
            city,
            state,
        };
    }

    return null;
};


const SearchPage = () => {

    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const isFiltersFullOpen = useAppSelector(
        (state) => state.global.isFiltersFullOpen
    );

    useEffect(() => {
        const fetchFilters = async () => {
            const location = searchParams.get("location");
            const lat = searchParams.get("lat");
            const lng = searchParams.get("lng");
            const city = searchParams.get("city");
            const state = searchParams.get("state");

            const initialFilters = Array.from(searchParams.entries()).reduce(
                (acc: any, [key, value]) => {
                    if (key === "priceRange" || key === "squareFeet") {
                        acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
                    } else if (key !== "lat" && key !== "lng") {
                        acc[key] = value === "any" ? null : value;
                    }
                    return acc;
                },
                {}
            );

            if (lat && lng) {
                initialFilters.coordinates = [parseFloat(lng), parseFloat(lat)]; // [lng, lat]
            }

            // If city or state provided in URL, use those, else fallback to fetching bbox via Mapbox
            if (city) {
                initialFilters.city = city;
            }
            if (state) {
                initialFilters.state = state;
            }

            if (location && (!city || !state)) {
                const geocodeResult = await fetchBoundingBox(location);
                if (geocodeResult) {
                    const { bbox, city: geoCity, state: geoState } = geocodeResult;

                    if (bbox) initialFilters.bbox = bbox;
                    if (geoCity) initialFilters.city = geoCity;
                    if (geoState) initialFilters.state = geoState;
                }
            }

            const cleanedFilters = cleanParams(initialFilters);
            dispatch(setFilters(cleanedFilters));
        };

        fetchFilters();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className='w-full mx-auto px-5 flex flex-col'
            style={{

                height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
            }}
        >
            <FiltersBar />
            <div className='flex justify-between flex-1 overflow-hidden gap-3 mb-5'>
                <div className={`h-full overflow-auto transition-all duration-300 ease-in-out ${isFiltersFullOpen
                    ? "w-4/12 md:w-3/12 opacity-100 visible"
                    : "w-0 opacity-0 invisible"
                    }`}
                >
                    <FiltersFull />
                </div>
                {/* <Map />

                <div className="basis-4/12 overflow-y-auto">
                    <Listings />
                </div> */}

                <div className='flex flex-col md:flex-row w-full overflow-y-auto'>
                    <Map />

                    <div className="basis-5/12 md:basis-6/12 lg:basis-5/12 mt-5 md:mt-0 md:overflow-y-auto">
                        <Listings />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearchPage