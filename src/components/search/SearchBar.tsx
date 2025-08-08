'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LocationSearch from './LocationSearch';
import { SearchBarProps, SearchFilters } from '@/types';
import clsx from 'clsx';
import FilterDropdown from '@/components/dropdown/FilterDropdown';
import CategoryDropdown from '@/components/dropdown/CategoryDropDown';
const districts = [
  { name: "Innere Stadt", code: "1010" },
  { name: "Leopoldstadt", code: "1020" },
  { name: "Landstraße", code: "1030" },
  { name: "Wieden", code: "1040" },
  { name: "Margareten", code: "1050" },
  { name: "Mariahilf", code: "1060" },
  { name: "Neubau", code: "1070" },
  { name: "Josefstadt", code: "1080" },
  { name: "Alsergrund", code: "1090" },
  { name: "Favoriten", code: "1100" },
  { name: "Simmering", code: "1110" },
];

export default function SearchBar({
  onSearch,
  isExpanded,
  propertySearchMode,
}: SearchBarProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBoundaryIds, setSelectedBoundaryIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('apartments');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(["1020", "1040"]);
  const [verifiedListingsCount, setVerifiedListingsCount] = useState(0);

  // Fetch verified listings count when filters change
  useEffect(() => {
    async function updateListingsCount() {
      try {
        const filters: SearchFilters = {
          withinId: selectedBoundaryIds,
          rentType: [propertySearchMode],
          category: selectedCategory,
          priceRange: selectedPrice,
        };

        const response = await fetch(
          'https://api.lystio.co/tenement/search/count',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVerifiedListingsCount(data.count || 0);
        } else {
          setVerifiedListingsCount(0);
        }
      } catch {
        setVerifiedListingsCount(0);
      }
    }

    updateListingsCount();
  }, [propertySearchMode, selectedBoundaryIds, selectedCategory, selectedPrice]);

  // Handle location select from LocationSearch
  const handleLocationSelect = (location: string, boundaryId?: string) => {
    setSelectedLocation(location);
    setSelectedBoundaryIds(boundaryId ? [boundaryId] : []);
  };

  // Trigger search
  const handleSearch = () => {
    const filters: SearchFilters = {
      withinId: selectedBoundaryIds,
      rentType: [propertySearchMode],
      category: selectedCategory,
      priceRange: selectedPrice,
    };
    onSearch(filters);
  };

  return (
    <div className="relative">
      {/* Search Bar Container */}
      <div
        className={clsx(
          'bg-white border border-gray-300 shadow-sm transition-all duration-300',
          isExpanded
            ? 'rounded-2xl shadow-lg border-gray-400'
            : 'rounded-full hover:shadow-md hover:border-gray-400'
        )}
      >
          <div className="flex flex-col lg:flex-row lg:items-center ">
            <div className="flex-1">
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                isExpanded={isExpanded}
              />
            </div>
            <div className={'flex flex-col lg:flex-row lg:items-center rounded-r-full pr-4'}>
              <CategoryDropdown
                data={districts}
                selected={selectedDistricts}
                setSelected={setSelectedDistricts}
              />
              <FilterDropdown />
              <div className="w-full sm:w-auto">
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto bg-[#A540F3] text-white px-6 py-3 rounded-full font-medium hover:opacity-95 transition-colors shadow-sm flex items-center justify-center space-x-2"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
