'use client';

import { Boundary } from '@/types';
import { useState } from 'react';
import { cleanDistrictName } from '@/utils';

const POPULAR_LOCATIONS = [
  {
    name: 'Wien',
    id: 'vienna',
    img: 'https://lystio.co/cdn-cgi/image//_next/static/media/Vienna.73456672.png',
  },
  { name: 'Linz', id: 'linz', img: '/images/linz.jpg' },
  { name: 'Graz', id: 'graz', img: '/images/graz.jpg' },
];

const OTHER_LOCATIONS = [
  {
    name: 'Niederösterreich',
    id: 'lower-austria',
    img: 'https://lystio.co/cdn-cgi/image//_next/static/media/LowerAustria.95803bba.png',
  },
  {
    name: 'Oberösterreich',
    id: 'upper-austria',
    img: '/images/upper-austria.jpg',
  },
  { name: 'Steiermark', id: 'styria', img: '/images/styria.jpg' },
  { name: 'Salzburg', id: 'salzburg', img: '/images/salzburg.jpg' },
  { name: 'Tirol', id: 'tyrol', img: '/images/tyrol.jpg' },
  { name: 'Kärnten', id: 'carinthia', img: '/images/carinthia.jpg' },
];

interface LocationDropdownProps {
  open: boolean;
  isMobile: boolean;
  showRecentSearches: boolean;
  showDistrictPanel: boolean;
  selectedRegion: string | null;
  boundaries: Boundary[];
  handleLocationClick: (location: string, boundaryId?: string) => void;
  handleRegionClick: (regionName: string, regionId: string) => void;
}

export default function LocationDropdown({
  open,
  showRecentSearches,
  showDistrictPanel,
  selectedRegion,
  boundaries,
  handleLocationClick,
  handleRegionClick,
  isMobile = false
}: LocationDropdownProps) {
  const getDistrictsForRegion = (regionId: string) => {
    return boundaries.filter(
      b => b.type === 'district' && b.parent === regionId
    );
  };
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  if (!open) {
    return null;
  }
  const clickOnBoundaries = ({
    name,
    id,
    index,
  }: {
    name: string;
    id: string;
    index: number;
  }) => {
    setActiveIndex(index);
    handleRegionClick(name, id);
  };

  const selectAll = (index: number) => {};
  return (
    <div
      role="dialog"
      className={`absolute ${isMobile ? 'top-[101px] justify-self-center' : 'top-full'}  left-0 mt-2 z-50 overflow-hidden rounded-sm
             bg-white text-gray-950 shadow-lg shadow-gray-400/50
             outline-none dark:bg-white dark:text-gray-50
             flex max-h-[913px] border-0 w-auto items-start justify-start`}
    >
      <div className="relative overflow-hidden min-w-max">
        <div className="h-full w-full rounded-[inherit] overflow-hidden">
          <div style={{ minWidth: '100%', display: 'table' }}>
            <div className="w-full">
              <div className="space-y-4 px-4 py-4">
                {/* Popular Locations */}
                <div className="cursor-pointer rounded-md bg-white shadow-popular-location space-y-2 px-4 py-3">
                  <span className="text-sm font-semibold text-black">
                    Popular places
                  </span>
                  <ul className="grid grid-cols-3 gap-4">
                    {POPULAR_LOCATIONS.map(location => (
                      <li
                        key={location.id}
                        className="flex w-[70px] md:w-[90px] lg:w-[109px] flex-col gap-2 cursor-pointer"
                        onClick={() =>
                          handleLocationClick(location.name, location.id)
                        }
                      >
                        <div className="relative aspect-[109/89] w-full overflow-hidden rounded-sm bg-gray-200">
                          <img
                            alt={location.name}
                            className="object-cover absolute inset-0 w-full h-full"
                            src={location.img}
                            onError={e => {
                              (e.target as HTMLImageElement).src =
                                `https://via.placeholder.com/109x89/e5e7eb/6b7280?text=${location.name}`;
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-black overflow-hidden text-ellipsis whitespace-nowrap">
                          {location.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="cursor-pointer rounded-md bg-white shadow-popular-location mb-4 space-y-2 px-4 py-3">
                  <span className="text-sm font-semibold text-black">
                    Other places
                  </span>
                  <ul className="flex flex-col gap-2 py-2">
                    {boundaries.map((location, index) => (
                      <li
                        key={location.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          clickOnBoundaries({
                            name: location.name,
                            id: location.id,
                            index,
                          })
                        }
                      >
                        <div className="flex items-center gap-4">
                          <img
                            alt={location.name}
                            className="h-12 w-12 rounded-sm object-cover"
                            src={location?.img}
                            onError={e => {
                              (e.target as HTMLImageElement).src =
                                `https://via.placeholder.com/48x48/e5e7eb/6b7280?text=${location.name.charAt(0)}`;
                            }}
                          />
                          <span className="text-sm font-semibold text-black">
                            {location.name}
                          </span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 18l6-6-6-6"
                          />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* District selector panel on the right */}
      {showDistrictPanel && selectedRegion && (
        <div className="flex w-full min-w-96 flex-col gap-1 border-t pt-6 lg:border-l lg:border-t-0">
          <p className="hidden px-4 py-1 text-sm font-medium text-gray-600 lg:block">
            Bezirke in{' '}
            {OTHER_LOCATIONS.find(loc => loc.id === selectedRegion)?.name}
          </p>
          <div className={`px-4 space-y-2 ${isMobile ? 'absolute top-0 left-0 bg-white w-full' : ''}`}>
            {activeIndex !== null &&
              activeIndex > -1 &&
              boundaries[activeIndex] && (
                <>
                  <label className="flex items-center space-x-3 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={e => {
                        selectAll(activeIndex);
                      }}
                    />
                    <span className="text-[16px] text-black">Select All</span>
                  </label>

                  {/* District Checkboxes */}
                  {boundaries[activeIndex].children.map(district => (
                    <label
                      key={district.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={e => {
                          if (e.target.checked) {
                            handleLocationClick(district.name, district.id);
                          }
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-[16px] text-black">
                          {cleanDistrictName(district.name)}
                        </span>
                        <span className="text-sm text-gray-700">
                          {district.postal_code}
                        </span>
                      </div>
                    </label>
                  ))}
                </>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
