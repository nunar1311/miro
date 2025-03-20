import { useMemberId } from "@/store/useMemberId";

export const usePanel = () => {
    const [profileMemberId, setProfileMemberId] = useMemberId();

    const onOpenProfileMember = (memberId: string) => {
        setProfileMemberId(memberId);
    };

    const onClose = () => {
        setProfileMemberId(null);
    };

    return {
        profileMemberId,
        onOpenProfileMember,
        onClose,
    };
};
