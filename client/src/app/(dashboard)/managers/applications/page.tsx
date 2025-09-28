"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetApplicationsQuery, useGetAuthUserQuery, useUpdateApplicationStatusMutation } from "@/state/api";
import { CircleCheckBig, Download, File, Hospital } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// const applications = [
//     {
//         id: 1,
//         applicationDate: new Date().toISOString(),
//         status: "Pending",
//         propertyId: 123,
//         tenantCognitoId: "fake-cognito-id",
//         name: "John Doe",
//         email: "john@example.com",
//         phoneNumber: "555-1234",
//         message: "I'm very interested in this property.",
//         property: {
//             id: 123,
//             name: "Mock Property One",
//             address: "123 Main St",
//             pricePerMonth: 1500.0,
//             location: {
//                 city: "New York",
//                 country: "USA",
//             },
//         },
//         contactPerson: {
//             name: "Alice Manager",
//             email: "alice@example.com",
//         },
//         lease: {
//             startDate: "2023-07-01T00:00:00Z",
//             endDate: "2024-06-30T00:00:00Z",
//             nextPaymentDate: "2023-06-28T00:00:00Z",
//         }
//     },
//     {
//         id: 2,
//         applicationDate: new Date().toISOString(),
//         status: "Approved",
//         propertyId: 456,
//         tenantCognitoId: "another-cognito-id",
//         name: "Jane Smith",
//         email: "jane@example.com",
//         phoneNumber: "555-5678",
//         message: "Please consider my application.",
//         property: {
//             id: 456,
//             name: "Mock Property Two",
//             address: "456 Oak St",
//             pricePerMonth: 1500.0,
//             location: {
//                 city: "Los Angeles",
//                 country: "USA",
//             },
//         },
//         contactPerson: {
//             name: "Alice Manager",
//             email: "alice@example.com",
//         },
//         lease: {
//             startDate: "2023-07-01T00:00:00Z",
//             endDate: "2024-06-30T00:00:00Z",
//             nextPaymentDate: "2023-06-28T00:00:00Z",
//         }
//     },
//     {
//         id: 3,
//         applicationDate: new Date().toISOString(),
//         status: "Denied",
//         propertyId: 789,
//         tenantCognitoId: "third-cognito-id",
//         name: "Mike Brown",
//         email: "mike@example.com",
//         phoneNumber: "555-9012",
//         message: "Looking for a place starting next month.",
//         property: {
//             id: 789,
//             name: "Mock Property Three",
//             address: "789 Pine St",
//             pricePerMonth: 1500.0,
//             location: {
//                 city: "Chicago",
//                 country: "USA",
//             },
//         },
//         contactPerson: {
//             name: "Alice Manager",
//             email: "alice@example.com",
//         },
//         lease: {
//             startDate: "2023-07-01T00:00:00Z",
//             endDate: "2024-06-30T00:00:00Z",
//             nextPaymentDate: "2023-06-28T00:00:00Z",
//         }
//     },
// ];



