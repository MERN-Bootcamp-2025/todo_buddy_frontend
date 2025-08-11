import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownItem[];
  placeholder?: string;
  onSelect: (value: string) => void;
  value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select an option',
  onSelect,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(value ?? null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value ?? null);
  }, [value]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (item: DropdownItem) => {
    setSelectedValue(item.value);
    onSelect(item.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full border border-gray-300 rounded px-4 py-2 bg-white text-sm text-gray-700 font-medium flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        onClick={toggleDropdown}
      >
        <span>
          {selectedValue
            ? options.find((opt) => opt.value === selectedValue)?.label
            : placeholder}
        </span>
        <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((item) => (
              <button
                key={item.value}
                onClick={() => handleSelect(item)}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  selectedValue === item.value ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;