import { Property } from "@/types/prismaTypes";
import { Bath, Bed, Heart, House, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useDeletePropertyMutation } from "@/state/api";

interface PropertyCardProps {
    property: Property;
    // propertyLink?: string;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    const [imgSrc, setImgSrc] = useState(
        property.photoUrls?.[0] || "/placeholder.jpg"
    );

    const router = useRouter();
    const [deleteProperty] = useDeletePropertyMutation();

    const handleDeleteProperty = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this property?");
        if (!confirmed) return;

        try {
            await deleteProperty(property.id).unwrap();
            router.refresh(); // OR manually remove from list if you're storing it in local state
        } catch (error) {
            console.error("Failed to delete property:", error);
            alert("Error deleting property. Please try again.");
        }
    };

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
            <div className="flex flex-col justify-around items-center py-5 px-3 gap-5 font-semibold">

                <div className="flex w-full gap-4 pt-2 px-3 font-semibold">
                    <button
                        onClick={handleDeleteProperty}
                        className="w-full border border-neutral-100 cursor-pointer shadow hover:shadow-md hover:bg-red-600 hover:border-red-700 transition-colors duration-100 group text-base text-center py-2 rounded"
                    >
                        <span className="block group-hover:text-white">Delete</span>
                    </button>
                    <Link
                        href={`/managers/properties/${property.id}/edit`}
                        scroll={false}
                        className="w-full border border-neutral-100  cursor-pointer shadow hover:shadow-md group text-base text-center py-2 rounded"
                    >
                        <span className="block group-hover:text-blue-500">Edit</span>
                    </Link>
                </div>
                <div className="flex w-full px-3">
                    <Link
                        href={`/managers/properties/${property.id}`}
                        scroll={false}
                        className="w-full border border-neutral-100 cursor-pointer shadow hover:shadow-md group text-base text-center py-2 rounded"
                    >
                        <span className="block group-hover:text-blue-500">View Details</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};
export default PropertyCard;