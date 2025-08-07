import { useState } from "react";

export default function FilterDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-[200px] h-full max-w-5xl mx-auto p-4">
      <div
        className="border-r border-purple-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="text-black text-sm font-medium">Price</div>
        <div className="text-gray-500 text-sm">Select Price Range</div>
      </div>
    </div>
  );
}
