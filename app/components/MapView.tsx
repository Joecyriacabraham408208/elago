'use client';
import { useEffect, useRef, useState } from 'react';
import { Property, TYPE_COLORS } from './data';
import MapPreviewCard from './MapPreviewCard';

interface MapViewProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function MapView({ properties, selectedId, onSelect }: MapViewProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [L, setL] = useState<any>(null);

  // Load Leaflet (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('leaflet').then((mod) => {
      setL(mod.default);
    });
  }, []);

  // Init map
  useEffect(() => {
    if (!L || !mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 11,
      zoomControl: true,
      attributionControl: false,
    });

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Attribution (small)
    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [L]);

  // Add markers
  useEffect(() => {
    if (!L || !mapRef.current) return;

    // Remove existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    properties.forEach(property => {
      const color = TYPE_COLORS[property.type];
      const isSelected = property.id === selectedId;
      const size = isSelected ? 36 : 28;
      const ring = isSelected ? `box-shadow:0 0 0 3px ${color}40;` : '';

      const iconHtml = `
        <div style="
          width:${size}px;height:${size}px;
          background:${color};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          display:flex;align-items:center;justify-content:center;
          border:2px solid rgba(255,255,255,0.3);
          transition:all 0.2s;
          ${ring}
          cursor:pointer;
          position:relative;
        ">
          <div style="transform:rotate(45deg);width:8px;height:8px;background:rgba(255,255,255,0.9);border-radius:50%;"></div>
        </div>
      `;

      const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-pin',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
      });

      const marker = L.marker([property.lat, property.lng], { icon });

      marker.on('click', (e: any) => {
        const point = mapRef.current.latLngToContainerPoint(e.latlng);
        setPopupPos({ x: point.x, y: point.y });
        setActiveProperty(property);
        onSelect(property.id);
        e.originalEvent.stopPropagation();
      });

      marker.addTo(mapRef.current);
      markersRef.current.push(marker);
    });

  }, [L, properties, selectedId]);

  // Close popup on map click
  useEffect(() => {
    if (!mapRef.current) return;
    const handler = () => {
      setActiveProperty(null);
      onSelect(null);
    };
    mapRef.current.on('click', handler);
    return () => mapRef.current?.off('click', handler);
  }, [mapRef.current]);

  // Pan to selected
  useEffect(() => {
    if (!mapRef.current || !selectedId) return;
    const prop = properties.find(p => p.id === selectedId);
    if (prop) {
      mapRef.current.panTo([prop.lat, prop.lng], { animate: true, duration: 0.5 });
    }
  }, [selectedId]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute bottom-6 left-4 glass rounded-xl p-3 z-[1000]">
        <p className="text-xs text-elago-muted font-body uppercase tracking-widest mb-2">Legend</p>
        {([['Flat', '#3B82F6'], ['Villa', '#2ECC9A'], ['Commercial', '#EF4444'], ['Plot', '#F0B429']] as [string, string][]).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2 mb-1 last:mb-0">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-elago-light font-body">{label}</span>
          </div>
        ))}
      </div>

      {/* Popup card */}
      {activeProperty && (
        <div
          className="absolute z-[2000] pointer-events-auto"
          style={{
            left: Math.min(popupPos.x - 144, (mapContainerRef.current?.offsetWidth ?? 800) - 290),
            top: Math.max(popupPos.y - 420, 10),
          }}
        >
          <MapPreviewCard
            property={activeProperty}
            onClose={() => { setActiveProperty(null); onSelect(null); }}
            onOpenDetails={() => {}}
          />
        </div>
      )}
    </div>
  );
}
