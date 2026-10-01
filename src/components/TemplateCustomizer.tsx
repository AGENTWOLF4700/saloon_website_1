import { useState } from 'react';
import { SalonConfig } from '../types/salon';
import { Sliders, Copy, Check, RefreshCw, X, Sparkles } from 'lucide-react';

interface TemplateCustomizerProps {
  currentConfig: SalonConfig;
  onUpdateConfig: (newConfig: SalonConfig) => void;
  onReset: () => void;
}

export function TemplateCustomizer({
  currentConfig,
  onUpdateConfig,
  onReset,
}: TemplateCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Quick presets for testing customizability
  const applyPreset = (presetName: string) => {
    if (presetName === 'mumbai') {
      onUpdateConfig({
        ...currentConfig,
        name: 'Velvet & Gold Hair Lounge',
        shortName: 'Velvet & Gold',
        tagline: 'Artisanal Hair & Couture Styling',
        description: 'Bespoke hair styling, balayage artistry, and luxury scalp treatments in the heart of Mumbai.',
        whatsapp: '919820012345',
        phone: '+91 98200 12345',
        address: 'Bandra West, Linking Road, Mumbai, Maharashtra 400050',
        city: 'Mumbai, Maharashtra',
        googleMapsUrl: 'https://maps.google.com/?q=Bandra+West+Mumbai',
        googleReviewsUrl: 'https://search.google.com/local/writereview?query=Velvet+and+Gold+Hair+Lounge+Mumbai',
      });
    } else if (presetName === 'bengaluru') {
      onUpdateConfig({
        ...currentConfig,
        name: 'Aura Luxury Spa & Salon',
        shortName: 'Aura Spa',
        tagline: 'Pure Indulgence, Radiant Beauty',
        description: 'Holistic skin therapy, organic hair rituals, and bridal beauty transformations in Indiranagar.',
        whatsapp: '918041234567',
        phone: '+91 80 4123 4567',
        address: '100ft Road, Indiranagar, Bengaluru, Karnataka 560038',
        city: 'Bengaluru, Karnataka',
        googleMapsUrl: 'https://maps.google.com/?q=Indiranagar+Bengaluru',
        googleReviewsUrl: 'https://search.google.com/local/writereview?query=Aura+Luxury+Spa+Salon+Bengaluru',
      });
    } else {
      onReset();
    }
  };

  const copyConfigJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-neutral-900/90 hover:bg-neutral-900 text-white rounded-full shadow-lg hover:shadow-xl backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide transition-all duration-200 group"
          aria-label="Open template customizer"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-45 transition-transform" />
          <span>Customize Template</span>
        </button>
      )}

      {/* Slide-out Customizer Drawer */}
      {isOpen && (
        <div className="w-84 sm:w-96 max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h3 className="font-serif font-bold text-sm tracking-wide">
                Salon Template Customizer
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Fields */}
          <div className="p-4 overflow-y-auto space-y-4 text-xs font-sans">
            <div>
              <p className="text-neutral-500 mb-2">
                Test switching salon presets in real-time or update details below:
              </p>
              {/* Presets */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => applyPreset('default')}
                  className="px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md font-medium text-[11px]"
                >
                  Jaipur (Default)
                </button>
                <button
                  onClick={() => applyPreset('mumbai')}
                  className="px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md font-medium text-[11px]"
                >
                  Mumbai
                </button>
                <button
                  onClick={() => applyPreset('bengaluru')}
                  className="px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md font-medium text-[11px]"
                >
                  Bengaluru
                </button>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-3 pt-2 border-t border-neutral-100">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Salon Full Name
                </label>
                <input
                  type="text"
                  value={currentConfig.name}
                  onChange={(e) =>
                    onUpdateConfig({ ...currentConfig, name: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  WhatsApp Number (Single Config Source)
                </label>
                <input
                  type="text"
                  value={currentConfig.whatsapp}
                  onChange={(e) =>
                    onUpdateConfig({ ...currentConfig, whatsapp: e.target.value })
                  }
                  placeholder="e.g. 919876543210"
                  className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs font-mono focus:ring-1 focus:ring-amber-500 outline-hidden"
                />
                <span className="text-[10px] text-neutral-400">
                  All booking & WhatsApp buttons instantly sync with this number.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={currentConfig.tagline}
                  onChange={(e) =>
                    onUpdateConfig({ ...currentConfig, tagline: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={currentConfig.city}
                  onChange={(e) =>
                    onUpdateConfig({ ...currentConfig, city: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Google Reviews URL
                </label>
                <input
                  type="text"
                  value={currentConfig.googleReviewsUrl}
                  onChange={(e) =>
                    onUpdateConfig({ ...currentConfig, googleReviewsUrl: e.target.value })
                  }
                  placeholder="https://search.google.com/local/writereview?..."
                  className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 outline-hidden"
                />
                <span className="text-[10px] text-neutral-400">
                  Customers who want to leave a review will be redirected here.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={currentConfig.email || ''}
                  onChange={(e) =>
                    onUpdateConfig({ ...currentConfig, email: e.target.value })
                  }
                  placeholder="contact@glowandstylesalon.com"
                  className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={currentConfig.openingHours}
                  onChange={(e) =>
                    onUpdateConfig({ ...currentConfig, openingHours: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={copyConfigJson}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-xs font-semibold shadow-2xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied JSON!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy salonConfig JSON</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
