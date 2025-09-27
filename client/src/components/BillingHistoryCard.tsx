import { ArrowDownToLineIcon, Check, Download, FileText } from "lucide-react";
import { Payment } from "@/types/prismaTypes";

const BillingHistoryCard = ({ payments }: { payments: Payment[] }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5 p-3 ">
            <div className="relative">


                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Billing History</h2>
                        <p className="text-sm text-gray-500">
                            Download your previous plan receipts and usage details.
                        </p>
                    </div>
                </div>

                <hr className="mt-4 mb-1 text-neutral-300" />
                <div className="w-full overflow-x-auto mb-2 lg:mb-5">
                    <table className="min-w-full text-sm md:text-base text-left text-gray-700">

                        {/* Table Header - Hidden on small screens */}
                        <thead className="bg-gray-50 md:table-header-group hidden">
                            <tr>
                                <th className="px-4 py-3">Invoice</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Billing Date</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {payments.map((payment) => (
                                <tr
                                    key={payment.id}
                                    className="block md:table-row border-b border-neutral-300 md:border-0 mb-4 md:mb-0 "
                                >
                                    {/* Invoice */}
                                    <td className="block md:table-cell px-4 py-2 bg-gray-50 md:bg-transparent">
                                        <div className="flex md:block items-start">
                                            <span className="md:hidden font-semibold w-32 shrink-0">Invoice:</span>
                                            <div className="flex items-center">
                                                <FileText className="w-4 h-4 mr-2" />
                                                Invoice #{payment.id} –{" "}
                                                {new Date(payment.paymentDate).toLocaleString("default", {
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    </td>


                                    {/* Status */}
                                    <td className="block md:table-cell px-4 py-2">
                                        <span className="md:hidden font-semibold inline-block w-32">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold border ${payment.paymentStatus === "Paid"
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : "bg-yellow-100 text-yellow-800 border-yellow-300"
                                                }`}
                                        >
                                            {payment.paymentStatus === "Paid" ? (
                                                <Check className="w-4 h-4 inline-block mr-1" />
                                            ) : null}
                                            {payment.paymentStatus}
                                        </span>
                                    </td>

                                    {/* Billing Date */}
                                    <td className="block md:table-cell px-4 py-2 bg-gray-50 md:bg-transparent">
                                        <span className="md:hidden font-semibold inline-block w-32">Billing Date:</span>
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>

                                    {/* Amount */}
                                    <td className="block md:table-cell px-4 py-2">
                                        <span className="md:hidden font-semibold inline-block w-32">Amount:</span>
                                        ${payment.amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>

                                    {/* Action */}
                                    <td className="block md:table-cell px-4 py-2 bg-gray-50 mb-1 md:bg-transparent">
                                        <div className="flex md:block items-start ">
                                            <span className="md:hidden font-semibold w-32 shrink-0">Action:</span>
                                            <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center font-semibold hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer">
                                                <ArrowDownToLineIcon className="w-4 h-4 mr-1" />
                                                Download
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr className="hidden lg:block text-neutral-300" />

                </div>

                <div className="flex">
                    <button className="ml-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer">
                        <Download className="w-5 h-5 mr-2" />
                        <span>Download All</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillingHistoryCard;