import { SalonConfig } from '../types/salon';
import { buildWhatsAppUrl, WhatsAppMessages } from '../utils/whatsapp';
import { MessageCircle, ArrowRight, Star, Clock, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  config: SalonConfig;
}

export function Hero({ config }: HeroProps) {
  const appointmentWhatsAppUrl = buildWhatsAppUrl(
    config.whatsapp,
    WhatsAppMessages.generalBooking(config.name)
  );

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      const navOffset = 80;
      const elementPosition = servicesEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Subtle architectural background ambiance */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -z-10 w-80 h-80 bg-neutral-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Elegant Subtitle Kicker (Clean unboxed text, no pill clutter) */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Boutique Beauty & Hair Studio</span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-600 font-normal">{config.city}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12] text-balance">
                {config.tagline || 'Where Style Meets Confidence'}
              </h1>
              <p className="text-lg sm:text-xl font-serif italic text-amber-900/90 font-medium">
                Welcome to {config.name}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {config.description}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {/* WhatsApp Appointment Booking Primary CTA */}
                <a
                  href={appointmentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Book Appointment</span>
                </a>

                {/* View Services Secondary CTA */}
                <a
                  href="#services"
                  onClick={scrollToServices}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 hover:text-neutral-950 border border-neutral-300 active:scale-98 rounded-xl shadow-xs transition-all duration-200"
                >
                  <span>View Services</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                </a>
              </div>

              {/* Quick shortcut to custom slot picker */}
              <div className="text-center lg:text-left">
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('booking');
                    if (el) {
                      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-amber-900 transition-colors font-medium underline underline-offset-4"
                >
                  <span>Or customize specific date & time slot</span>
                  <span>↓</span>
                </a>
              </div>
            </div>

            {/* Trust and Feature Signals */}
            <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-3 gap-3 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-neutral-900">4.9 / 5</span>
                </div>
                <p className="text-xs text-neutral-500 font-sans">280+ Happy Clients</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-neutral-900">Top Hygiene</span>
                </div>
                <p className="text-xs text-neutral-500 font-sans">Sterilized Tools</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span className="text-sm font-semibold text-neutral-900">7 Days Open</span>
                </div>
                <p className="text-xs text-neutral-500 font-sans">{config.openingHours}</p>
              </div>
            </div>
          </div>

          {/* Right Imagery Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-linear-to-tr from-amber-200/40 via-amber-100/20 to-neutral-200/30 -z-10 rotate-1 transform" />

              {/* Main Image Container */}
              <div className="overflow-hidden rounded-2xl shadow-xl border border-neutral-200/90 aspect-4/5 sm:aspect-16/11 lg:aspect-4/5 relative group">
                <img
                  src={config.heroImage}
                  alt={`${config.name} salon boutique interior`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient overlay at bottom for clarity */}
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Salon Stamp on image */}
                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-auto">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-3.5 border border-white/15 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-amber-200 uppercase tracking-wider font-semibold">
                        Instant Booking
                      </p>
                      <p className="text-sm font-medium text-white">Direct WhatsApp Confirmation</p>
                    </div>
                    <a
                      href={appointmentWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center shadow-xs"
                      aria-label="Direct WhatsApp message"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Verified Salon Badge Floating Card */}
              <div className="hidden sm:flex absolute -top-4 -left-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-neutral-200 items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Certified Stylists</p>
                  <p className="text-[11px] text-neutral-500">Premium salon grade care</p>
                </div>
              </div>

              {/* Location Tag Floating Card */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-lg border border-neutral-200 items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs font-medium text-neutral-800">{config.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
