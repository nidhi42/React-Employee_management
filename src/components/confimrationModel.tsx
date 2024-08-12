// ConfirmationModal.tsx
import React from "react";
import "./Home.style.css";

type Props = {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({ isVisible, onConfirm, onCancel }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Are you sure you want to delete this employee?</p>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
