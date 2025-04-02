import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex w-full justify-center">
            <Loader2
                className="animate-spin text-primary"
                size={24}
            />
        </div>
    );
};

export default Loading;
