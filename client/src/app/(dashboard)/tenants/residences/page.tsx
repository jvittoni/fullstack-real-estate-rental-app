"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ResidenceCard from "@/components/ResidenceCard";
import { useGetAuthUserQuery, useGetCurrentResidencesQuery, useGetTenantQuery } from "@/state/api";
import React from "react";

const Residences = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const { data: tenant } = useGetTenantQuery(
        authUser?.cognitoInfo?.userId || "",
        {
            skip: !authUser?.cognitoInfo?.userId,
        }
    );

    const {
        data: currentResidences,
        isLoading,
        error,
    } = useGetCurrentResidencesQuery(authUser?.cognitoInfo?.userId || "", {
        skip: !authUser?.cognitoInfo?.userId,
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error loading current residences</div>;

    return (
        <div className="dashboard-container">
            <Header
                title="Current Residences"
                subtitle="View and manage your current living spaces."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {currentResidences?.map((property) => (
                    <ResidenceCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>
            {(!currentResidences || currentResidences.length === 0) && (
                <p>You don&lsquo;t have any current residences.</p>
            )}
        </div>
    );
};

export default Residences;