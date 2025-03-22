import { useQueryState } from "nuqs";

export const useMemberId = () => {
    return useQueryState("id");
};
