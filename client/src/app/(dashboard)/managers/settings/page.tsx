"use client";

import SettingsForm from '@/components/SettingsForm';
import { useGetAuthUserQuery, useUpdateManagerSettingsMutation } from '@/state/api'
import React from 'react'

const ManagerSettings = () => {

    const { data: authUser, isLoading } = useGetAuthUserQuery();
    // console.log("authUser:", authUser);
    const [updateTenant] = useUpdateManagerSettingsMutation();

    if (isLoading) return <>Loading...</>;

    const initalData = {
        name: authUser?.userInfo.name,
        email: authUser?.userInfo.email,
        phoneNumber: authUser?.userInfo.phoneNumber,

    }

    const handleSubmit = async (data: typeof initalData) => {
        await updateTenant({
            cognitoId: authUser?.cognitoInfo?.userId,
            ...data,
        });
    }

    return (
        <SettingsForm
            initialData={initalData}
            onSubmit={handleSubmit}
            userType='manager'
        />
    )
}

export default ManagerSettings