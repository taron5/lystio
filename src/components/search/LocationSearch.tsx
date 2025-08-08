'use client';

import { useEffect, useRef, useState } from 'react';
import { LocationSearchProps, RecentSearch, Boundary } from '@/types';
import LocationDropdown from './LocationDropdown';

// Mapbox imports
import { AddressAutofill } from '@mapbox/search-js-react';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibHlzdGlvIiwiYSI6ImNtMjA3cmFoejBnMngycXM4anNuNXFmaTQifQ.y-WiEerYZrFOm8Xd8a7GwQ';

export default function LocationSearch({
  onLocationSelect,
  isExpanded,
  isMobile = false,
}: LocationSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [boundaries, setBoundaries] = useState<Boundary[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showDistrictPanel, setShowDistrictPanel] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Fetch recent searches and boundaries when component mounts
  useEffect(() => {
    fetchRecentSearches();
    fetchBoundaries();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // setOpen(false);
        setShowRecentSearches(false);
        setShowDistrictPanel(false);
        setSelectedRegion(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  // Open dropdown when expanded
  useEffect(() => {
      setOpen(isExpanded);
  }, [isExpanded]);

  const fetchRecentSearches = async () => {
    try {
      const response = await fetch('https://api.lystio.co/geo/search/recent');
      if (response.ok) {
        const data = await response.json();
        setRecentSearches(data);
      }
    } catch (error) {
      console.error('Failed to fetch recent searches:', error);
    }
  };

  const fetchBoundaries = async () => {
    try {
      const response = await fetch('https://api.lystio.co/geo/boundary');
      if (response.ok) {
        const data = await response.json();
        setBoundaries(data);
      }
    } catch (error) {
      console.error('Failed to fetch boundaries:', error);
    }
  };
  const handleLocationClick = (location: string, boundaryId?: string) => {
    setQuery(location);
    onLocationSelect(location, boundaryId);
    setOpen(false);
    setShowRecentSearches(false);
    setShowDistrictPanel(false);
    setSelectedRegion(null);
  };

  const handleRegionClick = (regionName: string, regionId: string) => {
    setSelectedRegion(regionId);
    setShowDistrictPanel(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      setOpen(true);
      setShowRecentSearches(false);
      setShowDistrictPanel(false);
      setSelectedRegion(null);
    } else {
      setShowRecentSearches(true);
      setOpen(true);
    }
  };
  const handleInputFocus = () => {
    setOpen(true);
    if (!query || query.length === 0) {
      setShowRecentSearches(true);
    }
  };
  const handleInputBlur = () => {
    setTimeout(() => {
      if (!ref.current?.contains(document.activeElement)) {
        setShowRecentSearches(false);
      }
    }, 100);
  };

  return (
    <div className="flex-1" ref={ref}>
      {!isMobile &&
        <div className="px-4 pl-6 py-3 cursor-pointer rounded-l-full hover:bg-[#F7F7FD]" onClick={() => setOpen(true)}>
        <label className="block text-[14px] text-black mb-1">Location</label>
        <div>
          {/* @ts-expect-error - AddressAutofill component has type compatibility issues with React 18/19 */}
          <AddressAutofill
            onRetrieve={a => console.log(a, 'retrieved')}
            accessToken={MAPBOX_TOKEN}
            options={{
              language: 'de',
              country: 'at',
            }}
          >
            <input
              type="text"
              placeholder="Search address, neighborhood, city, or ZIP code"
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full text-black  focus:outline-none text-[16px]"
              autoComplete="address-line1"
            />
          </AddressAutofill>
        </div>
      </div>
      }

      {/* Recent Searches Dropdown */}
      {/*{showRecentSearches && recentSearches.length > 0 && (*/}
      {/*  <div className="absolute w-fit top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">*/}
      {/*    <div className="p-2">*/}
      {/*      <div className="flex items-center px-3 py-2 text-xs text-gray-500 border-b border-gray-100">*/}
      {/*        <ClockIcon className="h-4 w-4 mr-2" />*/}
      {/*        Recent Searches*/}
      {/*      </div>*/}
      {/*      <div className="mt-1">*/}
      {/*        {recentSearches.slice(0, 5).map(search => (*/}
      {/*          <button*/}
      {/*            key={search.id}*/}
      {/*            onClick={() => handleLocationClick(search.name)}*/}
      {/*            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between group"*/}
      {/*          >*/}
      {/*            <span>{search.name}</span>*/}
      {/*            <div className="text-xs text-gray-400 group-hover:text-gray-600">*/}
      {/*              {search.type}*/}
      {/*            </div>*/}
      {/*          </button>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
        <LocationDropdown
          open={open}
          isMobile={isMobile}
          showRecentSearches={showRecentSearches}
          showDistrictPanel={showDistrictPanel}
          selectedRegion={selectedRegion}
          boundaries={boundaries}
          handleLocationClick={handleLocationClick}
          handleRegionClick={handleRegionClick}
        />
    </div>
  );
}
