import type { FC, JSX,ReactNode } from 'react';import React from "react";
import CardComponent from "../CardComponent";
import Button from "../Button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CardComponent className="w-full max-w-md">
        <CardComponent.Header>
          <CardComponent.Header.Title>Confirm Deletion</CardComponent.Header.Title>
        </CardComponent.Header>

        <CardComponent.Body>
          <p className="text-gray-600 text-sm text-center mt-2">
            Are you sure you want to delete this task? This action is permanent and cannot be undone.
          </p>
        </CardComponent.Body>

        <CardComponent.Footer>
          <div className="flex justify-end gap-3 p-4">
            <Button
              buttonVariant="solid"
              type="button"
              onClick={onClose}
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </Button>
            <Button
              buttonVariant="solid"
              type="button"
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-700 rounded-lg p-2 text-white"
            >
              Confirm
            </Button>
          </div>
        </CardComponent.Footer>
      </CardComponent>
    </div>
  );
};

export default ConfirmDeleteModal;
