"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import PropertyCard from "@/components/PropertyCard";
import { useGetAuthUserQuery, useGetManagerPropertiesQuery } from "@/state/api";
import React from "react";

const Properties = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const {
        data: managerProperties,
        isLoading,
        error,
    } = useGetManagerPropertiesQuery(authUser?.cognitoInfo?.userId || "", {
        skip: !authUser?.cognitoInfo?.userId,
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error loading manager properties</div>;

    return (
        <div className="dashboard-container">
            <Header
                title="My Properties"
                subtitle="View and manage your property listings."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {managerProperties?.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>
            {(!managerProperties || managerProperties.length === 0) && (
                <p>You don&lsquo;t manage any properties</p>
            )}
        </div>
    );
};

export default Properties;