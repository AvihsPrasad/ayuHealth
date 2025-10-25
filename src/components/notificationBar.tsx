import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface NotificationBarProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number; // in milliseconds
  index?: number; // for stacking
}

function NotificationBar({ message, type, onClose, duration = 10000, index = 0 }: NotificationBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide in immediately
    setTimeout(() => setVisible(true), 500);
    

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Delay onClose to match transition duration
    }, duration); // Auto close after specified duration

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 500);
  };

  const bgColor = type === 'success' ? 'bg-green-50' : type === 'error' ? 'bg-red-100' : type === 'info' ? 'bg-blue-100' : 'bg-yellow-100';
  const textColor = type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : type === 'info' ? 'text-blue-800' : 'text-yellow-800';
  const ringColor = type === 'success' ? 'border-green-400' : type === 'error' ? 'border-red-400' : type === 'info' ? 'border-blue-400' : 'border-yellow-400';

  const Icon = type === 'success' ? CheckCircleIcon : type === 'error' ? ExclamationTriangleIcon : type === 'info' ? InformationCircleIcon : ExclamationTriangleIcon;

  return (
    <div
      className={`absolute z-[99999] w-[350px] border-[1px] ${ringColor} ${bgColor} p-4 px-4 rounded-md text-sm ${textColor} font-medium flex items-center gap-2 right-4
          transform transition-transform duration-500 ease-in-out mb-2 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ top: `${index * 75 + 20}px` }}
    >
      <Icon className="size-5" />
      {message}
      <button onClick={handleClose} className="ml-4 text-lg cursor-pointer"><XCircleIcon className="size-5"/></button>
    </div>
  )
}

export default NotificationBar
