import { useState } from 'react';
import { SalonConfig } from '../types/salon';
import { buildWhatsAppUrl, WhatsAppMessages } from '../utils/whatsapp';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  config: SalonConfig;
}

export function FloatingWhatsApp({ config }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Quick pre-filled prompt options
  const defaultUrl = buildWhatsAppUrl(
    config.whatsapp,
    WhatsAppMessages.generalBooking(config.name)
  );

  const slotCheckUrl = buildWhatsAppUrl(
    config.whatsapp,
    WhatsAppMessages.quickSlotCheck(config.name)
  );

  const customPromptUrl = (msg: string) => buildWhatsAppUrl(config.whatsapp, msg);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Interactive Mini-Chat Dialog (Toggleable) */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-white">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#128C7E] rounded-full" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">{config.name}</p>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-sans">
                  <span>Online</span> · Typically replies in seconds
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body Bubble */}
          <div className="p-4 bg-[#EFEAE2] space-y-3">
            <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-2xs max-w-[85%] text-xs text-neutral-800 leading-relaxed font-sans">
              <p className="font-semibold text-neutral-900 mb-1">
                Hello! Welcome to {config.name} 👋
              </p>
              <p>
                How can we pamper you today? Tap an option below to start an appointment chat with our reception team.
              </p>
              <span className="text-[10px] text-neutral-400 text-right block mt-1">Just now</span>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5 pt-1">
              <a
                href={defaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 text-neutral-800 hover:text-emerald-900 rounded-xl text-xs font-medium border border-neutral-200 transition-colors"
              >
                <span>📅 Book an Appointment</span>
                <Send className="w-3.5 h-3.5 text-emerald-600" />
              </a>

              <a
                href={slotCheckUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 text-neutral-800 hover:text-emerald-900 rounded-xl text-xs font-medium border border-neutral-200 transition-colors"
              >
                <span>⚡ Available Slots Today</span>
                <Send className="w-3.5 h-3.5 text-emerald-600" />
              </a>

              <a
                href={customPromptUrl(`Hi ${config.name}, what is the price for hair coloring and bridal treatments?`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 text-neutral-800 hover:text-emerald-900 rounded-xl text-xs font-medium border border-neutral-200 transition-colors"
              >
                <span>💬 Ask a Question</span>
                <Send className="w-3.5 h-3.5 text-emerald-600" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="relative group flex items-center">
        {/* Subtle tooltip on desktop hover */}
        {!isOpen && (
          <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat on WhatsApp
          </span>
        )}

        {/* The Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp conversation"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-emerald-400"
        >
          {/* Subtle radar pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

          {isOpen ? (
            <X className="w-6 h-6 z-10" />
          ) : (
            <MessageCircle className="w-7 h-7 z-10 fill-white" />
          )}
        </button>
      </div>
    </div>
  );
}
