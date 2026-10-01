import { SalonConfig } from '../types/salon';
import { buildWhatsAppUrl, WhatsAppMessages } from '../utils/whatsapp';
import { MessageCircle, Phone, MapPin, Sparkles, Heart, Mail } from 'lucide-react';

interface FooterProps {
  config: SalonConfig;
}

export function Footer({ config }: FooterProps) {
  const contactWhatsAppUrl = buildWhatsAppUrl(
    config.whatsapp,
    WhatsAppMessages.contactInquiry(config.name)
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171614] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Col 1: Brand & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-serif font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                {config.name}
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed font-sans max-w-sm">
              {config.description}
            </p>

            <div className="pt-2">
              <a
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-sans">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Services & Pricing
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  onClick={(e) => handleNavClick(e, 'booking')}
                  className="text-amber-300 hover:text-white transition-colors font-medium"
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => handleNavClick(e, 'reviews')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Client Reviews
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Salon Address & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Information (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-sans">
              Contact & Hours
            </h4>

            <div className="space-y-3 text-sm text-neutral-400 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{config.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors font-mono"
                >
                  {config.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={contactWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-mono"
                >
                  +{config.whatsapp} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${config.email || 'contact@glowandstylesalon.com'}`}
                  className="hover:text-white transition-colors"
                >
                  {config.email || 'contact@glowandstylesalon.com'}
                </a>
              </div>

              <div className="pt-2 text-xs text-neutral-500">
                <span>{config.openingHours} · {config.workingDays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Reusable Template Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
          <p>© {currentYear} {config.name}. All rights reserved.</p>

          <p className="flex items-center gap-1.5 text-neutral-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for boutique salons</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
