import React from 'react';
import { ChevronLeftIcon, MenuIcon, SearchIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#FFF159] py-2">
      <div className="max-w-6xl mx-auto px-4 flex items-center space-x-2">
        <button aria-label="Voltar" className="flex-shrink-0 p-2">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>

        <div className="flex-grow relative">
           <input
            type="text"
            placeholder="Buscar produtos, marcas e muito mais..."
            className="w-full h-10 px-4 pr-10 rounded-sm bg-white text-gray-800 placeholder-gray-500 text-base focus:outline-none"
          />
          <div className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-400 pointer-events-none">
             <SearchIcon className="w-5 h-5" />
          </div>
        </div>

        <button aria-label="Menu" className="flex-shrink-0 p-2">
          <MenuIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </header>
  );
};
