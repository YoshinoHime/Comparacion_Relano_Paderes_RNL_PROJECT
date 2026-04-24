import { useRef, useEffect, useCallback, type FC, type ReactNode } from "react";
import ModalCloseButton from "./ModalCloseButton"; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  isFullScreen?: boolean;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  className = "",
  children,
  showCloseButton = true,
  isFullScreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const contentClasses = isFullScreen
    ? "relative w-full h-full rounded-lg bg-white flex flex-col"
    : `relative w-full sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-lg bg-white max-h-[90vh] flex flex-col ${className}`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4">
      {!isFullScreen && (
        <div
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-md"
          onClick={onClose}
        />
      )}

      <div
        ref={modalRef}
        className={contentClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && <ModalCloseButton onClose={onClose} />}
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
