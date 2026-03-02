'use client';
import { Phone, Mail, BedDouble, Square } from 'lucide-react';
import { Property, TYPE_COLORS, STATUS_COLORS, formatPrice } from './data';

interface PropertyCardProps {
  property: Property;
  selected: boolean;
  onClick: () => void;
  index: number;
}

export default function PropertyCard({ property, selected, onClick, index }: PropertyCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-200 group animate-fadein ${
        selected
          ? 'border-elago-accent/60 bg-elago-card shadow-[0_0_0_1px_rgba(46,204,154,0.2)]'
          : 'border-elago-border bg-elago-card hover:border-elago-accent/30 hover:shadow-lg'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-elago-card via-transparent to-transparent" />

        {/* Status badge */}
        <div
          className="absolute top-2 left-2 text-xs font-body px-2 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: `${STATUS_COLORS[property.status]}20`,
            color: STATUS_COLORS[property.status],
            border: `1px solid ${STATUS_COLORS[property.status]}40`
          }}
        >
          {property.status}
        </div>

        {/* Type badge */}
        <div
          className="absolute top-2 right-2 text-xs font-body px-2 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: `${TYPE_COLORS[property.type]}20`,
            color: TYPE_COLORS[property.type],
            border: `1px solid ${TYPE_COLORS[property.type]}40`
          }}
        >
          {property.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-display text-base font-semibold text-elago-light leading-tight mb-0.5 group-hover:text-elago-accent transition-colors">
          {property.name}
        </h3>
        <p className="text-xs text-elago-muted font-body mb-2">{property.builder}</p>

        {/* Price */}
        <div className="text-sm font-mono font-medium text-elago-accent mb-2">
          {formatPrice(property.priceFrom)} – {formatPrice(property.priceTo)}
        </div>

        {/* Details row */}
        <div className="flex items-center gap-3 text-xs text-elago-muted font-body mb-3">
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <BedDouble size={11} /> {property.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Square size={11} /> {property.area}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-elago-muted font-body mb-3">
          <span className="text-elago-muted/50">Possession:</span>
          <span className="text-elago-light">{property.possession}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`tel:${property.phone}`}
            onClick={e => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-elago-accent/10 border border-elago-accent/20 text-elago-accent text-xs font-body hover:bg-elago-accent/20 transition-colors"
          >
            <Phone size={11} /> Call
          </a>
          <a
            href={`mailto:${property.email}`}
            onClick={e => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-elago-border text-elago-muted text-xs font-body hover:text-elago-light hover:bg-elago-border/70 transition-colors"
          >
            <Mail size={11} /> Enquire
          </a>
        </div>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-elago-accent" />
      )}
    </div>
  );
}
