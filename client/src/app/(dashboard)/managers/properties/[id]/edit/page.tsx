"use client";

import { CustomFormField } from "@/components/FormField";
import Header from "@/components/Header";
import { Form } from "@/components/ui/form";
import { PropertyFormData, propertySchema } from "@/lib/schemas";
import { useCreatePropertyMutation, useGetAuthUserQuery, useGetPropertyQuery, useUpdatePropertyMutation } from "@/state/api";
import { AmenityEnum, HighlightEnum, PropertyTypeEnum } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EditProperty = () => {
    const { id } = useParams();
    const propertyId = Number(id);
    const router = useRouter();
    // const [createProperty] = useCreatePropertyMutation();
    const { data: authUser } = useGetAuthUserQuery();
    //   const { propertyId } = useParams(); // assuming route is /properties/:propertyId

    const { data: propertyData, isLoading } = useGetPropertyQuery(propertyId);
    const [updateProperty] = useUpdatePropertyMutation();




    const form = useForm({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            name: "",
            description: "",
            pricePerMonth: 1000,
            securityDeposit: 500,
            applicationFee: 100,
            isPetsAllowed: true,
            isParkingIncluded: true,
            // photoUrls: [],
            amenities: "",
            highlights: "",
            beds: 1,
            baths: 1,
            squareFeet: 1000,
            address: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
        },
    });

    // const {
    //     register,
    //     watch,
    //     setValue,
    //     handleSubmit,
    //     formState: { errors },
    // } = form;

    const { reset, handleSubmit, setValue, watch, register } = form;

    useEffect(() => {
        if (propertyData) {
            reset({
                ...propertyData,
                // amenities: propertyData.amenities ?? "",
                // highlights: propertyData.highlights ?? "",
                amenities: Array.isArray(propertyData.amenities)
                    ? propertyData.amenities[0] ?? ""
                    : propertyData.amenities ?? "",
                highlights: Array.isArray(propertyData.highlights)
                    ? propertyData.highlights[0] ?? ""
                    : propertyData.highlights ?? "",
                propertyType: propertyData.propertyType ?? "",

                // Optional: sanitize address/location fields
                address: propertyData.location.address ?? "",
                city: propertyData.location.city ?? "",
                state: propertyData.location.state ?? "",
                country: propertyData.location.country ?? "",
                postalCode: propertyData.location.postalCode ?? "",
            });
        }
    }, [propertyData, reset]);

    const onSubmit = async (data: PropertyFormData) => {
        console.log("Submitting form data:", data);
        if (!authUser?.cognitoInfo?.userId) {
            throw new Error("No manager ID found");
        }

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === "photoUrls") {
                const files = value as File[];
                files.forEach((file: File) => {
                    formData.append("photos", file);
                });
            } else if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        });

        formData.append("managerCognitoId", authUser.cognitoInfo.userId);

        try {
            await updateProperty({ id: propertyId, data: formData }).unwrap();

            // setTimeout(() => {
            //     window.location.reload();
            // }, 3000);

            router.push("/managers/properties");
        } catch (error) {
            console.error("Failed to update property", error);
        }
    };


    const propertyType = Object.values(PropertyTypeEnum);
    const amenityList = Object.values(AmenityEnum);
    const highlightList = Object.values(HighlightEnum);


    return (
        <div className="dashboard-container mt-7">
            {/* Back to properties page */}

            <Link
                href="/managers/properties"
                className="flex items-center mb-4 hover:text-neutral-500"
                scroll={false}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Properties</span>
            </Link>
            <Header
                title="Update Property"
                subtitle="Update the information for an existing property."
            />
            <div className="bg-white rounded-xl p-6 lg:max-w-5/6 xl:max-w-3/4 mx-auto mb-5">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-4 space-y-10"
                    >
                        {/* Basic Information */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                            <div className="space-y-4">
                                <CustomFormField name="name" label="Property Name" />
                                <CustomFormField
                                    name="description"
                                    label="Description"
                                    type="textarea"
                                />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Fees */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold mb-4">Fees</h2>
                            <CustomFormField
                                name="pricePerMonth"
                                label="Price per Month"
                                type="number"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomFormField
                                    name="securityDeposit"
                                    label="Security Deposit"
                                    type="number"
                                />
                                <CustomFormField
                                    name="applicationFee"
                                    label="Application Fee"
                                    type="number"
                                />
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Property Details */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CustomFormField
                                    name="beds"
                                    label="Number of Beds"
                                    type="number"
                                />
                                <CustomFormField
                                    name="baths"
                                    label="Number of Baths"
                                    type="number"
                                />
                                <CustomFormField
                                    name="squareFeet"
                                    label="Square Feet"
                                    type="number"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                <CustomFormField
                                    name="isPetsAllowed"
                                    label="Pets Allowed"
                                    type="checkbox"
                                />
                                <CustomFormField
                                    name="isParkingIncluded"
                                    label="Parking Included"
                                    type="checkbox"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm mb-2">Property Type</label>

                                <select {...register('propertyType')} className="w-full border border-neutral-200 rounded-md p-2">
                                    {propertyType.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Amenities and Highlights */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Amenities and Highlights
                            </h2>
                            <div className="space-y-6">

                                <label className="block text-sm mb-2">Amenity</label>
                                <select {...register("amenities")} className="w-full border border-neutral-200 rounded-md p-2">
                                    <option value="">Select an amenity</option>
                                    {amenityList.map((amenity) => (
                                        <option key={amenity} value={amenity}>
                                            {amenity.replace(/([A-Z])/g, ' $1').trim()}
                                        </option>
                                    ))}
                                </select>


                                <label className="block text-sm mb-2">Highlight</label>
                                <select
                                    {...register("highlights")}
                                    className="w-full border border-neutral-200 rounded-md p-2"
                                >
                                    <option value="">Select a highlight</option>
                                    {highlightList.map((highlight) => (
                                        <option key={highlight} value={highlight}>
                                            {highlight.replace(/([A-Z])/g, ' $1').trim()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Photos */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Photos</h2>
                            <CustomFormField
                                name="photoUrls"
                                label="Property Photos"
                                type="file"
                                accept="image/*"
                            />
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Additional Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold mb-4">
                                Additional Information
                            </h2>
                            <CustomFormField name="address" label="Address" />
                            <div className="flex justify-between gap-4">
                                <CustomFormField name="city" label="City" className="w-full" />
                                <CustomFormField
                                    name="state"
                                    label="State"
                                    className="w-full"
                                />
                                <CustomFormField
                                    name="postalCode"
                                    label="Postal Code"
                                    className="w-full"
                                />
                            </div>
                            <CustomFormField name="country" label="Country" />
                        </div>

                        <Button
                            type="submit"
                            className="bg-neutral-700 text-white w-full mt-8 hover:bg-neutral-800 cursor-pointer"
                        >
                            Update Property
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditProperty;