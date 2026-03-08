import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CircleX } from 'lucide-react';
import DoctorImage from '../../assets/image.png'
import Heart from '../../assets/heart.png'
import tablet from '../../assets/tablet.png'
import Metical from '../../assets/metical.png'
import hospital from '../../assets/hospital.png'
import stethoscope from '../../assets/stethoscope.png'
import text from '../../assets/text.png'
import equipment1 from '../../assets/equipment1.png'
import equipment2 from '../../assets/equipment2.png'
import equipment3 from '../../assets/equipment3.png'
import File from '../../assets/file.png'
import { Button } from "../../components/ui/button";
import api from "../../utils/api.js";
import { Spinner } from "../../components/ui/spinner.tsx";
import BookAppointmentModal from '../../components/BookAppointmentModal'; // 👈 updated import

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false); // 👈 single state for modal

  useEffect(() => {
    api.get("/api/v1/doctor").then((res) => {
      const data = res.data;
      setDoctors(Array.isArray(data) ? data : [data]);
    });
  }, []);

  const mainDoctor = doctors.length > 0 ? doctors[0] : null;

  const iconData = [
    { icon: '🎤', label: 'Voice' },
    { icon: '❤️', label: 'Heart' },
    { icon: '👥', label: 'Team' },
    { icon: '🌿', label: 'Nature' },
    { icon: '♻️', label: 'Recycle' },
    { icon: '🏃', label: 'Run' },
    { icon: '🤸', label: 'Exercise' },
    { icon: '🧘', label: 'Yoga' },
    { icon: '💪', label: 'Strength' },
    { icon: '🩺', label: 'Medical' },
  ];

  const steps = [
    {
      title: 'Q: How do I book an appointment?',
      description: 'A: Select your doctor, pick a time slot, and confirm your booking—instantly.',
    },
    {
      title: 'Q: Do you offer online consultations?',
      description: 'A: Yes, video consultations are available for most dermatology services.',
    },
    {
      title: 'Q: Can I cancel or reschedule?',
      description: 'A: Yes, you can easily reschedule from your dashboard.',
    },
    {
      title: 'Q: Can I visit or consult online?',
      description: 'A: Attend your appointment in person or via video call.',
    },
  ];

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="min-h-screen">

      {/* ── Hero Section ── */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="p-4 sm:p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                Healthy Skin Starts with the Right Care
              </h1>

              <p className="text-gray-600 text-sm sm:text-base">
                Book appointments with certified dermatologists anytime, anywhere. Fast. Simple. Hassle-free.
              </p>

              {/* 👇 "Medical Plans" now opens BookAppointmentModal */}
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition"
              >
                Medical Plans
              </button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="text-center bg-blue-200 pt-5 pb-3 rounded-2xl shadow-md">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">20+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Years Experiences</div>
                </div>
                <div className="text-center bg-blue-200 pt-5 pb-3 rounded-2xl shadow-md">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">2K+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Treatments</div>
                </div>
                <div className="text-center bg-blue-200 p-3 rounded-2xl shadow-md">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-800">4.5</span>
                  </div>
                  <div className="flex justify-center gap-0.5 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <span key={i} className="text-yellow-500 text-lg sm:text-2xl">★</span>
                    ))}
                    <span className="text-yellow-500 text-lg sm:text-2xl">☆</span>
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Doctor Image */}
            <div className="relative flex justify-center mt-8 md:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[3/4]">
                <img src={DoctorImage} alt="Doctor" className="absolute inset-0 w-full h-full object-contain z-10" />
                <div className="absolute top-4 right-0 border-4 border-blue-400 bg-blue-200 p-1 rounded-full shadow-lg z-20">
                  <img src={hospital} alt="Hospital" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover" />
                </div>
                <div className="absolute top-2 left-0 border-4 border-blue-400 bg-blue-200 p-1 rounded-full shadow-lg z-20">
                  <img src={Metical} alt="Medical" className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 object-cover" />
                </div>
                <div className="absolute bottom-6 left-0 border-4 border-blue-400 bg-gradient-to-bl from-red-300 to-blue-200 p-1 rounded-full shadow-lg z-20">
                  <img src={tablet} alt="Tablet" className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 object-cover" />
                </div>
                <div className="absolute bottom-4 right-0 border-4 border-blue-400 bg-blue-100 p-1 rounded-full shadow-lg z-20">
                  <img src={stethoscope} alt="Stethoscope" className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 object-cover" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 border-4 border-blue-400 bg-blue-100 p-1 rounded-full shadow-lg z-20">
                  <img src={Heart} alt="Heart" className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Infinite Scrolling Icon Carousel ── */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="bg-blue-100 rounded-full py-4 sm:py-6 overflow-hidden relative">
          <div className="flex animate-scroll">
            {[...iconData, ...iconData, ...iconData].map((item, index) => (
              <div key={index} className="flex-shrink-0 mx-3 sm:mx-4 flex flex-col items-center">
                <div className="w-20 sm:w-24 md:w-28 h-12 sm:h-14 md:h-16 bg-white rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-md hover:shadow-lg transition-shadow">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modern Medical System Section ── */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Left - Medical Equipment Images */}
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <div className="flex items-center justify-center w-full">
              <img src={equipment1} alt="Medical Equipment 1" className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] object-contain" />
            </div>
            <div className="flex items-center justify-center w-full">
              <img src={equipment2} alt="Medical Equipment 2" className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] object-contain" />
            </div>
            <div className="col-span-2 flex items-center justify-center mt-2">
              <img src={equipment3} alt="Medical Equipment 3" className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] object-contain" />
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800">
              We having modern medical System
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              At SkinCarePlus, we make expert dermatology care easily accessible. Our online appointment system connects you with experienced skin specialists who provide personalized treatment for all your skin, hair, and cosmetic concerns.
            </p>

            {/* 👇 "Book Now" now opens BookAppointmentModal */}
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition"
            >
              Book Now
            </Button>

            <div className="flex justify-end">
              <img src={File} alt="Clipboard" className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 👇 Single BookAppointmentModal — replaces the old inline modal */}
      {showForm && (
        <BookAppointmentModal onClose={() => setShowForm(false)} />
      )}

      {/* ── FAQ Section ── */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 md:mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-4 sm:p-6 shadow-md transition-all ${currentStep === index ? 'ring-4 ring-blue-400' : ''}`}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={prevStep} className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button onClick={nextStep} className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}