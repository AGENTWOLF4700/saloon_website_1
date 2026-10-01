import { useState, useMemo } from 'react';
import { SalonConfig, SalonService } from '../types/salon';
import { buildWhatsAppUrl, formatStructuredBookingMessage } from '../utils/whatsapp';
import { Calendar, Clock, Sparkles, MessageCircle, Check, User, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface BookingSectionProps {
  config: SalonConfig;
}

export function BookingSection({ config }: BookingSectionProps) {
  // Today's date in YYYY-MM-DD format for min date
  const todayObj = new Date();
  const todayStr = todayObj.toISOString().split('T')[0];

  // Helper to format date nicely
  const getFormattedDateString = (dateVal: string) => {
    if (!dateVal) return '';
    try {
      const parts = dateVal.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
      return dateVal;
    } catch {
      return dateVal;
    }
  };

  // Pre-calculate tomorrow and day after for quick chips
  const tomorrowObj = new Date(todayObj);
  tomorrowObj.setDate(todayObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  const dayAfterObj = new Date(todayObj);
  dayAfterObj.setDate(todayObj.getDate() + 2);
  const dayAfterStr = dayAfterObj.toISOString().split('T')[0];

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    config.services[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('02:00 PM');
  const [customerName, setCustomerName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const selectedService: SalonService | undefined = useMemo(() => {
    return config.services.find((s) => s.id === selectedServiceId) || config.services[0];
  }, [config.services, selectedServiceId]);

  // Standard popular salon time slots
  const timeSlots = [
    '10:30 AM',
    '12:00 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
    '07:30 PM',
  ];

  // Generate structured message
  const structuredMessage = useMemo(() => {
    const friendlyDate = getFormattedDateString(selectedDate);
    return formatStructuredBookingMessage({
      salonName: config.name,
      customerName: customerName.trim(),
      serviceName: selectedService ? selectedService.name : 'Salon Consultation',
      servicePrice: selectedService?.price,
      currency: selectedService?.currency || '₹',
      date: friendlyDate,
      timeSlot: selectedTimeSlot,
      notes: notes.trim(),
    });
  }, [config.name, customerName, selectedService, selectedDate, selectedTimeSlot, notes]);

  const bookingWhatsAppUrl = useMemo(() => {
    return buildWhatsAppUrl(config.whatsapp, structuredMessage);
  }, [config.whatsapp, structuredMessage]);

  return (
    <section id="booking" className="py-20 md:py-28 relative overflow-hidden bg-white">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 w-[700px] h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant WhatsApp Reservation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Book an Appointment
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-sans text-balance">
            Select your service, preferred date, and timing. We'll organize your booking request into an instant, pre-filled WhatsApp message ready to send.
          </p>
        </div>

        {/* Booking Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-6">
            {/* Step 1: Select Service */}
            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200/70 text-amber-900 flex items-center justify-center text-[11px] font-bold">1</span>
                  Choose Service
                </span>
                <span className="text-neutral-400 font-normal normal-case">
                  {config.services.length} treatments available
                </span>
              </label>

              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 shadow-2xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-hidden cursor-pointer"
              >
                {config.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} — {service.currency || '₹'}{service.price.toLocaleString()} ({service.duration})
                  </option>
                ))}
              </select>

              {/* Service description pill */}
              {selectedService && (
                <div className="p-3 bg-white rounded-xl border border-neutral-200/80 text-xs text-neutral-600 flex items-center justify-between">
                  <span className="line-clamp-1">{selectedService.description}</span>
                  <span className="font-bold text-neutral-900 shrink-0 ml-3">
                    {selectedService.currency || '₹'}{selectedService.price.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Step 2: Select Date */}
            <div className="space-y-3 pt-2 border-t border-neutral-200/70">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <span className="w-5 h-5 rounded-full bg-amber-200/70 text-amber-900 flex items-center justify-center text-[11px] font-bold">2</span>
                Preferred Date
              </label>

              {/* Quick Date Chips */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDate(todayStr)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all text-center ${
                    selectedDate === todayStr
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate(tomorrowStr)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all text-center ${
                    selectedDate === tomorrowStr
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate(dayAfterStr)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all text-center ${
                    selectedDate === dayAfterStr
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  Day After
                </button>
              </div>

              {/* Date Input */}
              <div className="relative">
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 shadow-2xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-hidden cursor-pointer"
                />
              </div>
            </div>

            {/* Step 3: Select Time Slot */}
            <div className="space-y-3 pt-2 border-t border-neutral-200/70">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <span className="w-5 h-5 rounded-full bg-amber-200/70 text-amber-900 flex items-center justify-center text-[11px] font-bold">3</span>
                Preferred Time Slot
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-700 text-white border-amber-700 shadow-xs font-semibold'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Optional Name & Notes */}
            <div className="space-y-3 pt-2 border-t border-neutral-200/70">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <span className="w-5 h-5 rounded-full bg-amber-200/70 text-amber-900 flex items-center justify-center text-[11px] font-bold">4</span>
                Your Information (Optional)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Priya)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 shadow-2xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Stylist or special request (e.g. Balayage layers)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 shadow-2xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live WhatsApp Message Preview & One-Click Send (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#EFEAE2] rounded-3xl p-5 sm:p-6 border border-neutral-300 shadow-md relative overflow-hidden">
              {/* WhatsApp Mockup Header */}
              <div className="bg-[#128C7E] text-white -m-5 sm:-m-6 p-4 mb-5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-amber-200">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">{config.name}</p>
                    <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-sans">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block animate-pulse" />
                      +{config.whatsapp} · Online
                    </p>
                  </div>
                </div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 bg-white/10 px-2.5 py-1 rounded-full">
                  Live Preview
                </div>
              </div>

              {/* Message Bubble Preview */}
              <div className="bg-white rounded-2xl rounded-tl-xs p-4 shadow-sm space-y-3 font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed border border-neutral-200/60">
                <div className="pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <span className="font-serif font-bold text-amber-900 text-xs uppercase tracking-wide">
                    Ready-to-Send Message
                  </span>
                  <span className="text-[10px] text-neutral-400">Just now</span>
                </div>

                <div className="space-y-1.5 font-sans">
                  <p className="font-bold text-neutral-900">
                    ✨ Appointment Booking Request - {config.name} ✨
                  </p>
                  <p className="text-neutral-300 text-xs">━━━━━━━━━━━━━━━━━━━━</p>
                  {customerName && (
                    <p>
                      <strong className="text-neutral-900 font-semibold">👤 Guest:</strong>{' '}
                      {customerName}
                    </p>
                  )}
                  <p>
                    <strong className="text-neutral-900 font-semibold">💇 Service:</strong>{' '}
                    {selectedService?.name}{' '}
                    {selectedService?.price && (
                      <span className="text-emerald-700 font-semibold">
                        ({selectedService.currency || '₹'}{selectedService.price.toLocaleString()})
                      </span>
                    )}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-semibold">📅 Date:</strong>{' '}
                    {getFormattedDateString(selectedDate)}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-semibold">⏰ Time:</strong>{' '}
                    {selectedTimeSlot}
                  </p>
                  {notes && (
                    <p>
                      <strong className="text-neutral-900 font-semibold">📝 Notes:</strong> {notes}
                    </p>
                  )}
                  <p className="text-neutral-300 text-xs">━━━━━━━━━━━━━━━━━━━━</p>
                  <p className="text-neutral-600 text-xs italic">
                    Please let me know if this slot is available. Thank you!
                  </p>
                </div>
              </div>

              {/* Send Button */}
              <div className="mt-5 space-y-2">
                <a
                  href={bookingWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 text-sm font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-98 rounded-2xl shadow-md hover:shadow-lg transition-all text-center group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Send on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <p className="text-[11px] text-neutral-500 text-center font-sans">
                  Direct message to <span className="font-mono font-medium">+{config.whatsapp}</span> · Instant response
                </p>
              </div>
            </div>

            {/* Booking Guarantees */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Transparent Salon Booking</span>
              </div>
              <ul className="text-xs text-neutral-500 space-y-1 pl-6 list-disc font-sans">
                <li>No online payment required now; pay at the salon counter.</li>
                <li>Free reschedule or cancellation via WhatsApp message.</li>
                <li>Instant confirmation from our salon coordinator.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
