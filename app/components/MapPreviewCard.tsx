'use client';
import { X, Phone, Mail, ArrowRight, BedDouble, Square, Calendar } from 'lucide-react';
import { Property, TYPE_COLORS, STATUS_COLORS, formatPrice } from './data';

interface MapPreviewCardProps {
  property: Property;
  onClose: () => void;
  onOpenDetails: () => void;
}

export default function MapPreviewCard({ property, onClose, onOpenDetails }: MapPreviewCardProps) {
  return (
    <div className="w-72 glass rounded-2xl overflow-hidden shadow-2xl animate-fadein border border-elago-border">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <X size={12} />
        </button>

        <div className="absolute bottom-2 left-3 right-3">
          <div className="flex items-center justify-between">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-body"
              style={{
                backgroundColor: `${STATUS_COLORS[property.status]}30`,
                color: STATUS_COLORS[property.status],
                border: `1px solid ${STATUS_COLORS[property.status]}50`,
              }}
            >
              {property.status}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-body"
              style={{
                backgroundColor: `${TYPE_COLORS[property.type]}30`,
                color: TYPE_COLORS[property.type],
                border: `1px solid ${TYPE_COLORS[property.type]}50`,
              }}
            >
              {property.type}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-elago-light leading-tight mb-0.5">
          {property.name}
        </h3>
        <p className="text-xs text-elago-muted font-body mb-3">{property.builder} · {property.address}</p>

        {/* Price */}
        <div className="text-base font-mono font-medium text-elago-accent mb-3">
          {formatPrice(property.priceFrom)} – {formatPrice(property.priceTo)}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-elago-muted font-body mb-3">
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <BedDouble size={11} className="text-elago-muted/60" /> {property.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Square size={11} className="text-elago-muted/60" /> {property.area}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} className="text-elago-muted/60" /> {property.possession}
          </span>
        </div>

        <p className="text-xs text-elago-muted font-body leading-relaxed mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`tel:${property.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-elago-accent/15 border border-elago-accent/25 text-elago-accent text-xs font-body hover:bg-elago-accent/25 transition-colors"
          >
            <Phone size={12} /> {property.phone}
          </a>
          <a
            href={`mailto:${property.email}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-elago-border text-elago-muted text-xs font-body hover:text-elago-light transition-colors"
          >
            <Mail size={12} />
          </a>
        </div>

        <button
          onClick={onOpenDetails}
          className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-lg border border-elago-border text-elago-light text-xs font-body hover:bg-elago-card transition-colors group"
        >
          View full details <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
