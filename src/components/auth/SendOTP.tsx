import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "../ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../ui/input-otp";
import { SignInFlow } from "./type";
import { FastForward } from "lucide-react";

interface LinkSentProps {
    handleCancel: (value: SignInFlow) => void;
    data: string;
}

const SendOTP = ({ handleCancel, data }: LinkSentProps) => {
    const handleComplete = async (value: string) => {
        // await emailOtp.verifyEmail({
        //     email: data,
        //     otp: value,
        // });
    };
    return (
        <div className="flex flex-col items-center justify-center gap-y-2">
            <FastForward className="fill-current text-primary -rotate-45 size-9 pl-1 pb-1" />
            <h2>
                <strong>{data}</strong>
            </h2>
            <p className="text-muted-foreground font-light text-sm">
                Vui lòng kiểm tra email của bạn và nhập mã OTP để tiếp
                tục
            </p>
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onComplete={handleComplete}
                autoFocus
                // disabled={isLoading}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <Button
                variant={"link"}
                onClick={() => handleCancel("SIGN_IN")}
            >
                Quay lại
            </Button>
        </div>
    );
};

export default SendOTP;
