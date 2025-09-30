"use client";

import { useGetAuthUserQuery } from '@/state/api';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import ImagePreviews from './ImagePreviews';
import PropertyOverview from './PropertyOverview';
import PropertyDetails from './PropertyDetails';
import PropertyLocation from './PropertyLocation';
import ContactWidget from './ContactWidget';
import ApplicationModal from './ApplicationModal';

const SingleListing = () => {

    const { id } = useParams();
    const propertyId = Number(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: authUser } = useGetAuthUserQuery();

    return (
        <div>
            <ImagePreviews
                images={["/singlelisting-2.jpg", "/singlelisting-3.jpg"]}
            />
            <div className="flex flex-col  justify-center gap-5 mx-10 md:w-5/6 xl:w-3/4 md:mx-auto mt-16 mb-8">
                <div className='flex flex-col md:flex-row gap-5 lg:gap-10 justify-between'>
                    <div className='w-full md:w-3/4'>
                        <PropertyOverview propertyId={propertyId} />
                    </div>
                    <ContactWidget onOpenModal={() => setIsModalOpen(true)} />
                </div>

                <PropertyDetails propertyId={propertyId} />
                <PropertyLocation propertyId={propertyId} />

            </div>

            {authUser && (
                <ApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    propertyId={propertyId}
                />
            )}
        </div>
    )
}

export default SingleListing