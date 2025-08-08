import { useState } from "react";
import Image from "next/image";
import deFlagUrl from '@/images/flags/de.svg';
import frFlagUrl from '@/images/flags/fr.svg';

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");

  const languages = [
    { code: "DE", label: "German", flag: deFlagUrl },
    { code: "FR", label: "Français", flag: frFlagUrl },
  ];

  const selected = languages.find((l) => l.code === selectedLang);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 flex items-center justify-center"
      >
        <span className="sr-only">Language</span>
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <Image
            src={selected?.flag || deFlagUrl}
            alt={selected?.label || "Language"}
            width={24}
            height={24}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${
                  selectedLang === lang.code
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden">
                  <Image
                    src={lang.flag}
                    alt={lang.label}
                    width={20}
                    height={20}
                  />
                </div>
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
