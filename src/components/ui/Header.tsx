'use client';

import { useState } from 'react';
import SearchBar from '../search/SearchBar';
import { PropertySearchMode, SearchFilters } from '@/types';
import ActionButtons from '../search/ActionButtons';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useMobile } from '@/utils';
import MobileSearchBar from '@/components/mobile/MobileSearchBar';
import MobileMenu from '@/components/mobile/MobileMenu';
import LanguageDropdown from '@/components/dropdown/LanguageDropDown';
import Avatar from '@/images/avatar/Avatar.svg';

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [propertySearchMode, setPropertySearchMode] = useState<PropertySearchMode>('rent');
  const isMobile = useMobile();

  const handleSearch = (filters: SearchFilters) => {
    console.log('Search filters:', filters);
  };
  const toggleSearchExpanded = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  const openMenu = () => {
    setIsMenuExpanded(true)
    setIsSearchExpanded(true)
  }
  return isMobile ? (
    <header className="shadow-sm border-b border-gray-200 bg-white">
      <div
        className={`px-4 py-[6px] sm:px-6 lg:px-10 h-auto items-center gap-2 ${
          isMenuExpanded
            ? 'grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto]'
            : 'grid grid-cols-[auto_1fr_auto] grid-rows-1'
        }`}
      >
        {/* Left item (Logo or Search label) */}
        <div className="flex-shrink-0 col-start-1 row-start-1">
          {isMenuExpanded ? (
            <span className="text-black text-[18px] font-semibold">Search</span>
          ) : (
            <Image
              src="lystio-logo.svg"
              alt="Lystio Logo"
              width={80}
              height={37}
            />
          )}
        </div>

        <div
          className={
            isMenuExpanded
              ? 'col-span-3 row-start-2 w-full justify-items-center'
              : 'col-start-2 row-start-1 w-full justify-items-center'
          }
        >
          <MobileSearchBar
            openMenu={openMenu}
            isOpen={isMenuExpanded}
          />
        </div>

        <div className="col-start-3 row-start-1 justify-self-end">
          <MobileMenu
            closeMenu={() => {
              setIsMenuExpanded(!isMenuExpanded);
            }}
            open={isMenuExpanded}
          />
        </div>
      </div>
    </header>
  ) : (
    <header className="shadow-sm border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="lystio-logo.svg"
            alt="Lystio Logo"
            width={80}
            height={37}
          />
        </div>

        <ActionButtons
          propertySearchMode={propertySearchMode}
          setPropertySearchMode={setPropertySearchMode}
        />

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 relative">
            <span className="sr-only">Favorites</span>
            <HeartIcon className={'w-6 h-6 '} />
            <div className="w-4 h-4 rounded-full absolute flex justify-center items-center -top-1 -right-1 bg-[#FF2D53]">
              <span className="text-white text-[9.6px]"> 5 </span>
            </div>
          </button>
          <LanguageDropdown />
          <div className={'text-[16px] text-black'}>Jakob</div>
          <div className="flex gap-1">
            <div className="w-5 h-5 rounded-full overflow-hidden">
              <Image src={Avatar} alt={'avatar'} width={20} height={20} />
            </div>
          </div>
        </div>
      </div>x
      <div className="max-w-5xl mx-auto px-3 lg:px-0 py-3">
        <SearchBar
          onSearch={handleSearch}
          isExpanded={isSearchExpanded}
          onToggleExpanded={toggleSearchExpanded}
          propertySearchMode={propertySearchMode}
        />
      </div>
    </header>
  );
}
