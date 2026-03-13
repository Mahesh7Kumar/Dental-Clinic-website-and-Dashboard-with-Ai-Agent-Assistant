import Doctoranime from '../assets/Doctoranime.png'
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import BookAppointmentModal from './BookAppointmentModal';

export default function Footer() {
  const [email, setEmail] = useState('');
    const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full bg-gray-50">

      {/* Subscribe Section */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-10 sm:py-14">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Left Content */}
            <div className="text-white space-y-5 w-full md:w-3/5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Subscribe</h2>
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Sent email to this mail Id for the Collaboration and Other Information
              </p>

              {/* Email Input */}
              <div className="flex items-center backdrop-blur-md bg-white/30 border-2 border-white rounded-full px-3 py-2 shadow-lg w-full">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-100 mr-2 sm:mr-3 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 outline-none text-gray-100 bg-transparent placeholder:text-gray-100 text-sm sm:text-base min-w-0"
                />
                <button className="ml-2 sm:ml-4 bg-gray-100 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all cursor-pointer whitespace-nowrap flex-shrink-0">
                  Subscribe
                </button>
              </div>

              <p className="text-sm sm:text-base text-white pt-1">
                You will be Unsubscribe at any time. Read our Privacy Policy Here.
              </p>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-2/5 flex justify-center md:justify-end">
              <div className="w-40 h-52 sm:w-52 sm:h-64 md:w-60 md:h-72 lg:w-72 lg:h-80">
                <img
                  src={Doctoranime}
                  alt="Doctor Character"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-sm mx-4 sm:mx-6 lg:mx-12 xl:mx-24 mb-4 rounded-xl">
        <div className="px-6 sm:px-10 lg:px-16 py-10 sm:py-12">

          {/* Three Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

            {/* Call to Action */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-black">Call to Action</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Ready for Clear, Healthy Skin?<br />
                Book your dermatology appointment today!
              </p>
              <button onClick={() => setShowForm(true)} className="bg-cyan-400 text-white px-8 sm:px-10 py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-cyan-500 transition-all mt-2">
                Book
              </button>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-black">Links</h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Service', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-700 text-sm sm:text-base hover:text-blue-500 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold text-black">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">+91 457638574</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base break-all">Support@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 sm:gap-6">

              {/* Social Icons */}
              <div className="flex gap-2 sm:gap-3">
                <button className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all">
                  <span className="font-bold text-blue-600 text-base sm:text-lg">G</span>
                </button>
                <button className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </button>
                <button className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-100 transition-all">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                </button>
                <button className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </button>
              </div>

              {/* Privacy Links */}
              <div className="flex gap-5 sm:gap-8 text-xs sm:text-sm">
                <a href="#" className="text-gray-700 hover:text-blue-500 transition font-medium">Privacy Policy</a>
                <a href="#" className="text-gray-700 hover:text-blue-500 transition font-medium">Terms of Use</a>
              </div>

              {/* Copyright */}
              <div className="text-xs sm:text-sm text-gray-700 font-medium text-center sm:text-right">
                @Copyright by Lucifer, All rights Reserved
              </div>
            </div>
          </div>

        </div>
      </footer>
       {showForm && (
        <BookAppointmentModal onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}