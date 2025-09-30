"use client";

import BillingHistoryCard from "@/components/BillingHistoryCard";

import Loading from "@/components/Loading";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import ResidenceCard from "@/components/CurrentResidenceCard";
import { useGetAuthUserQuery, useGetLeasesQuery, useGetPaymentsQuery, useGetPropertyQuery, } from "@/state/api";
import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Residence = () => {
    const { id } = useParams();
    const { data: authUser } = useGetAuthUserQuery();
    const {
        data: property,
        isLoading: propertyLoading,
        error: propertyError,
    } = useGetPropertyQuery(Number(id));

    const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(parseInt(authUser?.cognitoInfo?.userId || "0"),
        { skip: !authUser?.cognitoInfo?.userId }
    );
    const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery(
        leases?.[0]?.id || 0,
        { skip: !leases?.[0]?.id }
    );

    if (propertyLoading || leasesLoading || paymentsLoading) return <Loading />;
    if (!property || propertyError) return <div>Error loading property</div>;

    const currentLease = leases?.find(
        (lease) => lease.propertyId === property.id
    );

    return (
        <div className="dashboard-container">
            <Link
                href="/tenants/residences"
                className="flex items-center mb-4 mt-7 hover:text-neutral-500"
                scroll={false}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Residences</span>
            </Link>
            <div className="w-full mx-auto lg:max-w-4/5 xl:max-w-6/7 2xl:max-w-5/6 mt-7">
                <div className="xl:flex gap-10">
                    {currentLease && (
                        <ResidenceCard property={property} currentLease={currentLease} />
                    )}
                    <PaymentMethodCard />
                </div>
                <BillingHistoryCard payments={payments || []} />
            </div>
        </div>
    );
};

export default Residence;