import { SalonConfig } from '../types/salon';
import { buildWhatsAppUrl, WhatsAppMessages } from '../utils/whatsapp';
import { MessageCircle, MapPin, Clock, Phone, Navigation, Sparkles, Mail } from 'lucide-react';

interface ContactProps {
  config: SalonConfig;
}

export function Contact({ config }: ContactProps) {
  const contactWhatsAppUrl = buildWhatsAppUrl(
    config.whatsapp,
    WhatsAppMessages.contactInquiry(config.name)
  );

  const salonEmail = config.email || 'contact@glowandstylesalon.com';

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F5F2EC]/60 border-t border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Salon Story & Hours (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Visit & Connect</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                Plan Your Visit to {config.name}
              </h2>

              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-sans max-w-xl">
                We are conveniently located in {config.city}. Walk-ins are welcomed based on availability, but we recommend a quick WhatsApp message to reserve your preferred stylist.
              </p>
            </div>

            {/* Information Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Card (Full width on sm) */}
              <div className="sm:col-span-2 p-5 bg-white rounded-xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Salon Address
                    </h3>
                    <p className="text-sm font-medium text-neutral-900 leading-snug">
                      {config.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Operating Hours
                </h3>
                <p className="text-sm font-semibold text-neutral-900">
                  {config.openingHours}
                </p>
                <p className="text-xs text-neutral-500 font-sans">
                  {config.workingDays}
                </p>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  WhatsApp Bookings
                </h3>
                <p className="text-sm font-semibold text-neutral-900 font-mono tabular-nums">
                  +{config.whatsapp}
                </p>
                <p className="text-xs text-emerald-700 font-medium">
                  Instant reply during working hours
                </p>
              </div>

              {/* Phone Direct Card */}
              <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Direct Phone Call
                </h3>
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-semibold text-neutral-900 hover:text-amber-800 transition-colors font-mono tabular-nums block"
                >
                  {config.phone}
                </a>
                <p className="text-xs text-neutral-500 font-sans">
                  Desk reception inquiries
                </p>
              </div>

              {/* Email Address Card */}
              <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Email Address
                </h3>
                <a
                  href={`mailto:${salonEmail}`}
                  className="text-sm font-semibold text-neutral-900 hover:text-amber-800 transition-colors font-sans block truncate"
                >
                  {salonEmail}
                </a>
                <p className="text-xs text-neutral-500 font-sans">
                  For corporate & wedding inquiries
                </p>
              </div>
            </div>

            {/* Actions: WhatsApp + Google Maps */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 hover:text-neutral-950 border border-neutral-300 active:scale-98 rounded-xl shadow-xs transition-all duration-200"
              >
                <Navigation className="w-4 h-4 text-neutral-600" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Map / Location Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-6">
              <div className="aspect-16/10 bg-neutral-100 rounded-xl overflow-hidden relative border border-neutral-200">
                {/* Styled Map Preview Card */}
                <div className="absolute inset-0 bg-neutral-900/5 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 animate-bounce">
                    <MapPin className="w-6 h-6 fill-red-500 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-neutral-900">
                      {config.name}
                    </h4>
                    <p className="text-xs text-neutral-600 font-sans max-w-xs mx-auto">
                      {config.address}
                    </p>
                  </div>
                  <a
                    href={config.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Quick Guidance */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Salon Arrival Tips
                </h4>
                <ul className="text-xs text-neutral-600 space-y-2 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>Free dedicated customer parking available directly in front of the salon.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>Please arrive 5–10 minutes prior to scheduled appointment for your consultation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>Complimentary organic tea, artisan coffee, and chilled refreshments served.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
