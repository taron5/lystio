import { MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  return (
    <div className="flex items-center justify-between w-full max-w-xl bg-[#f9f9ff] rounded-full px-5 py-3 shadow-sm">
      <div className="flex items-center space-x-3 flex-1">
        <PaperAirplaneIcon className="h-5 w-5 text-gray-500 -rotate-45" />
        <input
          type="text"
          placeholder="Find a location, street, region or zip"
          className="bg-transparent outline-none text-gray-600 placeholder-gray-500 w-full"
        />
      </div>
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
    </div>
  );
}
