import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail } from 'lucide-react';
import { motion } from "framer-motion";
import customer from "../assets/customer.png";
import background from "../assets/laserbg.webp";
import laserimg from "../assets/lasercannen.png";
import tooth from "../assets/tooths.png";
import BookAppointmentModal from "./BookAppointmentModal";

const LaserRootCanal = () => {
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      console.log('Subscribed:', email);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen mt-15">
      {/* Hero Section */}
      <section className="relative px-4 pt-10 md:pt-20">
        <div className="mx-auto max-w-7xl relative">

          {/* Background Image */}
          <div
            className="absolute inset-0 rounded-[50px] md:rounded-[70px] bg-cover bg-center"
            style={{ backgroundImage: `url("${background}")` }}
          />

          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 rounded-[50px] md:rounded-[70px] bg-gradient-to-r from-blue-700/20 to-blue-400/20" />

          {/* Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-6 md:px-16 py-12 md:py-20">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Laser Root Canal <br /> Treatment
              </h1>

              {/* underline */}
              <div className="w-20 h-1 bg-white my-6 rounded-full" />

              <p className="text-white/90 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                It treats infections or damage in the tooth’s pulp. The pulp is the
                tooth’s innermost part containing nerves, blood vessels and connective
                tissue. Infected tissue is removed from the pulp chamber and root canals.
              </p>

              <button onClick={() => setShowForm(true)} className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-10 py-4 rounded-full transition">
                Book Now
              </button>
            </motion.div>


            {/* Image Circle */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={customer}
              alt="Patient"
              className="
    relative md:absolute
    mx-auto md:mx-0
    bottom-0 md:bottom-10
    right-0 md:right-16
    w-[80vw] sm:w-[60vw] md:w-[25vw]
    h-auto md:h-[70vh]
    object-cover
    rounded-3xl
  "
            />

          </div>
        </div>
      </section>


      {/* Why Choose Laser Treatment Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >

            <img
              src={laserimg}
              alt="Pain"
              className="w-full h-full md:w-72 md:h-100 object-cover"
            />
          </motion.div>


          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Laser Treatment?</h2>
            <ul className="space-y-3 text-lg">
              <li>1. Minimal pain and discomfort</li>
              <li>2. Faster healing</li>
              <li>3. Reduced infection risk</li>
              <li>4. High precision</li>
            </ul>


            <div className="mt-8 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">How it’s done?</h3>
              <p className="text-sm md:text-base">
                During the procedure, the dentist or endodontist numbs the tooth and the area around it. They do this with local anesthesia. This ensures the patient's comfort.  They use special instruments. They remove the infected or damaged tissue, clean the canals well, and shape them to hold the filling.              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Aftercare and Treatment Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Aftercare and Treatment</h2>
            <p className="text-gray-700 leading-relaxed">
              The main goal of root canal treatment is to save a tooth. Otherwise, severe decay,
              infection, or trauma would need the removal of the tooth. PeAfter a root canal, patients
              may feel mild discomfort or sensitivity. They can usually manage it with over-the-counter
              pain medication. It's essential to follow any post-operative instructions provided by the
              dentist and attend follow-up appointments for evaluation and restoration of the tooth.ople
              often need a root canal for deep cavities or cracked teeth. It can also happen after repeated
              dental work on the same tooth or tooth trauma.
            </p>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img
              src={tooth}
              alt="Pain"
              className="w-full h-full md:w-100 md:h-100 object-cover"
            />

          </motion.div>
        </div>
      </section>
      {showForm && (
        <BookAppointmentModal onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default LaserRootCanal;
