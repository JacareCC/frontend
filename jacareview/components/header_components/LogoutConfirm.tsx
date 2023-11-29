import { Dialog } from '@headlessui/react';

interface LogoutConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirm({ open, onClose, onConfirm }: LogoutConfirmProps) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white p-4 rounded-lg">
          <Dialog.Title className="text-lg font-semibold mb-2">Confirm Logout</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-700 mb-4">
            Are you sure you want to logout?
          </Dialog.Description>
          <div className="flex justify-end">
            <button className="px-3 py-1 bg-gray-200 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={onConfirm}>
              Confirm Logout
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
