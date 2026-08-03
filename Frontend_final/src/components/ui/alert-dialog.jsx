import React from "react";
import Dialog from "./dialog";
import Button from "./button";

const AlertDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-lg text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm && onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AlertDialog;
export { AlertDialog };
