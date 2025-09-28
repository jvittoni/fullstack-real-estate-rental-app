import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ApplicationCard = ({
    application,
    userType,
    children,
}: ApplicationCardProps) => {
    const [imgSrc, setImgSrc] = useState(
        application.property.photoUrls?.[0] || "/placeholder.jpg"
    );

    const statusColor =
        application.status === "Approved"
            ? "bg-green-500"
            : application.status === "Denied"
                ? "bg-red-500"
                : "bg-yellow-500";

    const contactPerson =
        userType === "manager" ? application.tenant : application.manager;

    return (
        <div className="border rounded-xl overflow-hidden shadow-sm bg-white mb-4">
            <div className="flex flex-col xl:flex-row items-start  justify-between px-6 md:px-4 py-6 gap-6 xl:gap-4">
                {/* Property Info Section */}
                <div className="flex flex-col lg:flex-row gap-5 w-full xl:w-auto">
                    <Image
                        src={imgSrc}
                        alt={application.property.name}
                        width={200}
                        height={150}
                        className="rounded-xl object-cover w-full xl:w-[200px] h-[150px] lg:w-3/4 xl:mt-3 "
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => setImgSrc("/placeholder.jpg")}
                    />
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold my-2">
                                {application.property.name}
                            </h2>
                            <div className="flex items-center mb-2">
                                <MapPin className="w-5 h-5 mr-1" />
                                <span>{`${application.property.location.city}, ${application.property.location.country}`}</span>
                            </div>
                        </div>
                        <div className="text-xl font-medium">
                            ${application.property.pricePerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
                            <span className="text-sm font-normal">/ month</span>
                        </div>
                    </div>
                </div>

                {/* Status and Tenant Information Sections */}
                <div className="flex flex-col md:flex-row w-full xl:w-2/3 justify-between xl:justify-around">

                    {/* Divider - visible only on desktop */}
                    <div className="hidden xl:block border-[0.5px] border-neutral-300 h-48 xl:mx-2" />

                    {/* Status Section */}
                    <div className="flex flex-col justify-between px-1 md:pl-1 pr-5 xl:px-0 w-full xl:basis-4/12 xl:h-48 py-2 gap-2 xl:gap-0">
                        <div>
                            <div className="text-xl font-semibold">
                                Lease Overview
                            </div>
                            {/* <hr className="mt-3 text-neutral-400" /> */}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-black">Status:</span>
                            <span
                                className={`px-2 py-1 ${statusColor} text-white rounded-full text-sm`}
                            >
                                {application.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black">Start Date:</span>{" "}
                            {new Date(application.lease?.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black">End Date:</span>{" "}
                            {new Date(application.lease?.endDate).toLocaleDateString()}
                        </div>
                        <div className="flex justify-between">
                            <span className="text-black">Next Payment:</span>{" "}
                            {new Date(application.lease?.nextPaymentDate).toLocaleDateString()}
                        </div>
                    </div>

                    {/* Divider - visible only on desktop */}
                    <div className="hidden md:block border-[0.5px] border-neutral-300 h-48 lg:mx-5" />

                    {/* Contact Person Section */}
                    <div className="flex flex-col justify-start gap-5 w-full xl:w-3/4 xl:basis-4/12 xl:h-48 px-1 md:py-2 md:pl-5 md:pr-2 xl:px-0 mt-6 md:mt-0">
                        <div>
                            <div className="text-xl font-semibold">
                                {userType === "manager" ? "Tenant" : "Manager"}{" "} Information
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <Image
                                    src="/landing-i1.png"
                                    alt={contactPerson.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-2 min-w-[40px] min-h-[40px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="font-semibold">{contactPerson.name}</div>

                                <div className="text-sm flex items-center text-black">
                                    <PhoneCall className="w-5 h-5 mr-2" />
                                    {contactPerson.phoneNumber}
                                </div>
                                <div className="text-sm flex items-center text-black">
                                    <Mail className="w-5 h-5 mr-2" />
                                    {contactPerson.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4" />
            {children}
        </div>
    );
};

export default ApplicationCard;