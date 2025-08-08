import { useId, useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { MapPinIcon } from "@heroicons/react/24/solid";
import InputSearch from '@/components/mobile/InputSearch';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface LocationItem {
  id: string;
  name: string;
  children?: LocationItem[];
}

interface Props {
  sections: LocationItem[];
  defaultSelectedId?: string | null;
  onSelect?: (item: LocationItem) => void;
  className?: string;
  initialValue?: string;
  closeInput?: string;
  closeMenu: () => void;
}

export default function MobileLocationDropDown({
                                                 sections,
                                                 defaultSelectedId = null,
                                                 onSelect,
                                                 className = "",
                                                 initialValue = "",
                                                 closeMenu,
                                               }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelectedId);
  const [query, setQuery] = useState("");
  const listboxId = useId();

  const flatItems = sections;
  useEffect(() => {
    if (initialValue) {
      setQuery(initialValue);
    }
  }, [initialValue]);

  const setSelected = (item: LocationItem) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!flatItems.length) return;
    const idx = Math.max(0, flatItems.findIndex((i) => i.id === selectedId));

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = flatItems[(idx + 1) % flatItems.length];
      setSelected(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = flatItems[(idx - 1 + flatItems.length) % flatItems.length];
      setSelected(prev);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const current = flatItems[idx] ?? flatItems[0];
      setSelected(current);
    }
  };

  const filteredItems = sections.filter((item) =>
    item.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const highlightMatch = (name: string) => {
    if (!query) return name;
    const matchLength = query.length;
    return (
      <>
        <span className="font-bold text-black">
          {name.slice(0, matchLength)}
        </span>
        {name.slice(matchLength)}
      </>
    );
  };
  return (
    <div className={'absolute z-50 h-full w-full top-0 left-0 bg-white '}>
        <div className={'flex items-center py-3 w-full justify-between px-3'}>
          <button
            onClick={closeMenu}
            className="border-gray-300 transition"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-black text-[18px] font-semibold">Search</span>
          <button
            onClick={closeMenu}
            aria-label="Close"
            className=" inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm
                 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      <div
        id={listboxId}
        role="listbox"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={`select-none rounded-2xl bg-white p-2 sm:p-3 ${className}`}
        aria-activedescendant={selectedId ?? undefined}
      >
        <div className="mb-2 justify-items-center">
          <InputSearch
            disabledClick
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search location..."
          />
        </div>
        {filteredItems.map((item) => (
          <li key={item.id} role="option">
            <button
              id={item.id}
              onClick={() => setSelected(item)}
              className={[
                "w-full px-3 py-3 flex items-center justify-between text-left gap-2",
                "hover:bg-gray-50 active:bg-violet-100",
                item.id === selectedId ? "bg-violet-50/70" : "",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded-xl transition-colors duration-150",
              ].join(" ")}
            >
              {/* Icon */}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-violet-50">
              <MapPinIcon className="h-5 w-5 text-violet-600" />
            </span>

              <div className="flex min-w-0 flex-1 justify-between items-center">
                <div className="min-w-0">
                  <div className="truncate text-base text-gray-900">
                    {highlightMatch(item.name)}
                  </div>
                </div>

                <div className="ml-3 shrink-0 text-sm text-gray-400">
                  {item?.children?.length ?? 0} results
                </div>
              </div>
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
