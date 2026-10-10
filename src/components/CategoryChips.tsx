import React from 'react';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 px-4 sm:px-6 max-w-7xl mx-auto">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-[#01875f] text-white border-[#01875f] shadow-sm font-semibold'
                : 'bg-[#282a2d] text-gray-300 border-[#3c4043] hover:bg-[#35373b] hover:text-white'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
