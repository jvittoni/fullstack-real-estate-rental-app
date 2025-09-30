"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetPaymentsQuery, useGetPropertyLeasesQuery, useGetPropertyQuery } from "@/state/api";
import { ArrowDownToLine, ArrowLeft, Check, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const mockLeases = [
    {
        id: 1,
        tenant: {
            name: "Alice Johnson",
            email: "alice.johnson@gmail.com",
            phoneNumber: "(555) 123-4567",
            photoUrl: "/landing-i1.png",
        },
        property: {
            id: 123,
            name: "Mock Property One",
            address: "123 Main St",
            pricePerMonth: 1500.0,
            location: {
                city: "New York",
                country: "USA",
            },
            startDate: "2023-07-01T00:00:00Z",
            endDate: "2024-06-30T00:00:00Z",
        },


        startDate: "2023-07-01T00:00:00Z",
        endDate: "2024-06-30T00:00:00Z",

        rent: 1500,
        payment: {
            amountDue: 1500.0,
            amountPaid: 0.0,
            dueDate: "2023-08-01T00:00:00Z",
            paymentDate: "2023-07-28T00:00:00Z",
            paymentStatus: "PartiallyPaid",
        }
    },
    {
        id: 2,
        tenant: {
            name: "Bob Smith",
            email: "bob.smith@example.com",
            phoneNumber: "(555) 987-6543",
            photoUrl: "/landing-i1.png",
        },
        property: {
            id: 456,
            name: "Mock Property Two",
            address: "456 Oak St",
            pricePerMonth: 1500.0,
            location: {
                city: "Los Angeles",
                country: "USA",
            },
            startDate: "2023-07-01T00:00:00Z",
            endDate: "2024-06-30T00:00:00Z",
        },




        startDate: "2023-07-01T00:00:00Z",
        endDate: "2024-06-30T00:00:00Z",

        rent: 1800,
        payment: {
            amountDue: 1800.0,
            amountPaid: 0.0,
            dueDate: "2023-08-01T00:00:00Z",
            paymentDate: "2023-07-28T00:00:00Z",
            paymentStatus: "Pending",
        }
    },
    {
        id: 3,
        tenant: {
            name: "Carol Lee",
            email: "carol.lee@gmail.com",
            phoneNumber: "(555) 555-1234",
            photoUrl: "/landing-i1.png",
        },
        property: {
            id: 789,
            name: "Mock Property Three",
            address: "789 Pine St",
            pricePerMonth: 1500.0,
            location: {
                city: "Chicago",
                country: "USA",
            },
            startDate: "2023-07-01T00:00:00Z",
            endDate: "2024-06-30T00:00:00Z",
        },
        startDate: "2023-07-01T00:00:00Z",
        endDate: "2024-06-30T00:00:00Z",

        rent: 1400,

        payment: {
            amountDue: 1400.0,
            amountPaid: 0.0,
            dueDate: "2023-08-01T00:00:00Z",
            paymentDate: "2023-07-28T00:00:00Z",
            paymentStatus: "Paid",
        }
    },
];


const PropertyTenants = () => {
    const { id } = useParams();
    const propertyId = Number(id);

    const leases = mockLeases;
    const leasesLoading = false;


    // const { data: property, isLoading: propertyLoading } =
    //     useGetPropertyQuery(propertyId);
    // const { data: leases, isLoading: leasesLoading } =
    //     useGetPropertyLeasesQuery(propertyId);
    // const { data: payments, isLoading: paymentsLoading } =
    //     useGetPaymentsQuery(propertyId);

    // if (propertyLoading || leasesLoading || paymentsLoading) return <Loading />;

    const payments = mockLeases.map((lease) => ({
        leaseId: lease.id,
        ...lease.payment,
    }));

    const getCurrentMonthPaymentStatus = (leaseId: number) => {
        const currentDate = new Date();
        const currentMonthPayment = payments?.find(
            (payment) =>
                payment.leaseId === leaseId &&
                new Date(payment.dueDate).getMonth() === currentDate.getMonth() &&
                new Date(payment.dueDate).getFullYear() === currentDate.getFullYear()
        );
        return currentMonthPayment?.paymentStatus || "Not Paid";
    };

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
                // title={property?.name || "My Property"}
                title="Property Name"

                subtitle="Manage tenants and leases for this property."
            />

            <div className="w-full space-y-6">
                <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Tenants Overview</h2>
                            <p className="text-sm text-gray-500">
                                Manage and view all tenants for this property.
                            </p>
                        </div>
                        <div>
                            <button
                                className={`bg-white border border-gray-300 text-gray-700 py-2
              px-4 rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50`}
                            >
                                <Download className="w-5 h-5 mr-2" />
                                <span>Download All</span>
                            </button>
                        </div>
                    </div>
                    <hr className="mt-4 mb-1" />
                    {/* Table for large screens */}
                    <div className="hidden lg:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tenant</TableHead>
                                    <TableHead>Lease Period</TableHead>
                                    <TableHead>Monthly Rent</TableHead>
                                    <TableHead>Current Month Status</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leases?.map((lease) => (
                                    <TableRow key={lease.id} className="h-24">
                                        <TableCell>
                                            <div className="flex items-center space-x-3 ">
                                                <Image
                                                    src={lease.tenant.photoUrl}
                                                    alt={lease.tenant.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <div className="font-semibold">{lease.tenant.name}</div>
                                                    <div className="text-sm text-gray-500 wrap-normal">{lease.tenant.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>{new Date(lease.startDate).toLocaleDateString()} -</div>
                                            <div>{new Date(lease.endDate).toLocaleDateString()}</div>
                                        </TableCell>
                                        {/* <TableCell>${lease.payment.amountDue.toFixed(2)}</TableCell> */}
                                        <TableCell>
                                            ${lease.payment.amountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </TableCell>

                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${lease.payment.paymentStatus === "Paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {lease.payment.paymentStatus === "Paid" && (
                                                    <Check className="w-4 h-4 inline-block mr-1" />
                                                )}
                                                {lease.payment.paymentStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell>{lease.tenant.phoneNumber}</TableCell>
                                        <TableCell>
                                            <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center font-semibold hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer">
                                                <ArrowDownToLine className="w-4 h-4 mr-1" />
                                                Download Agreement
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Card layout for medium and smaller screens */}
                    <div className="lg:hidden space-y-6">
                        {leases?.map((lease) => (
                            <div key={lease.id} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex items-center space-x-4 mb-4">
                                    <Image
                                        src={lease.tenant.photoUrl}
                                        alt={lease.tenant.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <div className="font-semibold">{lease.tenant.name}</div>
                                        <div className="text-sm text-gray-500">{lease.tenant.email}</div>
                                    </div>
                                </div>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Lease Period:</span>
                                        <span>
                                            {new Date(lease.startDate).toLocaleDateString()} -{" "}
                                            {new Date(lease.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Monthly Rent:</span>
                                        <span>${lease.payment.amountDue.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Payment Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${lease.payment.paymentStatus === "Paid"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {lease.payment.paymentStatus === "Paid" && (
                                                <Check className="w-4 h-4 inline-block mr-1" />
                                            )}
                                            {lease.payment.paymentStatus}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Contact:</span>
                                        <span>{lease.tenant.phoneNumber}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button className="w-full lg:w-2/3 border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center font-semibold hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer">
                                        <ArrowDownToLine className="w-4 h-4 mr-1" />
                                        Download Agreement
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PropertyTenants;