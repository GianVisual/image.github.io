
import React from 'react';

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  isTextArea = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-purple-300 mb-1 uppercase tracking-wider">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#1e0a3b] border border-purple-800/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-[100px]"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#1e0a3b] border border-purple-800/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      )}
    </div>
  );
};
