"use client";

import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams();

    const workspaceId = params.workspaceId;
    return <div>{workspaceId}</div>;
};

export default Page;
