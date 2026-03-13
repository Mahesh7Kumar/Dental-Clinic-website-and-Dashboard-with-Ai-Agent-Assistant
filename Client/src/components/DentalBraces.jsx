import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import background from "../assets/bracebg.webp"; // add bg image
import braceimage from "../assets/Braceimage.webp";
import metaltooth from "../assets/fiberbrace.webp";
import fibertooth from "../assets/metaltooth.webp";
import thumpup from "../assets/thumpuptooth.webp";
import BookAppointmentModal from "./BookAppointmentModal";

const DentalBraces = () => {
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      console.log('Subscribed:', email);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-4 py-12 md:py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="relative rounded-[50px] md:rounded-[70px] overflow-hidden shadow-2xl">

            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${background}")` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-cyan-600/50" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 md:p-16">

              {/* LEFT CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex-1"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Dental Implants
                </h1>

                <div className="w-40 h-1 bg-white mb-6" />

                <p className="text-white/95 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                  Dental implants are artificial tooth roots placed into the jawbone to support replacement teeth that look and function like natural teeth.
                </p>

                <button onClick={() => setShowForm(true)} className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold px-10 py-5 rounded-full text-lg shadow-lg transition">
                  Book Now
                </button>
              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 relative"
              >
                <div className="relative max-w-md mx-auto">
                  {/* soft glow */}
                  <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
                  <img
                    src={braceimage}
                    alt="Dental Implant"
                    className="relative w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>


      {/* IMPLANT TYPES SECTION */}
      <section className="px-4 py-12 md:py-20">
        <div className="container mx-auto max-w-7xl">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
            Implant Types for You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Single Tooth Implant */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <img
                src={metaltooth}
                alt="Metal braces"
                className="w-full max-w-sm object-contain drop-shadow-2xl"
              />
              <h3 className="text-2xl md:text-3xl font-semibold mt-8">
                Metal braces
              </h3>
            </motion.div>

            {/* Full Jaw Implant */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <img
                src={fibertooth}
                alt="Ceramic braces"
                className="w-full max-w-sm object-contain drop-shadow-2xl"
              />
              <h3 className="text-2xl md:text-3xl font-semibold mt-3">
                Ceramic braces
              </h3>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Benefits and Aftercare Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Benefits and Aftercare
          </h2>

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            {/* Left Content - Text */}
            <div className="flex-1">
              <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                <span className="font-semibold">Proper care and regular orthodontic visits are essential.</span> Despite the commitment required, the results are a healthier, more attractive smile. While braces are on, they'll require consistent commitment and proper care. <span className="font-semibold">Maintaining oral hygiene can be tough.</span> But, it is crucial to prevent cavities and decay. Special brushes and flossing tools are available to help clean around braces. You also need dietary restrictions. You must avoid sticky, hard, or chewy foods. They can damage braces. Cutting food into smaller pieces and avoiding biting into hard items can help. Discomfort is common, especially after adjustments. But, pain relievers and wax can ease it.
              </p>
            </div>

            {/* Right Image - Dental Model with Braces */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative">
                  <img
                    src={thumpup}
                    alt="Dental model with braces"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showForm && (
        <BookAppointmentModal onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default DentalBraces;
