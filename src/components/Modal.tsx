import { ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "info" | "warning" | "success" | "error";
};

export default function Modal({
  isOpen,
  title,
  onClose,
  onConfirm,
  children,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "info",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`modal modal--${variant}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="modal__content">{children}</div>

        <div className="modal__actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
