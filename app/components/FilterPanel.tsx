'use client';
import { useState } from 'react';
import { SlidersHorizontal, MapPin, ChevronDown, X, Zap, Train } from 'lucide-react';
import { PropertyType, PropertyStatus, TYPE_COLORS, formatPrice } from './data';

interface FilterPanelProps {
  filters: {
    types: PropertyType[];
    statuses: PropertyStatus[];
    priceMin: number;
    priceMax: number;
    builder: string;
    nearMetro: boolean;
    highYield: boolean;
  };
  onChange: (filters: any) => void;
  collapsed: boolean;
  onToggle: () => void;
  resultCount: number;
}

const ALL_TYPES: PropertyType[] = ['Flat', 'Villa', 'Commercial', 'Plot'];
const ALL_STATUSES: PropertyStatus[] = ['New Launch', 'Under Construction', 'Ready', 'Resale'];
const BUILDERS = ['All', 'Prestige Group', 'Sobha Developers', 'Embassy Group', 'Brigade Group', 'Adarsh Developers', 'Mahindra Lifespace'];

export default function FilterPanel({ filters, onChange, collapsed, onToggle, resultCount }: FilterPanelProps) {
  const [builderOpen, setBuilderOpen] = useState(false);

  const toggleType = (type: PropertyType) => {
    const types = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types });
  };

  const toggleStatus = (status: PropertyStatus) => {
    const statuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onChange({ ...filters, statuses });
  };

  const hasActiveFilters = filters.types.length < 4 || filters.statuses.length < 4 ||
    filters.priceMin > 4500000 || filters.priceMax < 35000000 || filters.builder !== 'All' ||
    filters.nearMetro || filters.highYield;

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="flex flex-col items-center gap-2 w-12 py-4 bg-elago-panel border-r border-elago-border hover:bg-elago-card transition-colors duration-200 group"
      >
        <SlidersHorizontal size={18} className="text-elago-muted group-hover:text-elago-accent transition-colors" />
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-elago-accent animate-pulse" />
        )}
        <span className="writing-mode-vert text-xs text-elago-muted tracking-widest uppercase" style={{writingMode:'vertical-rl', textOrientation:'mixed'}}>
          Filters
        </span>
      </button>
    );
  }

  return (
    <aside className="w-72 h-full flex flex-col bg-elago-panel border-r border-elago-border animate-slide-left overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-elago-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-elago-accent" />
          <span className="font-display text-lg font-medium text-elago-light tracking-wide">Refine</span>
          {hasActiveFilters && (
            <span className="text-xs bg-elago-accent/20 text-elago-accent px-2 py-0.5 rounded-full font-body">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-elago-muted font-body">{resultCount} results</span>
          <button onClick={onToggle} className="text-elago-muted hover:text-elago-light transition-colors p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Location */}
        <div>
          <label className="text-xs text-elago-muted uppercase tracking-widest font-body mb-3 block">Location</label>
          <div className="relative mb-2">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-elago-muted" />
            <input
              type="text"
              placeholder="Search area, city..."
              className="w-full bg-elago-card border border-elago-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-elago-light placeholder:text-elago-muted focus:outline-none focus:border-elago-accent/50 transition-colors font-body"
            />
          </div>
          <button className="w-full text-xs text-elago-accent hover:text-elago-accent/80 transition-colors text-left flex items-center gap-2">
            <span className="w-1 h-1 bg-elago-accent rounded-full"></span>
            Drop pin on map
          </button>
        </div>

        {/* Property Type */}
        <div>
          <label className="text-xs text-elago-muted uppercase tracking-widest font-body mb-3 block">Property Type</label>
          <div className="grid grid-cols-2 gap-2">
            {ALL_TYPES.map(type => {
              const active = filters.types.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-body transition-all duration-150 ${
                    active
                      ? 'border-transparent bg-elago-card text-elago-light'
                      : 'border-elago-border text-elago-muted hover:border-elago-accent/30 hover:text-elago-light'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: active ? TYPE_COLORS[type] : '#6B7A99' }}
                  />
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-xs text-elago-muted uppercase tracking-widest font-body mb-3 block">Price Range</label>
          <div className="space-y-3">
            <input
              type="range"
              min={4500000}
              max={35000000}
              step={500000}
              value={filters.priceMin}
              onChange={e => onChange({ ...filters, priceMin: +e.target.value })}
              className="w-full"
            />
            <input
              type="range"
              min={4500000}
              max={35000000}
              step={500000}
              value={filters.priceMax}
              onChange={e => onChange({ ...filters, priceMax: +e.target.value })}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-elago-accent">{formatPrice(filters.priceMin)}</span>
              <span className="text-xs text-elago-muted">—</span>
              <span className="text-xs font-mono text-elago-accent">{formatPrice(filters.priceMax)}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-xs text-elago-muted uppercase tracking-widest font-body mb-3 block">Status</label>
          <div className="space-y-2">
            {ALL_STATUSES.map(status => {
              const active = filters.statuses.includes(status);
              return (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-sm font-body transition-all duration-150 text-left ${
                    active
                      ? 'border-elago-border bg-elago-card text-elago-light'
                      : 'border-transparent text-elago-muted hover:bg-elago-card/50 hover:text-elago-light'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? 'opacity-100' : 'opacity-30'}`}
                    style={{ backgroundColor: active ? '#2ECC9A' : '#6B7A99' }}
                  />
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Possession Date */}
        <div>
          <label className="text-xs text-elago-muted uppercase tracking-widest font-body mb-3 block">Possession By</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['DD', 'MM', 'YYYY'].map(pl => (
              <input
                key={pl}
                type="text"
                placeholder={pl}
                className="bg-elago-card border border-elago-border rounded-lg px-2 py-2 text-xs text-center text-elago-light placeholder:text-elago-muted focus:outline-none focus:border-elago-accent/50 transition-colors font-mono"
              />
            ))}
          </div>
        </div>

        {/* Builder */}
        <div>
          <label className="text-xs text-elago-muted uppercase tracking-widest font-body mb-3 block">Builder</label>
          <div className="relative">
            <button
              onClick={() => setBuilderOpen(!builderOpen)}
              className="w-full flex items-center justify-between bg-elago-card border border-elago-border rounded-lg px-3 py-2.5 text-sm text-elago-light font-body hover:border-elago-accent/30 transition-colors"
            >
              {filters.builder}
              <ChevronDown size={14} className={`text-elago-muted transition-transform ${builderOpen ? 'rotate-180' : ''}`} />
            </button>
            {builderOpen && (
              <div className="absolute z-50 top-full mt-1 w-full bg-elago-card border border-elago-border rounded-lg shadow-2xl overflow-hidden">
                {BUILDERS.map(b => (
                  <button
                    key={b}
                    onClick={() => { onChange({ ...filters, builder: b }); setBuilderOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm font-body transition-colors hover:bg-elago-border ${
                      filters.builder === b ? 'text-elago-accent' : 'text-elago-light'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick chips */}
        <div>
          <label className="text-xs text-elago-muted uppercase tracking-widest font-body mb-3 block">Quick Filters</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onChange({ ...filters, nearMetro: !filters.nearMetro })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body border transition-all ${
                filters.nearMetro
                  ? 'bg-elago-accent/20 border-elago-accent text-elago-accent'
                  : 'border-elago-border text-elago-muted hover:border-elago-accent/30 hover:text-elago-light'
              }`}
            >
              <Train size={11} /> Near Metro
            </button>
            <button
              onClick={() => onChange({ ...filters, highYield: !filters.highYield })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body border transition-all ${
                filters.highYield
                  ? 'bg-elago-gold/20 border-elago-gold text-elago-gold'
                  : 'border-elago-border text-elago-muted hover:border-elago-gold/30 hover:text-elago-light'
              }`}
            >
              <Zap size={11} /> High Yield
            </button>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="px-5 py-4 border-t border-elago-border">
        <button
          onClick={() => onChange({
            types: ALL_TYPES,
            statuses: ALL_STATUSES,
            priceMin: 4500000,
            priceMax: 35000000,
            builder: 'All',
            nearMetro: false,
            highYield: false,
          })}
          className="w-full py-2.5 rounded-lg border border-elago-border text-elago-muted text-sm font-body hover:text-elago-light hover:border-elago-accent/30 transition-all duration-150"
        >
          Reset all filters
        </button>
      </div>
    </aside>
  );
}
