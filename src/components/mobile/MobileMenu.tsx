'use client';
import { useState } from 'react';
import { MobileMenuProps } from '@/types';

export default function MobileMenu({ open, closeMenu }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuActionHandler = () => {
    if (open) {
      closeMenu();
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };
  return (
    <div className="relative z-10">
      <button
        onClick={menuActionHandler}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="relative flex h-8 w-8 items-center justify-center"
      >
        <span
          className={[
            'absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out origin-center',
            open ? 'translate-y-0 rotate-45' : '-translate-y-2 rotate-0',
          ].join(' ')}
        />
        <span
          className={[
            'absolute h-0.5 w-6 bg-black transition-all duration-200 ease-in-out',
            open ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        />
        <span
          className={[
            'absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out origin-center',
            open ? 'translate-y-0 -rotate-45' : 'translate-y-2 rotate-0',
          ].join(' ')}
        />
      </button>

      {isMenuOpen && (
        <div
          className={`fixed top-0 right-0 h-full w-2/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
      ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>

            <ul className="mt-12 space-y-4 text-lg">
              <li className="hover:text-purple-600 text-gray-500 cursor-pointer">
                Option 1
              </li>
              <li className="hover:text-purple-600 text-gray-500  cursor-pointer">
                Option 2
              </li>
              <li className="hover:text-purple-600 text-gray-500  cursor-pointer">
                Option 3
              </li>
              <li className="hover:text-purple-600 text-gray-500  cursor-pointer">
                Option 4
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
