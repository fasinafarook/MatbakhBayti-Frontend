import React from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

const Modal = ({
  show,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
  showSuccess = true,
  successMessage = "Action successful!",
}) => {
  if (!show) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      if (showSuccess) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: successMessage,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          background: "#1f2937", // tailwind's gray-800
          color: "#fff",
        });
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto rounded-2xl shadow-lg border border-white/20 bg-white/10 backdrop-blur-md text-white p-6">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white/70 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Modal Content */}
        <div className="mb-6">{children}</div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 transition text-white"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