const Applications = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const [activeTab, setActiveTab] = useState("all");

    const {
        data: applications,
        isLoading,
        isError,
    } = useGetApplicationsQuery(
        {
            userId: authUser?.cognitoInfo?.userId,
            userType: "manager",
        },
        {
            skip: !authUser?.cognitoInfo?.userId,
        }
    );
    const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

    const handleStatusChange = async (id: number, status: string) => {
        await updateApplicationStatus({ id, status });
    };

    if (isLoading) return <Loading />;
    if (isError || !applications) return <div>Error fetching applications</div>;

    const filteredApplications = applications?.filter((application) => {
        if (activeTab === "all") return true;
        return application.status.toLowerCase() === activeTab;
    });

    return (
        <div className="dashboard-container">
            <Header
                title="Applications"
                subtitle="View and manage applications for your properties."
            />
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full my-5"
            >
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="denied">Denied</TabsTrigger>
                </TabsList>
                {["all", "pending", "approved", "denied"].map((tab) => (
                    <TabsContent key={tab} value={tab} className="mt-5 w-full">
                        {filteredApplications
                            .filter(
                                (application) =>
                                    tab === "all" || application.status.toLowerCase() === tab
                            )
                            .map((application) => (
                                <ApplicationCard
                                    key={application.id}
                                    application={application}
                                    userType="manager"
                                >
                                    <div className="flex justify-between items-center gap-5 w-full pb-4 px-4">
                                        {/* Section Status */}
                                        <div
                                            className={`p-4 text-black grow  ${application.status === "Approved"
                                                ? "bg-green-100"
                                                : application.status === "Denied"
                                                    ? "bg-red-100"
                                                    : "bg-yellow-100"
                                                }`}
                                        >
                                            <div className="flex flex-col xl:flex-row xl:gap-6 gap-2">
                                                <div className="flex">
                                                    <File className="w-5 h-5 mr-2 flex-shrink-0" />
                                                    <span className="mr-2">
                                                        Application submitted on{" "}
                                                        {new Date(
                                                            application.applicationDate
                                                        ).toLocaleDateString()}
                                                        .
                                                    </span>
                                                </div>

                                                <div className="flex">
                                                    {/* <CircleCheckBig className="w-5 h-5 mr-2 flex-shrink-0" /> */}
                                                    <span
                                                        className={`font-semibold flex ${application.status === "Approved"
                                                            ? "text-green-800"
                                                            : application.status === "Denied"
                                                                ? "text-red-800"
                                                                : "text-yellow-800"
                                                            }`}
                                                    >
                                                        <CircleCheckBig className="w-5 h-5 mr-2 flex-shrink-0" />

                                                        {application.status === "Approved" &&
                                                            "This application has been approved."}
                                                        {application.status === "Denied" &&
                                                            "This application has been denied."}
                                                        {application.status === "Pending" &&
                                                            "This application is pending review."}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Buttons */}
                                        <div className="flex">
                                            {application.status === "Approved" && (
                                                <div className="flex flex-col xl:flex-row w-full items-center justify-center gap-2 ">
                                                    <Link
                                                        href={`/managers/properties/${application.property.id}`}
                                                        className={`bg-white w-full xl:w-fit border border-gray-300 text-gray-700 py-2 px-4 
                                                                    rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer`}
                                                        scroll={false}
                                                    >
                                                        <Hospital className="w-5 h-5 mr-2" />
                                                        Property Details
                                                    </Link>
                                                    <button
                                                        className={`bg-white  border border-gray-300 text-gray-700 py-2 px-4
                                                                    rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer`}
                                                    >
                                                        <Download className="w-5 h-5 mr-2" />
                                                        Download Agreement
                                                    </button>
                                                </div>
                                            )}
                                            {application.status === "Pending" && (
                                                <div className="flex flex-col justify-center w-full xl:items-center gap-2 md:flex-row ">
                                                    <Link
                                                        href={`/managers/properties/${application.property.id}`}
                                                        className={`bg-white  border border-gray-300 text-gray-700 py-2 px-4 
                                                                    rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer`}
                                                        scroll={false}
                                                    >
                                                        <Hospital className="w-5 h-5 mr-2" />
                                                        Property Details
                                                    </Link>
                                                    <div className="flex flex-col gap-2 xl:flex-row lg:w-fit items-end w-full md:w-fit">
                                                        <button
                                                            className="w-full px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-500 cursor-pointer"
                                                            onClick={() =>
                                                                handleStatusChange(application.id, "Approved")
                                                            }
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="w-full  px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-500 cursor-pointer"
                                                            onClick={() =>
                                                                handleStatusChange(application.id, "Denied")
                                                            }
                                                        >
                                                            Deny
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {application.status === "Denied" && (
                                                <div className="flex flex-col xl:flex-row w-full items-center justify-center gap-2 ">
                                                    <Link
                                                        href={`/managers/properties/${application.property.id}`}
                                                        className={`bg-white border border-gray-300 text-gray-700 py-2 px-4 
                                                                    rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer`}
                                                        scroll={false}
                                                    >
                                                        <Hospital className="w-5 h-5 mr-2" />
                                                        Property Details
                                                    </Link>
                                                    <button
                                                        className={`bg-gray-800 w-full xl:w-fit text-white py-2 px-4 rounded-md flex items-center
                          justify-center hover:bg-secondary-500 hover:text-neutral-50 cursor-pointer`}
                                                    >
                                                        Contact User
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ApplicationCard>
                            ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default Applications;