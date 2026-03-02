'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Search, Bell, Settings, ChevronDown, Map, Building2 } from 'lucide-react';
import { PROPERTIES, PropertyType, PropertyStatus } from './components/data';
import FilterPanel from './components/FilterPanel';
import RightPanel from './components/RightPanel';

const MapView = dynamic(() => import('./components/MapView'), { ssr: false });

interface Filters {
  types: PropertyType[];
  statuses: PropertyStatus[];
  priceMin: number;
  priceMax: number;
  builder: string;
  nearMetro: boolean;
  highYield: boolean;
}

const DEFAULT_FILTERS: Filters = {
  types: ['Flat', 'Villa', 'Commercial', 'Plot'],
  statuses: ['New Launch', 'Under Construction', 'Ready', 'Resale'],
  priceMin: 4500000,
  priceMax: 35000000,
  builder: 'All',
  nearMetro: false,
  highYield: false,
};

export default function Home() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [resultsCollapsed, setResultsCollapsed] = useState(false);

  const filtered = useMemo(() => {
    return PROPERTIES.filter(p => {
      if (!filters.types.includes(p.type)) return false;
      if (!filters.statuses.includes(p.status)) return false;
      if (p.priceFrom < filters.priceMin) return false;
      if (p.priceTo > filters.priceMax) return false;
      if (filters.builder !== 'All' && p.builder !== filters.builder) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="h-screen flex flex-col bg-elago-dark overflow-hidden">
      <header className="flex items-center justify-between px-6 py-3 bg-elago-panel border-b border-elago-border z-50 flex-shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-elago-accent to-blue-500 flex items-center justify-center">
              <Building2 size={14} className="text-white" />
            </div>
            <span className="font-display text-2xl font-bold tracking-[0.12em] text-elago-light">ELAGO</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {['Map View', 'Listings', 'Analytics'].map((tab, i) => (
              <button key={tab} className={`px-4 py-1.5 rounded-lg text-sm font-body transition-colors ${i === 0 ? 'bg-elago-accent/15 text-elago-accent border border-elago-accent/25' : 'text-elago-muted hover:text-elago-light hover:bg-elago-card'}`}>{tab}</button>
            ))}
          </nav>
        </div>
        <div className="hidden lg:flex items-center gap-2 bg-elago-card border border-elago-border rounded-xl px-4 py-2 w-72">
          <Search size={14} className="text-elago-muted flex-shrink-0" />
          <input type="text" placeholder="Search projects, builders, areas..." className="bg-transparent text-sm text-elago-light placeholder:text-elago-muted focus:outline-none font-body w-full" />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-elago-muted hover:text-elago-light hover:bg-elago-card rounded-lg transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-elago-accent rounded-full" />
          </button>
          <button className="p-2 text-elago-muted hover:text-elago-light hover:bg-elago-card rounded-lg transition-colors">
            <Settings size={16} />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-elago-border">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-elago-accent/40 to-blue-500/40 border border-elago-accent/30 flex items-center justify-center">
              <span className="text-xs font-body font-medium text-elago-accent">AE</span>
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-body font-medium text-elago-light leading-none">Abcd Efg</p>
              <p className="text-xs font-body text-elago-muted leading-none mt-0.5">Sales Agent</p>
            </div>
            <ChevronDown size={12} className="text-elago-muted" />
          </div>
        </div>
      </header>

      <div className="flex items-center gap-3 px-5 py-2 bg-elago-dark border-b border-elago-border/50 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-elago-muted font-body">
          <Map size={11} className="text-elago-accent" />
          <span>Showing <span className="text-elago-accent font-medium">{filtered.length}</span> properties in map view</span>
        </div>
        <div className="h-3 w-px bg-elago-border" />
        <div className="flex items-center gap-3">
          {(['New Launch', 'Ready', 'Under Construction'] as PropertyStatus[]).map(s => (
            <span key={s} className="text-xs text-elago-muted font-body">
              <span className="text-elago-light">{PROPERTIES.filter(p => p.status === s).length}</span> {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <FilterPanel filters={filters} onChange={setFilters} collapsed={filterCollapsed} onToggle={() => setFilterCollapsed(!filterCollapsed)} resultCount={filtered.length} />
        <main className="flex-1 relative overflow-hidden">
          <MapView properties={filtered} selectedId={selectedId} onSelect={setSelectedId} />
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[500]">
            <button className="glass px-3 py-1.5 rounded-lg text-xs font-body text-elago-muted hover:text-elago-light transition-colors flex items-center gap-1.5 border border-elago-border/50">
              <span className="w-1.5 h-1.5 bg-elago-accent rounded-full animate-pulse" />
              Live view
            </button>
          </div>
        </main>
        <RightPanel properties={filtered} selectedId={selectedId} onSelect={setSelectedId} collapsed={resultsCollapsed} onToggle={() => setResultsCollapsed(!resultsCollapsed)} />
      </div>
    </div>
  );
}
