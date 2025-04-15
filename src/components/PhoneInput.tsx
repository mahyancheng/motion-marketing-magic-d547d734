
import React from 'react';

interface PhoneInputProps {
  id: string;
  required?: boolean;
  className?: string;
}

const PhoneInput = ({ id, required = false, className = "" }: PhoneInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
      <input 
        type="tel"
        id={id}
        required={required}
        className={`w-full bg-gray-800 border-gray-700 rounded-md px-4 py-3 text-white focus:ring-yellow-400 focus:border-yellow-400 ${className}`}
        placeholder="+1 (555) 123-4567"
      />
    </div>
  );
};

export default PhoneInput;
