import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Send, MapPin, Mail, Phone, Clock, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'bespoke',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      showToast('Concierge Dispatched', 'Thank you. Our atelier client director will reply within 4 business hours.', 'success');
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: 'bespoke', message: '' });
      }, 4000);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-16 bg-[#EFE6D9] border-t border-[#DFD4C5] text-[#2A2438] font-lato select-none">
      <div className="max-w-[1060px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-normal font-serif text-[#2A2438] tracking-tight">
            Connect with the Atelier
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5D5470] leading-relaxed">
            Inquire about bespoke sizing, natural fiber provenance, or schedule a personal showroom consultation.
          </p>
        </div>

        {/* 2-Column Layout: Direct Details on left, Clean Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E8DED1] shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A2438] font-mono mb-4">
                Flagship Salons & Relays
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D8CEBF] flex items-center justify-center text-[#9B8EC7] flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#2A2438] block text-[13px]">Atelier Flagship Studio</span>
                    <span className="text-[#5D5470] font-mono leading-relaxed block mt-0.5">
                      450 Park Avenue, Fl 18<br />
                      New York, NY 10022
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D8CEBF] flex items-center justify-center text-[#9B8EC7] flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#2A2438] block text-[13px]">Direct Client Correspondence</span>
                    <span className="text-[#625096] font-mono block mt-0.5">concierge@asimovatelier.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D8CEBF] flex items-center justify-center text-[#9B8EC7] flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#2A2438] block text-[13px]">Bespoke Telephone Relay</span>
                    <span className="text-[#5D5470] font-mono block mt-0.5">+1 (800) 420-ASIMOV</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D8CEBF] flex items-center justify-center text-[#9B8EC7] flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#2A2438] block text-[13px]">Consultation Hours</span>
                    <span className="text-[#5D5470] font-mono block mt-0.5">Mon – Sat: 10:00 – 19:00 EST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E8DED1] flex items-center gap-2 text-[11px] font-mono text-[#5D5470]">
              <div className="w-2 h-2 rounded-full bg-[#55ced4] animate-pulse"></div>
              <span>DIRECT ATELIER SUPPORT AVAILABLE</span>
            </div>
          </div>

          {/* Right Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E8DED1] shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A2438] font-mono mb-4">
              Send Concierge Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#5D5470] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full bg-[#FAF6F0] border border-[#D8CEBF] rounded-lg px-3.5 py-2.5 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7] font-lato shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#5D5470] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@domain.com"
                    className="w-full bg-[#FAF6F0] border border-[#D8CEBF] rounded-lg px-3.5 py-2.5 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7] font-lato shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#5D5470] mb-1">Inquiry Purpose</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#FAF6F0] border border-[#D8CEBF] rounded-lg px-3.5 py-2.5 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7] font-mono shadow-2xs"
                >
                  <option value="bespoke">Bespoke Sizing & Tailoring Advice</option>
                  <option value="appointment">Private Showroom Appointment</option>
                  <option value="provenance">Fiber Sourcing & Provenance Question</option>
                  <option value="order">Order Dispatch & Return Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#5D5470] mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the pieces you are considering or your fitting requirements..."
                  className="w-full bg-[#FAF6F0] border border-[#D8CEBF] rounded-lg p-3.5 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7] font-lato shadow-2xs resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#5D5470]">
                  Confidential & encrypted communication.
                </span>

                <button
                  type="submit"
                  disabled={submitted}
                  className="px-6 py-2.5 rounded-xl bg-[#4A3B69] hover:bg-[#382C52] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {submitted ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Transmitted</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

