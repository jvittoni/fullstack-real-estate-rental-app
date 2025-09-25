import { Bath, Bed, Heart, House, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Card = ({
    property,
    isFavorite,
    onFavoriteToggle,
    showFavoriteButton = true,
    propertyLink,
}: CardProps) => {
    const [imgSrc, setImgSrc] = useState(
        property.photoUrls?.[0] || "/placeholder.jpg"
    );

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5">
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
                {showFavoriteButton && (
                    <button
                        className="absolute top-4 right-4 bg-white hover:bg-white/90 rounded-full p-2 cursor-pointer"
                        onClick={onFavoriteToggle}
                    >
                        <Heart
                            className={`w-5 h-5 hover:fill-red-300 hover:text-red-300 ${isFavorite ? "text-red-500 fill-red-500 hover:text-red-500 hover:fill-red-500" : "text-gray-600"
                                }`}
                        />
                    </button>
                )}
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-1">
                    {propertyLink ? (
                        <Link
                            href={propertyLink}
                            className="hover:text-blue-500"
                            scroll={false}
                        >
                            {property.name}
                        </Link>
                    ) : (
                        property.name
                    )}
                </h2>
                <p className="text-gray-600 mb-2">
                    {property?.location?.address}, {property?.location?.city}
                </p>
                <div className="flex  items-center gap-4 lg:gap-4 text-gray-600 mt-5 mb-2">
                    <span className="flex items-center flex-col xs:flex-row md:flex-col lg:flex-row">
                        <Bed className="w-5 h-5 mr-2" />
                        {property.beds} Bed
                    </span>
                    <span className="flex items-center flex-col xs:flex-row md:flex-col lg:flex-row">
                        <Bath className="w-5 h-5 mr-2" />
                        {property.baths} Bath
                    </span>
                    <span className="flex items-center flex-col xs:flex-row md:flex-col lg:flex-row">
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
        </div>
    );
};

export default Card;