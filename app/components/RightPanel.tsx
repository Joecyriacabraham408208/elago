'use client';
import { useState } from 'react';
import { ArrowUpDown, ChevronRight, X, LayoutGrid, List } from 'lucide-react';
import { Property, formatPrice } from './data';
import PropertyCard from './PropertyCard';

interface RightPanelProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'possession';

export default function RightPanel({ properties, selectedId, onSelect, collapsed, onToggle }: RightPanelProps) {
  const [sort, setSort] = useState<SortKey>('featured');

  const sorted = [...properties].sort((a, b) => {
    if (sort === 'price-asc') return a.priceFrom - b.priceFrom;
    if (sort === 'price-desc') return b.priceFrom - a.priceFrom;
    return 0;
  });

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="flex flex-col items-center gap-2 w-12 py-4 bg-elago-panel border-l border-elago-border hover:bg-elago-card transition-colors duration-200 group"
      >
        <List size={18} className="text-elago-muted group-hover:text-elago-accent transition-colors" />
        <span className="writing-mode-vert text-xs text-elago-muted tracking-widest uppercase" style={{writingMode:'vertical-rl', textOrientation:'mixed'}}>
          {properties.length} Results
        </span>
      </button>
    );
  }

  return (
    <aside className="w-72 h-full flex flex-col bg-elago-panel border-l border-elago-border animate-slide-right overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-elago-border">
        <div>
          <span className="font-display text-lg font-medium text-elago-light tracking-wide">Results</span>
          <span className="ml-2 text-xs text-elago-muted font-body">{properties.length} found</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onToggle} className="text-elago-muted hover:text-elago-light transition-colors p-1">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Sort */}
      <div className="px-4 py-3 border-b border-elago-border">
        <div className="flex items-center gap-2">
          <ArrowUpDown size={12} className="text-elago-muted flex-shrink-0" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            className="flex-1 bg-elago-card border border-elago-border rounded-lg px-2 py-1.5 text-xs text-elago-light font-body focus:outline-none focus:border-elago-accent/50 transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="possession">Possession</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <div className="text-3xl mb-3">🏡</div>
            <p className="text-elago-muted font-body text-sm">No properties match your filters</p>
            <p className="text-elago-muted/60 font-body text-xs mt-1">Try adjusting your criteria</p>
          </div>
        ) : (
          sorted.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              selected={selectedId === property.id}
              onClick={() => onSelect(property.id)}
              index={i}
            />
          ))
        )}
      </div>
    </aside>
  );
}
