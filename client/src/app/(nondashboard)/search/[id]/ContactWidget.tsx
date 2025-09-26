import { Button } from "@/components/ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ContactWidget = ({ onOpenModal }: ContactWidgetProps) => {
    const { data: authUser } = useGetAuthUserQuery();
    const router = useRouter();

    const handleButtonClick = () => {
        if (authUser) {
            onOpenModal();
        } else {
            router.push("/signin");
        }
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-7 h-fit min-w-[300px]">
            {/* Contact Property */}
            <div className="flex items-center gap-5 mb-4 border border-neutral-200 p-4 rounded-xl">
                <div className="flex items-center p-4 bg-neutral-900 rounded-full">
                    <Phone className="text-neutral-50" size={18} />
                </div>
                <div>
                    <p>Contact This Property</p>
                    <div className="text-lg font-bold text-neutral-800">
                        (424) 340-5574
                    </div>
                </div>
            </div>
            <Button
                className="w-full bg-neutral-800 text-white hover:bg-neutral-900 cursor-pointer"
                onClick={handleButtonClick}
            >
                {authUser ? "Submit Application" : "Sign In to Apply"}
            </Button>

            <hr className="my-4 text-neutral-300" />
            <div className="text-sm">
                {/* <div className="text-neutral-600 mb-1">Language: English, Spanish.</div> */}
                <div className="text-neutral-600">
                    Appointments Available: Monday - Saturday, 8:00 AM - 6:00 PM

                </div>
            </div>
        </div>
    );
};

export default ContactWidget;