/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { defaultSalonConfig } from './config/salonConfig';
import { SalonConfig } from './types/salon';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BookingSection } from './components/BookingSection';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TemplateCustomizer } from './components/TemplateCustomizer';

export default function App() {
  const [salonConfig, setSalonConfig] = useState<SalonConfig>(defaultSalonConfig);

  const handleResetConfig = () => {
    setSalonConfig(defaultSalonConfig);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-800 font-sans selection:bg-amber-200 selection:text-neutral-900 flex flex-col justify-between">
      {/* Dynamic Slide-Hide Smart Navbar */}
      <Navbar config={salonConfig} />

      {/* Main Single-Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero config={salonConfig} />

        {/* 2. Services Section */}
        <Services config={salonConfig} />

        {/* 3. Interactive Date & Time Appointment Booking Section */}
        <BookingSection config={salonConfig} />

        {/* 4. Customer Reviews Section */}
        <Reviews config={salonConfig} />

        {/* 5. Contact & Location Section */}
        <Contact config={salonConfig} />
      </main>

      {/* 6. Footer */}
      <Footer config={salonConfig} />

      {/* Floating Bottom-Right WhatsApp CTA */}
      <FloatingWhatsApp config={salonConfig} />

      {/* Reusable Template Customizer / Preset Preview Drawer */}
      <TemplateCustomizer
        currentConfig={salonConfig}
        onUpdateConfig={setSalonConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
