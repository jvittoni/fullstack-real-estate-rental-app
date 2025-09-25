import { Bath, Bed, Heart, House, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CardCompact = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardCompactProps) => {
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] || "/placeholder.jpg"
  );

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full flex h-40 mb-5">
      <div className="relative w-1/3">
        <Image
          src={imgSrc}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("/placeholder.jpg")}
        />
        {showFavoriteButton && (
          <button
            // className="bg-purple-400 rounded-full p-1"
            className="absolute top-2 left-2 bg-white hover:bg-white/90 rounded-full p-2 cursor-pointer"

            onClick={onFavoriteToggle}
          >
            <Heart
              className={`w-4 h-4 hover:text-red-300 hover:fill-red-300 ${isFavorite ? "text-red-500 fill-red-500 hover:text-red-500 hover:fill-red-500" : "text-gray-600"
                }`}
            />
          </button>
        )}
        <div className="absolute bottom-2 left-2 flex gap-1 flex-col">
          {property.isPetsAllowed && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full w-fit">
              Pets
            </span>
          )}
          {property.isParkingIncluded && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
              Parking
            </span>
          )}
        </div>
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-lg sm:text-xl md:text-lg lg:text-xl font-bold mb-1 line-clamp-1">
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
            {/* {showFavoriteButton && (
              <button
                className="bg-purple-400 rounded-full p-1"
                        
                onClick={onFavoriteToggle}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
                    }`}
                />
              </button>
            )} */}
          </div>
          <p className="text-gray-600 mb-1 text-sm">
            {property?.location?.address}, {property?.location?.city}
          </p>
          <div className="flex text-sm items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="font-semibold">
              {property.averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600 ml-1">
              ({property.numberOfReviews})
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <div className="flex gap-2 text-gray-600 flex-col sm:flex-row md:flex-col xl:flex-row">
            <div className="flex gap-2">
              <span className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {property.beds}
              </span>
              <span className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {property.baths}
              </span>
            </div>

            <span className="flex items-center">
              <House className="w-4 h-4 mr-1" />
              {property.squareFeet.toLocaleString()} sq ft
            </span>
          </div>

          <p className="text-base font-bold">
            {/* ${property.pricePerMonth.toFixed(0)} */}
            ${property.pricePerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}

            <span className="text-gray-600 text-xs font-normal"> /mo</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardCompact;