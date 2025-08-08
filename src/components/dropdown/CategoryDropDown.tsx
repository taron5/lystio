import { useState } from "react";

type District = {
  name: string;
  code: string;
};

type Props = {
  title?: string;
  selected: string[];
  setSelected: (value: string[]) => void;
  data: District[];
};

export default function CategoryDropdown({ title = "Category", selected, setSelected, data }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (code: string) => {
    if (selected.includes(code)) {
      setSelected(selected.filter(c => c !== code));
    } else {
      setSelected([...selected, code]);
    }
  };

  const allSelected = selected.length === data.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : data.map(d => d.code));
  };

  return (
    <div className="hover:bg-[#F7F7FD] relative min-w-[200px] h-full max-w-5xl mx-auto p-4">
      <div
        className="border-r border-purple-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="text-black text-sm font-medium">{title}</div>
        <div className="text-black text-sm">Apartments</div>
      </div>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg z-10">
          <div className="p-4 font-medium text-gray-900 border-b">Vienna</div>
          <div className="px-4 py-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="accent-purple-600"
            />
            <label className="text-sm text-gray-800">Select All Districts</label>
          </div>
          {data.map((d) => (
            <div key={d.code} className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selected.includes(d.code)}
                onChange={() => toggle(d.code)}
                className="accent-purple-600"
              />
              <label className="text-sm text-gray-800 flex-1">{d.name}</label>
              <span className="text-xs text-gray-400">{d.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
