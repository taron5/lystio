import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        className="relative w-8 h-8 flex flex-col justify-center items-center group"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`absolute w-6 h-0.5 bg-black transform transition duration-300 ease-in-out
            ${"-translate-y-2"}`}
        />
        <span
          className={`absolute w-6 h-0.5 bg-black transition-opacity duration-200
            ${"opacity-100"}`}
        />
        <span
          className={`absolute w-6 h-0.5 bg-black transform transition duration-300 ease-in-out
            ${"translate-y-2"}`}
        />
      </button>

      {open && (
        <div
          className={`fixed top-0 right-0 h-full w-2/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
    ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6">
            {/* Separate Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>

            <ul className="mt-12 space-y-4 text-lg">
              <li className="hover:text-purple-600 text-gray-500 cursor-pointer">Option 1</li>
              <li className="hover:text-purple-600 text-gray-500  cursor-pointer">Option 2</li>
              <li className="hover:text-purple-600 text-gray-500  cursor-pointer">Option 3</li>
              <li className="hover:text-purple-600 text-gray-500  cursor-pointer">Option 4</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
