'use client';

import { Boundary } from '@/types';

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
}: LocationDropdownProps) {
  // Filter boundaries for districts of selected region
  const getDistrictsForRegion = (regionId: string) => {
    return boundaries.filter(
      b => b.type === 'district' && b.parent === regionId
    );
  };

  if (!open || showRecentSearches) {
    return null;
  }

  return (
    <div
      role="dialog"
      className="absolute top-full left-0 mt-2 z-50 overflow-hidden rounded-sm border bg-white text-gray-950 shadow-calendar outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 flex max-h-[913px] w-auto items-start justify-start"
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
                        className="flex max-w-[102px] flex-col gap-2 cursor-pointer"
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

                {/* Other Locations */}
                <div className="cursor-pointer rounded-md bg-white shadow-popular-location mb-4 space-y-2 px-4 py-3">
                  <span className="text-sm font-semibold text-black">
                    Other places
                  </span>
                  <ul className="flex flex-col gap-2 py-2">
                    {OTHER_LOCATIONS.map(location => (
                      <li
                        key={location.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleRegionClick(location.name, location.id)
                        }
                      >
                        <div className="flex items-center gap-4">
                          <img
                            alt={location.name}
                            className="h-12 w-12 rounded-sm object-cover"
                            src={location.img}
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
          <div className="px-4 space-y-2">
            {getDistrictsForRegion(selectedRegion).map(district => (
              <label
                key={district.id}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={e => {
                    if (e.target.checked) {
                      handleLocationClick(district.name, district.id);
                    }
                  }}
                />
                <span className="text-sm text-gray-700">
                  {district.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}