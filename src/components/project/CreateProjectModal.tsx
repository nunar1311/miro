import { ResponsiveModal } from "../ResponsiveModal";
import CreateProjectForm from "./CreateProjectForm";
import { useCreateProjectModal } from "@/store/use-create-project-modal";

const CreateProjectModal = () => {
    const [modal, setModal] = useCreateProjectModal();

    const handleClose = () => setModal(false);
    return (
        <ResponsiveModal open={modal} onOpenChange={handleClose}>
            <CreateProjectForm onCancel={handleClose} />
        </ResponsiveModal>
    );
};

export default CreateProjectModal;
