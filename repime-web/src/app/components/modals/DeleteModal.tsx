import useDeleteModal from "@/app/hooks/useDeleteModal";
import Modal from "./Modal";
import Heading from "../Heading";

interface DeleteModalProps {
    onSubmit: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    onSubmit
}) => {
    const deleteModal = useDeleteModal();
    
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Tem certeza que deseja deletar?"
                subtitle="Confirme a sua decisão"
            /> 
        </div>
    )
    
    return (
        <Modal 
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.onClose}
            onSubmit={onSubmit}
            title="Confirmação"
            actionLabel="Deletar"
            body={bodyContent}
            pink
            medium
        />
    );
}
 
export default DeleteModal;