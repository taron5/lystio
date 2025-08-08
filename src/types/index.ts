// API Response Types
export interface RecentSearch {
  id: string;
  name: string;
}

export interface Boundary {
  id: string;
  name: string;
  type: 'bundesland' | 'city' | 'district';
  parent?: string;
  children?: never[];
}

export type PropertySearchMode = 'rent' | 'buy' | 'lystio-ai';

export interface SearchFilters {
  withinId: string[];
  rentType: (PropertySearchMode)[];
  category?: string;
  priceRange?: string;
}

export interface TenementCount {
  count: number;
}

// Component Props Types
export interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  propertySearchMode: PropertySearchMode;
}
export interface MobileSearchBarProps {
  openMenu: () => void;
  isOpen: boolean;

}
export interface MobileMenuProps {
  open: boolean;
  closeMenu: () => void;
}
export interface ActionButtonsProps {
  propertySearchMode: PropertySearchMode;
  setPropertySearchMode: (type: PropertySearchMode) => void;
}

export interface LocationSearchProps {
  onLocationSelect: (location: string, boundaryId?: string) => void;
  isExpanded: boolean;
  isMobile: boolean;
}
