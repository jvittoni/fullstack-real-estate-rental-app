"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetApplicationsQuery, useGetAuthUserQuery } from "@/state/api";
import { CircleCheckBig, Clock, Download, Hospital, XCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// const applications = [
//    {
//        id: 1,
//        applicationDate: new Date().toISOString(),
//        status: "Pending",
//        propertyId: 123,
//        tenantCognitoId: "fake-cognito-id",
//        name: "John Doe",
//        email: "john@example.com",
//        phoneNumber: "555-1234",
//        message: "I'm very interested in this property.",
//        property: {
//            id: 123,
//            name: "Mock Property One",
//            address: "123 Main St",
//            pricePerMonth: 1500.0,
//            location: {
//                city: "New York",
//                country: "USA",
//            },
//        },
//        contactPerson: {
//            name: "Alice Manager",
//            email: "alice@example.com",
//        },
//        lease: {
//            startDate: "2023-07-01T00:00:00Z",
//            endDate: "2024-06-30T00:00:00Z",
//            nextPaymentDate: "2023-06-28T00:00:00Z",
//        }
//    },
//    {
//        id: 2,
//        applicationDate: new Date().toISOString(),
//        status: "Approved",
//        propertyId: 456,
//        tenantCognitoId: "another-cognito-id",
//        name: "Jane Smith",
//        email: "jane@example.com",
//        phoneNumber: "555-5678",
//        message: "Please consider my application.",
//        property: {
//            id: 456,
//            name: "Mock Property Two",
//            address: "456 Oak St",
//            pricePerMonth: 1500.0,
//            location: {
//                city: "Los Angeles",
//                country: "USA",
//            },
//        },
//        contactPerson: {
//            name: "Alice Manager",
//            email: "alice@example.com",
//        },
//        lease: {
//            startDate: "2023-07-01T00:00:00Z",
//            endDate: "2024-06-30T00:00:00Z",
//            nextPaymentDate: "2023-06-28T00:00:00Z",
//        }
//    },
//    {
//        id: 3,
//        applicationDate: new Date().toISOString(),
//        status: "Denied",
//        propertyId: 789,
//        tenantCognitoId: "third-cognito-id",
//        name: "Mike Brown",
//        email: "mike@example.com",
//        phoneNumber: "555-9012",
//        message: "Looking for a place starting next month.",
//        property: {
//            id: 789,
//            name: "Mock Property Three",
//            address: "789 Pine St",
//            pricePerMonth: 1500.0,
//            location: {
//                city: "Chicago",
//                country: "USA",
//            },
//        },
//        contactPerson: {
//            name: "Alice Manager",
//            email: "alice@example.com",
//        },
//        lease: {
//            startDate: "2023-07-01T00:00:00Z",
//            endDate: "2024-06-30T00:00:00Z",
//            nextPaymentDate: "2023-06-28T00:00:00Z",
//        }
//    },
// ];


const Applications = () => {

    const { data: authUser } = useGetAuthUserQuery();

    const [activeTab, setActiveTab] = useState("all");

    const {
        data: applications,
        isLoading,
        isError,
    } = useGetApplicationsQuery({
        userId: authUser?.cognitoInfo?.userId,
        userType: "tenant",
    });



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
                subtitle="Track and manage your property rental applications."
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
                        {filteredApplications.length === 0 ? (
                            <p className="text-center">
                                No {tab} applications found.
                            </p>
                        ) : (
                            filteredApplications
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
                                        <div className="flex justify-between gap-5 w-full pb-4 px-4">
                                            {application.status === "Approved" ? (
                                                <div className="bg-green-100 p-4 text-green-700 grow flex items-center">
                                                    <CircleCheckBig className="w-5 h-5 mr-2" />
                                                    The property is being rented by you until{" "}
                                                    {new Date(application.lease?.endDate).toLocaleDateString()}.
                                                </div>
                                            ) : application.status === "Pending" ? (
                                                <div className="bg-yellow-100 p-4 text-yellow-700 grow flex items-center">
                                                    <Clock className="w-5 h-5 mr-2" />
                                                    Your application is pending approval.
                                                </div>
                                            ) : (
                                                <div className="bg-red-100 p-4 text-red-700 grow flex items-center">
                                                    <XCircle className="w-5 h-5 mr-2" />
                                                    Your application has been denied.
                                                </div>
                                            )}

                                            <button
                                                className={`bg-white border border-gray-300 text-gray-700 py-2 px-4
                                                        rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
                                            >
                                                <Download className="w-5 h-5 mr-2" />
                                                Download Agreement
                                            </button>
                                        </div>
                                    </ApplicationCard>
                                ))
                        )}

                    </TabsContent>
                ))}
            </Tabs>
            {(!applications || applications.length === 0) && (
                <p>You don&lsquo;t currently have any applications.</p>
            )}
        </div>
    );
};

export default Applications;