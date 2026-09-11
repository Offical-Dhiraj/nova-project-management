import {
  AlertTriangle,
} from "lucide-react";

import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  loading = false,
  danger = true,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="flex gap-4">
        <div
          className="
            flex h-10 w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-red-50
            text-red-600
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          <AlertTriangle size={19} />
        </div>

        <div>
          <p
            className="
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            {description}
          </p>
        </div>
      </div>

      <div
        className="
          mt-7
          flex
          justify-end
          gap-3
        "
      >
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant={
            danger
              ? "danger"
              : "primary"
          }
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;