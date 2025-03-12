import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <Loader2 className="size-14 animate-spin" />
        </div>
    );
};

export default Loading;
