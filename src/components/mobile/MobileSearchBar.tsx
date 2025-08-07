'use client';

import { useState, useEffect } from 'react';
import { SearchBarProps, SearchFilters } from '@/types';
import SearchBar from '@/components/mobile/SearchBar';

export default function MobileSearchBar({
  onSearch,
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
  }, [
    propertySearchMode,
    selectedBoundaryIds,
    selectedCategory,
    selectedPrice,
  ]);

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
      <SearchBar/>
    </div>
  );
}
