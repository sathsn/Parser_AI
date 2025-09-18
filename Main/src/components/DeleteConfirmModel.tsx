// components/DeleteConfirmModal.tsx
import React from 'react';

interface DeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
      <div className="text-gray-800 text-center mb-6">
        <h3 className="text-lg font-bold">This page says</h3>
        <p className="mt-2 text-base">Are you sure to delete this Company?</p>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          OK
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg text-gray-800 font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
