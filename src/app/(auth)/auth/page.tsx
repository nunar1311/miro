"use client";

import { useState } from "react";

import SignIn from "@/components/auth/SignIn";
import LinkSent from "@/components/auth/SendOTP";
import { SignInFlow } from "@/components/auth/type";

const Page = () => {
    const [step, setStep] = useState<SignInFlow>("SIGN_IN");
    const [email, setEmail] = useState<string>("");
    return (
        <>
            {step === "SIGN_IN" ? (
                <SignIn
                    handleSent={(data) => {
                        setEmail(data);
                        setStep("SEND_OTP");
                    }}
                />
            ) : (
                <LinkSent
                    data={email}
                    handleCancel={() => setStep("SIGN_IN")}
                />
            )}
        </>
    );
};

export default Page;
