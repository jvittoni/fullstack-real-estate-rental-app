import { useGetPropertyQuery } from "@/state/api";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import React, { useState } from "react";
import ContactWidget from "./ContactWidget";

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);
  const [isModalOpen, setIsModalOpen] = useState(false);


  if (isLoading) return <>Loading...</>;
  if (isError || !property) {
    return <>Property not Found</>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">
          {property.location?.country} / {property.location?.state} /{" "}
          <span className="font-semibold text-gray-600">
            {property.location?.city}
          </span>
        </div>
        <h1 className="text-3xl font-bold my-5">{property.name}</h1>
        <div className="flex gap-1 flex-col items-start justify-start xl:flex-row xl:justify-between xl:items-center">
          <span className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-gray-700" />
            {property.location?.city}, {property.location?.state},{" "}
            {property.location?.country}
          </span>
          <div className="flex justify-between items-center gap-3">
            <span className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {property.averageRating.toFixed(1)} ({property.numberOfReviews}{" "}
              Reviews)
            </span>
            <span className="flex items-center text-green-600">
              <BadgeCheck className="w-4 h-4 mr-1" />
              Verified Listing
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border border-neutral-200 rounded-xl p-6 mb-6">
        <div className="flex flex-wrap justify-between items-center px-5">

          <div className="w-1/2 lg:w-auto flex flex-col items-center gap-1 py-2">
            <div className="text-sm text-gray-500">Monthly Rent</div>
            <div className="font-semibold">
              ${property.pricePerMonth.toLocaleString()}
            </div>
          </div>

          <div className="hidden lg:block border-l border-gray-300 h-10 mx-3"></div>

          <div className="w-1/2 lg:w-auto flex flex-col items-center gap-1 py-2">
            <div className="text-sm text-gray-500">Bedrooms</div>
            <div className="font-semibold">{property.beds} bd</div>
          </div>

          <div className="hidden lg:block border-l border-gray-300 h-10 mx-3"></div>

          <div className="w-1/2 lg:w-auto flex flex-col items-center gap-1 py-2">
            <div className="text-sm text-gray-500">Bathrooms</div>
            <div className="font-semibold">{property.baths} ba</div>
          </div>

          <div className="hidden lg:block border-l border-gray-300 h-10 mx-3"></div>

          <div className="w-1/2 lg:w-auto flex flex-col items-center gap-1 py-2">
            <div className="text-sm text-gray-500">Square Feet</div>
            <div className="font-semibold">
              {property.squareFeet.toLocaleString()} sq ft
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;