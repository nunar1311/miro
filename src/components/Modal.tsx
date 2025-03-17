"use client";

import { useEffect, useState } from "react";
import CreateWorkspaceModal from "./workspace/CreateWorkspaceModal";
import CreateProjectModal from "./project/CreateProjectModal";
import CreateTaskModal from "./task/CreateTaskModal";

const Modal = () => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <>
            <CreateWorkspaceModal />
            <CreateProjectModal />
            <CreateTaskModal />
        </>
    );
};

export default Modal;
