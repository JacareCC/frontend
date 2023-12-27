import { Dialog } from '@headlessui/react';

interface ClaimConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClaimConfirm({ open, onClose, onConfirm }: ClaimConfirmProps) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white p-4 rounded-lg">
          <Dialog.Title className="text-lg font-semibold mb-2">Confirm Claim</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-700 mb-4">
            Are you sure you want to submit your restaurant claim? Once submitted, it cannot be undone.
          </Dialog.Description>
          <div className="flex justify-end">
            <button className="px-3 py-1 bg-gray-200 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={onConfirm}>
              Confirm Claim
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
