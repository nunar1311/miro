import React from "react";
import { ResponsiveModal } from "../ResponsiveModal";
import { CreateWorkspaceForm } from "./CreateWorkspaceForm";
import { useCreateWorkspaceModal } from "@/store/use-create-workspace-modal";

const CreateWorkspaceModal = () => {
    const [modal, setModal] = useCreateWorkspaceModal();
    const handleClose = () => setModal(false);
    return (
        <ResponsiveModal open={modal} onOpenChange={handleClose}>
            <CreateWorkspaceForm onCancel={handleClose} />
        </ResponsiveModal>
    );
};

export default CreateWorkspaceModal;
