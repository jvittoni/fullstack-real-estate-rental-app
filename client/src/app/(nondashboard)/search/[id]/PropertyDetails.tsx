import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AmenityIcons, HighlightIcons } from "@/lib/constants";
import { formatEnumString } from "@/lib/utils";
import { useGetPropertyQuery } from "@/state/api";
import { HelpCircle } from "lucide-react";
import React from "react";

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
    const {
        data: property,
        isError,
        isLoading,
    } = useGetPropertyQuery(propertyId);

    if (isLoading) return <>Loading...</>;
    if (isError || !property) {
        return <>Property not Found</>;
    }

    return (
        <div className="mb-6">
            {/* Description / Summary */}
            <div className="my-16">
                <h2 className="text-xl font-semibold mb-5">About {property.name}</h2>
                <p className="text-gray-500 leading-7">
                    {property.description}
                    Experience resort style luxury living at Seacrest Homes, where the
                    ocean and city are seamlessly intertwined. Our newly built community
                    features sophisticated two and three-bedroom residences, each complete
                    with high end designer finishes, quartz counter tops, stainless steel
                    whirlpool appliances, office nook, and a full size in-unit washer and
                    dryer. Find your personal escape at home beside stunning swimming
                    pools and spas with poolside cabanas. Experience your very own oasis
                    surrounded by lavish landscaped courtyards, with indoor/outdoor
                    entertainment seating. By day, lounge in the BBQ area and experience
                    the breath taking unobstructed views stretching from the Palos Verdes
                    Peninsula to Downtown Los Angeles, or watch the beauty of the South
                    Bay skyline light up by night. Start or end your day with a workout in
                    our full-size state of the art fitness club and yoga studio. Save the
                    commute and plan your next meeting in the business centers conference
                    room, adjacent to our internet and coffee lounge. Conveniently located
                    near beautiful local beaches with easy access to the 110, 405 and 91
                    freeways, exclusive shopping at the largest mall in the Western United
                    States “The Del Amo Fashion Center” to the hospital of your choice,
                    Kaiser Hospital, UCLA Harbor Medical Center, Torrance Memorial Medical
                    Center, and Providence Little Company of Mary Hospital Torrance rated
                    one of the top 10 Best in Los Angeles. Contact us today to tour and
                    embrace the Seacrest luxury lifestyle as your own. Seacrest Homes
                    Apartments is an apartment community located in Los Angeles County and
                    the 90501 ZIP Code. This area is served by the Los Angeles Unified
                    attendance zone.
                </p>
            </div>

            {/* Amenities */}
            <div>
                <h2 className="text-xl font-semibold my-3">Property Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {property.amenities.map((amenity: AmenityEnum) => {
                        const Icon = AmenityIcons[amenity as AmenityEnum] || HelpCircle;
                        return (
                            <div
                                key={amenity}
                                className="flex flex-col items-center border rounded-xl py-8 px-4"
                            >
                                <Icon className="w-8 h-8 mb-2 text-gray-700" />
                                <span className="text-sm text-center text-gray-700">
                                    {formatEnumString(amenity)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Highlights */}
            <div className="mt-12 mb-16">
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                    Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 w-full">
                    {property.highlights.map((highlight: HighlightEnum) => {
                        const Icon =
                            HighlightIcons[highlight as HighlightEnum] || HelpCircle;
                        return (
                            <div
                                key={highlight}
                                className="flex flex-col items-center border rounded-xl py-8 px-4"
                            >
                                <Icon className="w-8 h-8 mb-2 text-neutral-600 dark:text-neutral-300" />
                                <span className="text-sm text-center text-neutral-600 dark:text-neutral-300">
                                    {formatEnumString(highlight)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tabs Section */}
            <div>
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-5">
                    Fees and Policies
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
                    The fees below are based on community-supplied data and may exclude
                    additional fees and utilities.
                </p>
                <Tabs defaultValue="required-fees" className="mt-8">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="required-fees">Required Fees</TabsTrigger>
                        <TabsTrigger value="pets">Pets</TabsTrigger>
                        <TabsTrigger value="parking">Parking</TabsTrigger>
                    </TabsList>
                    <TabsContent value="required-fees" className="w-1/3">
                        <p className="font-semibold mt-5 mb-2">One time move in fees</p>
                        <hr className="text-neutral-500" />
                        <div className="flex justify-between py-2">
                            <span className="text-neutral-700 font-medium">
                                Application Fee
                            </span>
                            <span className="text-neutral-700">
                                ${property.applicationFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                        </div>
                        <hr className="text-neutral-200" />
                        <div className="flex justify-between py-2">
                            <span className="text-neutral-700 font-medium">
                                Security Deposit
                            </span>
                            <span className="text-neutral-700">
                                ${property.securityDeposit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                        </div>
                        <hr className="text-neutral-200" />
                    </TabsContent>
                    <TabsContent value="pets">
                        <p className="font-semibold mt-5 mb-2">
                            Pets:{" "}{property.isPetsAllowed ? "Allowed" : "Not Allowed"}
                        </p>
                    </TabsContent>
                    <TabsContent value="parking">
                        <p className="font-semibold mt-5 mb-2">
                            Parking:{" "}
                            {property.isParkingIncluded ? "Included" : "Not Included"}
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PropertyDetails;