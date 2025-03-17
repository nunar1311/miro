import { ResponsiveModal } from "../ResponsiveModal";
import CreateTaskForm from "./CreateTaskForm";
import { useCreateTaskModal } from "@/store/use-create-task-modal";

const CreateTaskModal = () => {
    const [modal, setModal] = useCreateTaskModal();

    const handleClose = () => setModal(false);
    return (
        <ResponsiveModal open={modal} onOpenChange={handleClose}>
            <CreateTaskForm onCancel={handleClose} />
        </ResponsiveModal>
    );
};

export default CreateTaskModal;
