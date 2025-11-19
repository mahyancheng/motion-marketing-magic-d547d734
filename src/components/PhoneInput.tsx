// components/PhoneInput.tsx
import React from "react";

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string; // 可选：如果你想额外传 className
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={
        className ??
        "w-full bg-gray-800 text-white px-3 py-2.5 rounded-md outline-none text-sm"
      }
      placeholder="+60 12 345 6789"
    />
  );
};

export default PhoneInput;
