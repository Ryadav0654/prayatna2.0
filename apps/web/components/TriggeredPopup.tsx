// components/EmergencyAlertPopup.tsx
import React from 'react';
import Button from './Button';

interface EmergencyAlertPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: string
}

const EmergencyAlertPopup: React.FC<EmergencyAlertPopupProps> = ({ isOpen, onClose, type}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        {
          type === "alarm" ? (
           <>
        <h2 className="text-2xl font-bold text-red-600 text-center">Emergency Alert!</h2>
        <p className="mt-4 text-lg text-center">Fire Emergency alarm triggered and the fire department has been notified.</p>
        </>
          ) : (
           <>
            <h2 className="text-2xl font-bold text-red-600 text-center">Building Added</h2>
            <p className="mt-4 text-lg text-center">Building has been added successfully!</p>
            </>
          )
        }
        <div className="mt-6 flex justify-center items-center">
          <Button
            name='Close'
            onclick={onClose}
            styles="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlertPopup;
