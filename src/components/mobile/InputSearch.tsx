import React, { ChangeEvent, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface InputSearchProps {
  handleInputFocus?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabledClick?: boolean;
  value?: string;
  placeholder?: string;
}

export default function InputSearch({
                                      handleInputFocus,
                                      onChange,
                                      value,
                                      placeholder = 'Find a location, street, region or zip',
                                      disabledClick = false,
                                    }: InputSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = inputRef.current;
    if (value && inputEl && document.activeElement !== inputEl) {
      inputEl.focus();
      if (handleInputFocus) handleInputFocus();
    }
  }, [value, handleInputFocus]);

  return (
    <div className="flex items-center justify-between w-full max-w-xl bg-[#f9f9ff] rounded-full px-5 py-3 shadow-sm">
      <div className="flex items-center space-x-3 flex-1">
        {!disabledClick && <PaperAirplaneIcon className="h-5 w-5 text-gray-500 -rotate-45" />}
        <input
          ref={inputRef}
          onFocus={() => {
            if (!disabledClick && handleInputFocus) {
              handleInputFocus();
            }
          }}
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className="bg-transparent outline-none text-gray-600 placeholder-gray-500 w-full"
        />
      </div>
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
    </div>
  );
}
