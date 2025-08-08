'use client';

import { useState, useEffect } from 'react';
import { Boundary, MobileSearchBarProps, RecentSearch,  } from '@/types';
import InputSearch from '@/components/mobile/InputSearch';
import MobileLocationDropDown from '@/components/mobile/MobileLocationDropDown';
import LocationSearch from '@/components/search/LocationSearch';

export default function MobileSearchBar({
  isOpen,
  openMenu,
}: MobileSearchBarProps) {

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [boundaries, setBoundaries] = useState<Boundary[]>([]);
  const [show, setShow] = useState(false);
  const [initialValue, setInitialValue] = useState('');
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
  useEffect(() => {
    fetchRecentSearches();
    fetchBoundaries();
  }, []);

  const handleInputFocus = () => {
    if (!isOpen) {
      openMenu();
    }
  };

  const showValue = (e) => {
    setShow(true);
    document.body.style.overflow = "hidden";
    setInitialValue(e.target.value);
  }

  const hideShowPanel = () => {
    setShow(false);
    document.body.style.overflow = "";
    }
  return (
    <>
      {!show && <InputSearch handleInputFocus={handleInputFocus} onChange={showValue}/>}
        <LocationSearch
          onLocationSelect={()=>{}}
          isExpanded={isOpen}
          isMobile={true}
        />
      {show && (
        <MobileLocationDropDown
          initialValue={initialValue}
          sections={boundaries}
          closeMenu={()=>{
            hideShowPanel()
          }}
          defaultSelectedId="bregenz"
          onSelect={item => console.log('Selected:', item)}
        />
      )}
    </>
  );
}
