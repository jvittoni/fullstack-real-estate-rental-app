import { CreditCard, Edit, Mail } from 'lucide-react';
import React from 'react'

const PaymentMethodCard = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5 p-3 xl:max-w-2/5">
            <div className='relative'>

                {/* Header */}
                <div className='flex flex-col'>
                    <h2 className="text-2xl font-bold mb-2">Payment method</h2>
                    <p className="mb-4 text-gray-600">Manage and edit your payment methods.</p>
                </div>

                {/* Card Information */}
                <div className="border rounded-lg p-6 border-neutral-300">
                    <div className='flex gap-5'>
                        <div className="w-22 h-16 md:30 md:h-20 lg:w-36 lg:h-20 bg-blue-500 flex items-center justify-center rounded-md">
                            <span className="text-white text-2xl font-bold">VISA</span>
                        </div>
                        <div className='flex flex-col'>

                            <div className="flex items-start">
                                <h3 className="text-lg font-semibold">Visa ending in 2724</h3>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                                <CreditCard className="w-4 h-4 mr-1" />
                                <span>Expiry • 03/06/2028</span>
                            </div>

                            <div className="text-sm text-gray-500 flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                <span>billing@example.com</span>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4 text-neutral-200" />

                    {/* Default and Edit */}
                    <div className="flex justify-between items-end">
                        <div className='flex items-center'>
                            <span className="text-sm font-medium border border-neutral-300 text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full">
                                Default
                            </span>
                        </div>
                        <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer">
                            <Edit className="w-5 h-5 mr-2" />
                            <span>Edit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default PaymentMethodCard;