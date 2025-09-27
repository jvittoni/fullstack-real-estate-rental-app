import { Lease, Property } from '@/types/prismaTypes';
import { Download, House, MapPin, User } from 'lucide-react';
import React from 'react'

const ResidenceCard = ({ property, currentLease, }: { property: Property; currentLease: Lease; }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5 p-3 xl:max-w-2/3">
            <div className='relative'>

                {/* Header */}
                <div className='flex'>
                    <div className="ml-auto bg-green-500 w-fit text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Active Lease
                    </div>
                </div>
                <div className='flex gap-5'>
                    {/* <div className="w-44 h-22 lg:w-64 lg:h-32 object-cover bg-slate-500 rounded-xl mt-3.5"></div> */}
                    <div className="w-44 h-22 lg:w-64 lg:h-32 bg-slate-200 rounded-xl mt-3.5 flex justify-center items-center">
                        <House className='w-10 h-10 lg:w-20 lg:h-20 text-slate-300' />
                    </div>

                    <div className='flex flex-col'>
                        <h2 className="text-2xl font-bold my-2">{property.name}</h2>
                        <div className="flex items-center mb-2">
                            <MapPin className="w-5 h-5 mr-1" />
                            <span>
                                {property.location.city}, {property.location.country}
                            </span>
                        </div>
                        <div className="text-xl font-bold">
                            ${currentLease.rent.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
                            <span className="text-gray-500 text-sm font-normal">/ night</span>
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div>
                    <hr className="my-4 text-neutral-200" />
                    <div className="flex justify-around items-center">
                        <div className="lg:flex xl:flex-col 2xl:flex-row px-1 ">
                            <div className="text-gray-500 mr-2">Start Date: </div>
                            <div className="font-semibold">
                                {new Date(currentLease.startDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="border-[0.5px] border-neutral-300 h-4" />
                        <div className="lg:flex xl:flex-col 2xl:flex-row  px-1">
                            <div className="text-gray-500 mr-2">End Date: </div>
                            <div className="font-semibold">
                                {new Date(currentLease.endDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="border-[0.5px] border-neutral-300 h-4" />
                        <div className="lg:flex xl:flex-col 2xl:flex-row px-1">
                            <div className="text-gray-500 mr-2">Next Payment: </div>
                            <div className="font-semibold">
                                {new Date(currentLease.endDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 text-neutral-200" />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 w-full">
                    <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer">
                        <User className="w-5 h-5 mr-2" />
                        Manager
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer">
                        <Download className="w-5 h-5 mr-2" />
                        Download Agreement
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ResidenceCard