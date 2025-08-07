'use client';

import { ActionButtonsProps } from '@/types';
import clsx from 'clsx';

export default function ActionButtons({
  propertySearchMode,
  setPropertySearchMode,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center space-x-2 flex-wrap gap-2">
      {/* Rent/Buy Toggle */}
      <div className="flex bg-[#F7F7FD] border-1 border-[#EEE7FF] rounded-full p-1 gap-1">
        <button
          onClick={() => setPropertySearchMode('rent')}
          className={clsx(
            'cursor-pointer px-3 sm:px-3 py-1 rounded-full text-md font-medium transition-all duration-200',
            propertySearchMode === 'rent'
              ? 'bg-white text-[#0E0E0E] drop-shadow-xl'
              : 'text-black'
          )}
        >
          Rent
        </button>
        <button
          onClick={() => setPropertySearchMode('buy')}
          className={clsx(
            'cursor-pointer px-3 sm:px-3 py-1 rounded-full text-md font-medium transition-all duration-200',
            propertySearchMode === 'buy'
              ? 'bg-white text-[#0E0E0E] drop-shadow-xl'
              : 'text-black'
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setPropertySearchMode('lystio-ai')}
          className={clsx(
            'cursor-pointer px-3 sm:px-3 py-1 rounded-full text-md font-medium transition-all duration-200',
            propertySearchMode === 'lystio-ai'
              ? 'bg-white text-[#0E0E0E] drop-shadow-xl'
              : 'text-black'
          )}
        >
          Lystio <span className="bg-[linear-gradient(to_top,#5110E8,#A540F3)] bg-clip-text text-transparent">AI</span>
        </button>
      </div>
    </div>
  );
}
