"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setFilters } from "@/state";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface LocationSearchProps {
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
}

const LocationSearch = ({
    className = "",
    inputClassName = "",
    buttonClassName = "",
}: LocationSearchProps) => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.global.filters);
    const [searchInput, setSearchInput] = useState(filters.location || "");

    // Keep local input in sync with global filters.location
    useEffect(() => {
        if (filters.location !== searchInput) {
            setSearchInput(filters.location || "");
        }
    }, [filters.location]);

    const handleLocationSearch = async () => {
        if (!searchInput.trim()) return;

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    searchInput
                )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&fuzzyMatch=true`
            );
            const data = await response.json();
            if (data.features?.length > 0) {
                const [lng, lat] = data.features[0].center;

                dispatch(
                    setFilters({
                        ...filters,
                        location: searchInput,
                        coordinates: [lng, lat],
                    })
                );
            }
        } catch (err) {
            console.error("Error searching location:", err);
        }
    };

    return (
        <div className={`flex items-center w-full ${className}`}>
            <Input
                placeholder="Search location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`flex-1 w-40 rounded-l-xl rounded-r-none border-neutral-400 border-r-0 ${inputClassName}`}
            />
            <Button
                onClick={handleLocationSearch}
                className={`rounded-r-xl rounded-l-none border-l-none border-neutral-400 shadow-none border hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer ${buttonClassName}`}
            >
                <Search className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default LocationSearch;