'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LocationSearch from './LocationSearch';
import { SearchBarProps, SearchFilters } from '@/types';
import clsx from 'clsx';

export default function SearchBar({
  onSearch,
  isExpanded,
  onToggleExpanded,
  propertySearchMode,
}: SearchBarProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBoundaryIds, setSelectedBoundaryIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('apartments');
  const [selectedPrice, setSelectedPrice] = useState('');
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
        <div className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 gap-4">
            {/* Location Search */}
            <div className="flex-1">
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                isExpanded={isExpanded}
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full sm:w-[180px]">
              <label className="block text-xs text-gray-500 mb-1">
                Property Type
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
              >
                <option value="apartments">Apartments</option>
                <option value="houses">Houses</option>
                <option value="offices">Offices</option>
                <option value="studios">Studios</option>
              </select>
            </div>

            {/* Price Dropdown */}
            <div className="w-full sm:w-[180px]">
              <label className="block text-xs text-gray-500 mb-1">
                Price Range
              </label>
              <select
                value={selectedPrice}
                onChange={e => setSelectedPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
              >
                <option value="">Any Price</option>
                <option value="0-500">€0 – €500</option>
                <option value="500-1000">€500 – €1000</option>
                <option value="1000-2000">€1000 – €2000</option>
                <option value="2000+">€2000+</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="w-full sm:w-auto">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center space-x-2"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Verified listings info */}
          <div className="mt-4 text-sm text-gray-600 text-center sm:text-left">
            <span className="font-medium">
              {verifiedListingsCount.toLocaleString()}
            </span>{' '}
            verified listings for apartments, houses, offices, and more
          </div>
        </div>
      </div>
    </div>
  );
}
