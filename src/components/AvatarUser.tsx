import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarUserProps extends AvatarProps {
    user: Pick<User, "image" | "name">;
    size?: "md" | "lg";
    className?: string;
}

const AvatarUser = ({ user, size, className }: AvatarUserProps) => {
    return (
        <Avatar
            className={cn(
                "rounded-md",
                size === "md" && "size-6",
                size === "lg" && "size-10",
                className,
            )}
        >
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback
                className={cn(
                    "rounded-md",
                    size === "md" && "size-6",
                    size === "lg" && "size-10",
                    className,
                )}
            >
                {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};

export default AvatarUser;
