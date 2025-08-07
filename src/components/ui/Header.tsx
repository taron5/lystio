'use client';

import { useState } from 'react';
import SearchBar from '../search/SearchBar';
import { PropertySearchMode, SearchFilters } from '@/types';
import ActionButtons from '../search/ActionButtons';
import Image from 'next/image';

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [propertySearchMode, setPropertySearchMode] = useState<PropertySearchMode>('rent');

  const handleSearch = (filters: SearchFilters) => {
    console.log('Search filters:', filters);
    // TODO: Implement search functionality
  };

  const toggleSearchExpanded = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <header className="shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image src="lystio-logo.svg" alt="Lystio Logo" width={80} height={37} />
        </div>

        {/* Rent/Buy/AI Toggles */}
        <ActionButtons
          propertySearchMode={propertySearchMode}
          setPropertySearchMode={setPropertySearchMode}
        />

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/*TODO: change favorite icon and languages icon*/}
          <button className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Favorites</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Language</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </button>
          <div>Jakob</div>
          <div className="flex gap-1">
            <button className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">User menu</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </button>
            ↓
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 lg:px-0 py-3">

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          isExpanded={isSearchExpanded}
          onToggleExpanded={toggleSearchExpanded}
          propertySearchMode={propertySearchMode}
        />

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top row with logo and user menu */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Lystio</h1>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">User menu</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </button>
          </div>

          {/* Search bar row */}
          <div className="pb-4">
            <SearchBar
              onSearch={handleSearch}
              isExpanded={isSearchExpanded}
              onToggleExpanded={toggleSearchExpanded}
              propertySearchMode={propertySearchMode}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
