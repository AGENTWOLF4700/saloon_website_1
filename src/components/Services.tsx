import { useState, useMemo } from 'react';
import { SalonConfig, SalonService } from '../types/salon';
import { buildWhatsAppUrl, WhatsAppMessages } from '../utils/whatsapp';
import { MessageCircle, Clock, Sparkles, Scissors } from 'lucide-react';

interface ServicesProps {
  config: SalonConfig;
}

export function Services({ config }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories from config
  const categories = useMemo(() => {
    const list = Array.from(new Set(config.services.map((s) => s.category)));
    return ['All', ...list];
  }, [config.services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') return config.services;
    return config.services.filter((s) => s.category === selectedCategory);
  }, [config.services, selectedCategory]);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F5F2EC]/60 border-y border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Curated Treatments & Grooming</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Our Salon Services
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-sans text-balance">
            Every appointment begins with a personal consultation. Select any treatment below to reserve your slot directly on WhatsApp.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  {cat === 'All' ? 'All Services' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => {
            const serviceWhatsAppUrl = buildWhatsAppUrl(
              config.whatsapp,
              WhatsAppMessages.serviceBooking(config.name, service.name, service.price, service.currency)
            );

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Fallback */}
                <div className="relative aspect-16/10 bg-neutral-100 overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-amber-50 to-neutral-100 text-amber-800">
                      <Scissors className="w-10 h-10 opacity-40" />
                    </div>
                  )}

                  {/* Clean unboxed category label overlay */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase text-neutral-800 shadow-2xs border border-white/40">
                    {service.category}
                  </div>

                  {service.isPopular && (
                    <div className="absolute top-3 right-3 bg-amber-600 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase shadow-2xs">
                      Popular
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    {/* Duration & Header */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed font-sans line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Pricing & WhatsApp Booking Action */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-sans">
                        Starting from
                      </span>
                      <span className="text-2xl font-bold text-neutral-900 font-sans tabular-nums">
                        {service.currency || '₹'}{service.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Book on WhatsApp CTA */}
                    <a
                      href={serviceWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 rounded-xl shadow-xs hover:shadow transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Custom Request WhatsApp Note */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-neutral-900">
              Need a personalized package or have a special occasion?
            </h4>
            <p className="text-sm text-neutral-600 font-sans">
              Talk directly with our master stylists. We customize bridal, pre-grooming, and party packages on WhatsApp.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(config.whatsapp, `Hi ${config.name}, I would like to inquire about custom packages.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors border border-neutral-300"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Ask Us Anything</span>
          </a>
        </div>
      </div>
    </section>
  );
}
