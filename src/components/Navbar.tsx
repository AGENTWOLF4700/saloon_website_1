import { useState, useEffect, useRef } from 'react';
import { SalonConfig } from '../types/salon';
import { buildWhatsAppUrl, WhatsAppMessages } from '../utils/whatsapp';
import { MessageCircle, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  config: SalonConfig;
}

export function Navbar({ config }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect if user has scrolled past top zone
      setIsScrolled(currentScrollY > 40);

      // If user clicked a navigation link, NEVER collapse the navbar
      if (isNavigatingRef.current) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide navbar ONLY when user manually scrolls down, show when scrolling up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current + 8) {
          // Scrolling down manually
          setIsVisible(false);
          setIsMobileMenuOpen(false);
        } else if (currentScrollY < lastScrollY.current - 8) {
          // Scrolling up manually
          setIsVisible(true);
        }
      } else {
        // Near top of page, always visible
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // If user starts manual interaction (wheel or touch), resume normal manual scroll detection
    const handleUserInteraction = () => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const contactWhatsAppUrl = buildWhatsAppUrl(
    config.whatsapp,
    WhatsAppMessages.contactInquiry(config.name)
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Keep top bar visible during programmatic smooth navigation
    isNavigatingRef.current = true;
    setIsVisible(true);

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Reset the navigating lock after smooth scroll settles
    navigationTimeoutRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
      lastScrollY.current = window.scrollY;
    }, 1200);

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-neutral-200/80 py-3.5'
            : 'bg-[#FAF8F5]/80 backdrop-blur-xs py-4 md:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo / Wordmark */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-2 group text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-amber-300 font-serif font-bold text-sm tracking-widest shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-neutral-900 group-hover:text-amber-800 transition-colors">
                  {config.shortName || config.name}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links & Action */}
            <nav className="hidden md:flex items-center gap-7">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors relative py-1 hover:underline underline-offset-8"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors relative py-1 hover:underline underline-offset-8"
              >
                Services
              </a>
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, 'booking')}
                className="text-sm font-semibold text-amber-900 hover:text-amber-950 transition-colors relative py-1 hover:underline underline-offset-8 flex items-center gap-1"
              >
                <span>Book Slot</span>
              </a>
              <a
                href="#reviews"
                onClick={(e) => handleNavClick(e, 'reviews')}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors relative py-1 hover:underline underline-offset-8"
              >
                Reviews
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors relative py-1 hover:underline underline-offset-8"
              >
                Salon Info
              </a>
            </nav>

            {/* Right Action: WhatsApp Contact Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Contact</span>
              </a>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp quick chat"
                className="p-2 text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-neutral-800 rounded-lg hover:bg-neutral-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-xs z-50 bg-[#FAF8F5] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out md:hidden border-l border-neutral-200 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <span className="font-serif text-lg font-bold text-neutral-900">{config.name}</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="px-4 py-3 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100 hover:text-amber-800 transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="px-4 py-3 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100 hover:text-amber-800 transition-colors"
            >
              Services & Pricing
            </a>
            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, 'booking')}
              className="px-4 py-3 rounded-lg text-base font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-between"
            >
              <span>Book Appointment</span>
              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-sans">New</span>
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleNavClick(e, 'reviews')}
              className="px-4 py-3 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100 hover:text-amber-800 transition-colors"
            >
              Client Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-4 py-3 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100 hover:text-amber-800 transition-colors"
            >
              Salon Hours & Location
            </a>
          </div>
        </div>

        {/* Mobile menu bottom action */}
        <div className="pt-6 border-t border-neutral-200 space-y-3">
          <a
            href={contactWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors text-center"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </a>
          <p className="text-xs text-neutral-500 text-center font-mono">
            +{config.whatsapp}
          </p>
        </div>
      </div>
    </>
  );
}
