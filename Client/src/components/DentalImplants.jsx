import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import background from "../assets/implatbg.webp"; // add bg image
import implantImg from "../assets/tooth3d.png";
import jawImg from "../assets/toothking.png";
import question from "../assets/Implantquestion.png";
import BookAppointmentModal from "./BookAppointmentModal";

const DentalImplants = () => {
   const [showForm, setShowForm] = useState(false);
  return (
    <div className="min-h-screen mt-20">

      {/* HERO SECTION */}
      <section className="relative px-4 pt-10 md:pt-20">
        <div className="mx-auto max-w-7xl relative">

          {/* Background */}
          <div
            className="absolute inset-0 rounded-[50px] md:rounded-[70px] bg-cover bg-center"
            style={{ backgroundImage: `url("${background}")` }}
          />
          <div className="absolute inset-0 rounded-[50px] md:rounded-[70px] bg-gradient-to-r from-blue-800/30 to-blue-500/30" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 md:px-16 py-12 md:py-20 items-center">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Dental Implants
              </h1>

              <div className="w-20 h-1 bg-white my-6 rounded-full" />

              <p className="text-white/90 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                Dental Implants are artificial tooth roots that go into your jawbone surgically. 
                They are super cool because they make relief teeth, that look great in appearance and functionality.
              </p>

              <button onClick={() => setShowForm(true)} className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-10 py-4 rounded-full transition">
                Book Now
              </button>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={implantImg}
              alt="Dental Implant"
              className="
                relative md:absolute
                mx-auto md:mx-0
                bottom-0 md:bottom-2
                right-0 md:right-16
                w-[80vw] sm:w-[60vw] md:w-[29vw]
                h-auto md:h-[67vh]
                object-contain
                rounded-3xl
              "
            />
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img src={jawImg} alt="Jaw Implant" className="w-full md:w-80" />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Benefits of Dental Implants
            </h2>

            <ul className="space-y-3 text-lg">
              <li>1. Long-lasting and durable</li>
              <li>2. Natural look and feel</li>
              <li>3. Preserves jawbone</li>
              <li>4. Boosts confidence</li>
            </ul>

            <div className="mt-8 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">How it works?</h3>
              <p className="text-sm md:text-base">
                First your dentist will check out your mouth to see if you're a good seeker for implants. 
                Then, during surgery, they place the implant right into your jawbone. Through a process 
                called osseointegration, the implant bonds with the bone.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* FAQ SECTION */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Some common questions <br /> about dental implants
            </h2>

            <Accordion type="single" collapsible className="space-y-4">

              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition text-left">
                  <span className="flex items-center gap-3 font-semibold">
                    <ChevronDown className="text-blue-600" />
                    What will be the cost of single implant?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  The cost of a single dental implant typically ranges from $1,500 to $6,000,
                  depending on location, materials used, and complexity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition text-left">
                  <span className="flex items-center gap-3 font-semibold">
                    <ChevronDown className="text-blue-600" />
                    Is dental implant procedure painful?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  The procedure is usually performed under local anesthesia, so pain is minimal.
                  Mild discomfort after surgery is normal and manageable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition text-left">
                  <span className="flex items-center gap-3 font-semibold">
                    <ChevronDown className="text-blue-600" />
                    How long do dental implants last?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  With proper care and oral hygiene, dental implants can last 15–25 years
                  or even a lifetime.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img
              src={question}
              alt="Dental FAQ"
              className="w-full md:w-96"
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

export default DentalImplants;
