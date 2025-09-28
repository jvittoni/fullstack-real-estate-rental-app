import { Property } from "@/types/prismaTypes";
import { Bath, Bed, Heart, House, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { Button } from "./ui/button";

interface CardProps {
    property: Property;
    isFavorite: boolean;
    removeFavorite: () => void;
    showFavoriteButton?: boolean;
    // propertyLink?: string;
}

const FavoriteCard = ({
    property,
    isFavorite,
    removeFavorite,
    showFavoriteButton = true,
    // propertyLink,
}: CardProps) => {
    const [imgSrc, setImgSrc] = useState(
        property.photoUrls?.[0] || "/placeholder.jpg"
    );

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5 lg:max-w-6/7 xl:max-w-full">
            <div className="relative">
                <div className="w-full h-48 relative">
                    <Image
                        src={imgSrc}
                        alt={property.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => setImgSrc("/placeholder.jpg")}
                    />
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                    {property.isPetsAllowed && (
                        <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
                            Pets Allowed
                        </span>
                    )}
                    {property.isParkingIncluded && (
                        <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
                            Parking Included
                        </span>
                    )}
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-1 line-clamp-1">
                    {property.name}
                </h2>
                <p className="text-gray-600 mb-2">
                    {property?.location?.address}, {property?.location?.city}
                </p>
                <div className="flex items-center gap-4 lg:gap-4 text-gray-600 mt-5 mb-2">
                    <span className="flex items-center xl:text-sm flex-col xs:flex-row md:flex-col lg:flex-row">
                        <Bed className="w-5 h-5 mr-2" />
                        {property.beds} Bed
                    </span>
                    <span className="flex items-center xl:text-sm flex-col xs:flex-row md:flex-col lg:flex-row">
                        <Bath className="w-5 h-5 mr-2" />
                        {property.baths} Bath
                    </span>
                    <span className="flex items-center xl:text-sm flex-col xs:flex-row md:flex-col lg:flex-row">
                        <House className="w-5 h-5 mr-2" />
                        {property.squareFeet.toLocaleString()} sq ft
                    </span>
                </div>
                <hr className="text-neutral-300" />
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-semibold">
                            {property.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-600 ml-1 text-sm ">
                            ({property.numberOfReviews} Reviews)
                        </span>
                    </div>
                    <p className="text-lg font-bold">
                        {/* ${property.pricePerMonth.toFixed(0)}{" "} */}
                        ${property.pricePerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
                        {/* <span className="text-gray-600 text-base font-normal"> /month</span> */}
                        <span className="text-gray-600 text-base font-normal">
                            <span className="hidden md:inline lg:hidden"> /mo</span>
                            <span className="inline md:hidden lg:inline"> /month</span>
                        </span>
                    </p>
                </div>

            </div>
            {showFavoriteButton && (
                <div className="flex justify-around items-center my-5 font-semibold text-sm mx-auto px-5">


                    <Button
                        className="bg-red-600/5 hover:bg-red-600 hover:text-white uppercase transition-colors ease-in-out duration-200 group w-fit flex gap-2 justify-center items-center pt-2 pb-2 cursor-pointer"
                        onClick={removeFavorite}
                    >
                        <Heart
                            className="w-5 h-5 text-red-500 fill-red-500 group-hover:fill-white group-hover:text-white transition-colors duration-200"
                        />

                        Remove
                    </Button>
                    <Button className="border border-neutral-100 cursor-pointer hover:shadow-md">
                        <Link
                            href={`/search/${property.id}`}
                            className="hover:text-blue-500 text-base"
                            scroll={false}
                        >
                            View Details
                        </Link>

                    </Button>
                </div>
            )}
        </div>
    );
};
export default FavoriteCard