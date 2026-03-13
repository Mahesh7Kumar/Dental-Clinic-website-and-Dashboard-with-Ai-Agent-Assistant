import React, { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Stethoscope, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import client1 from '../../assets/Ellipse1.png';
import client2 from '../../assets/Ellipse2.png';
import client3 from '../../assets/Ellipse3.png';
import client4 from '../../assets/Ellipse4.png';
import client5 from '../../assets/Ellipse5.png';

export default function Services() {
  const [planType, setPlanType] = useState('monthly');
  const [currentTestimonial, setCurrentTestimonial] = useState(2);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The personalized treatment plan made all the difference. My skin has never looked better, and I feel so confident now!",
      image: client1,
    },
    {
      name: "Raj Patel",
      text: "Professional service and excellent results. The dermatologist took time to understand my concerns and provided effective solutions.",
      image: client2,
    },
    {
      name: "Anita Verma",
      text: "Dr. Mahi was incredibly patient and understanding. The diagnosis was accurate, and the treatment worked perfectly. I feel healthier and more confident now!",
      image: client3,
    },
    {
      name: "Emily Chen",
      text: "Advanced treatments with modern equipment. I'm impressed by the level of care and attention to detail.",
      image: client4,
    },
    {
      name: "Michael Brown",
      text: "Exceptional experience from start to finish. The certified dermatologists really know their craft!",
      image: client5,
    },
  ];

  const nextTestimonial = () => setCurrentTestimonial((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);

  const getReorderedTestimonials = () => {
    const centerIndex = 2;
    const list = [...testimonials];
    const selected = list.splice(currentTestimonial, 1)[0];
    list.splice(centerIndex, 0, selected);
    return list;
  };

  const plans = [
    {
      label: "Basic Package",
      desc: "Basic healthcare support services",
      monthly: "499",
      yearly: "4,999",
      features: [
        "1 Monthly Consultation",
        "Basic Health Checkup",
        "Prescription Renewal",
        "Diet & Lifestyle Advice",
        "Follow-up via Chat",
        "Appointment Reminders",
      ],
      highlight: false,
    },
    {
      label: "Standard Package",
      desc: "Regular and advanced healthcare services",
      monthly: "999",
      yearly: "9,999",
      features: [
        "2 Monthly Consultations",
        "Full Basic Health Screening",
        "Chronic Condition Monitoring",
        "Personalized Treatment Plan",
        "Unlimited Chat Support",
      ],
      highlight: true,
      badge: "Best Offer",
    },
    {
      label: "Premium Package",
      desc: "Complete yearly medical care services",
      monthly: "1,499",
      yearly: "14,999",
      features: [
        "Unlimited Doctor Consultations",
        "Annual Full Body Checkup",
        "Emergency Priority Booking",
        "24/7 Premium Support",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="w-full min-h-screen text-black font-sans">

      {/* ── WHY CHOOSE US ── */}
      <section className="text-center py-10 sm:py-14 md:py-16 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Why Choose Us?
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Choosing the right dermatologist matters, and we make it easy for you.
          Our platform connects you with experienced and certified skin specialists
          who provide safe, personalized, and effective treatments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-10 sm:mt-12 max-w-4xl mx-auto">

          <Card className="backdrop-blur-lg bg-white/40 border-2 border-[#BEE3FF] rounded-2xl p-5 shadow-md">
            <CardContent className="flex flex-col items-center text-center p-0">
              <div className="bg-white shadow-md rounded-full p-4 mb-4 sm:mb-5">
                <BadgeCheck className="w-10 h-10 sm:w-14 sm:h-14 text-[#1DA1F2]" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl">Certified Dermatologists</h3>
              <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
                Consult trusted and experienced skin specialists.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-red-200/40 border-2 border-[#FFBDBD] rounded-2xl p-5 sm:p-8 shadow-md">
            <CardContent className="flex flex-col items-center text-center p-0">
              <div className="bg-white shadow-md rounded-full p-4 mb-4 sm:mb-5">
                <Stethoscope className="w-10 h-10 sm:w-14 sm:h-14 text-[#FF6B6B]" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl">Advanced Treatments</h3>
              <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
                Modern equipment and safe dermatology procedures.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-blue-200/40 border-2 border-[#C7BCFF] rounded-2xl p-5 sm:p-8 shadow-md sm:col-span-2 md:col-span-1">
            <CardContent className="flex flex-col items-center text-center p-0">
              <div className="bg-white shadow-md rounded-full p-4 mb-4 sm:mb-5">
                <HeartHandshake className="w-10 h-10 sm:w-14 sm:h-14 text-[#7A5AF5]" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl">Personalized Care</h3>
              <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
                Treatment plans tailored for your skin type and needs.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#E6F5FF] rounded-xl text-center relative px-10 sm:px-14">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">What our Client Say?</h2>
        <p className="text-gray-600 mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base">
          "Here's what our patients say about their experience with our care."
        </p>

        {/* Avatar Row */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-6 overflow-x-auto py-2">
          {getReorderedTestimonials().map((testimonial, index) => {
            const isActive = testimonials.indexOf(testimonial) === currentTestimonial;
            return (
              <img
                key={index}
                src={testimonial.image}
                alt={testimonial.name}
                onClick={() => setCurrentTestimonial(testimonials.indexOf(testimonial))}
                className={`
                  rounded-full cursor-pointer flex-shrink-0
                  transition-all duration-500 ease-in-out
                  ${isActive
                    ? "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 ring-4 ring-[#5A33FF] scale-110"
                    : "w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 opacity-60 hover:scale-105"
                  }
                `}
              />
            );
          })}
        </div>

        {/* Name + Quote */}
        <h3 className="text-lg sm:text-xl font-bold text-[#5A33FF]">
          {testimonials[currentTestimonial].name}
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
          {testimonials[currentTestimonial].text}
        </p>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#5A33FF] hover:bg-[#4829CC] rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        </button>
        <button
          onClick={nextTestimonial}
          aria-label="Next testimonial"
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#5A33FF] hover:bg-[#4829CC] rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              className={`rounded-full transition-all duration-300 ${i === currentTestimonial
                ? "w-6 h-2.5 bg-[#5A33FF]"
                : "w-2.5 h-2.5 bg-[#5A33FF]/30 hover:bg-[#5A33FF]/60"
                }`}
            />
          ))}
        </div>
      </section>

      {/* ── PLANS SECTION ── */}
      <section className="py-12 sm:py-16 md:py-20 text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Get amazing Service in <br className="hidden sm:block" /> simple steps
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base">
          We provide detailed medical consultations to understand your symptoms,
          discuss your health concerns, and guide you toward the right treatment.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mt-6 sm:mt-8 mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex rounded-full bg-[#5A33FF] p-1">
            {['monthly', 'yearly'].map((type) => (
              <button
                key={type}
                onClick={() => setPlanType(type)}
                className={`px-6 sm:px-8 py-2 rounded-full font-semibold text-sm sm:text-base capitalize transition-all duration-300 ${planType === type
                  ? 'bg-white text-[#5A33FF] shadow-md'
                  : 'text-white hover:text-white/80'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.label}
              className={`p-5 sm:p-6 rounded-2xl shadow-md transition-all
                ${plan.highlight
                  ? "bg-[#5A33FF] border-2 border-[#5A33FF] lg:scale-105 hover:shadow-2xl"
                  : "bg-white hover:shadow-xl"
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-base sm:text-lg font-semibold ${plan.highlight ? 'text-white' : ''}`}>
                  ₹{planType === 'monthly' ? plan.monthly : plan.yearly}/{planType === 'monthly' ? 'month' : 'year'}
                </h3>
                {plan.badge && (
                  <span className="text-xs bg-white text-[#5A33FF] px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
              </div>

              <h2 className={`text-lg sm:text-xl font-bold ${plan.highlight ? 'text-white' : ''}`}>
                {plan.label}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${plan.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                {plan.desc}
              </p>

              <ul className={`text-left mt-4 space-y-2 text-sm sm:text-base ${plan.highlight ? 'text-white' : 'text-gray-600'}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className={plan.highlight ? 'text-white' : 'text-[#5A33FF]'}>•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-6 w-full rounded-full font-semibold text-sm sm:text-base ${plan.highlight
                  ? 'bg-white hover:bg-gray-100 text-[#5A33FF]'
                  : 'bg-[#5A33FF] hover:bg-[#4829CC] text-white'
                  }`}
              >
                Choose Your Plan
              </Button>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}