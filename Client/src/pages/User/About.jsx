import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import before1 from '../../assets/before1.webp';
import after1 from '../../assets/after1.webp';
import before2 from '../../assets/before2.webp';
import after2 from '../../assets/after2.webp';
import before3 from '../../assets/before3.webp';
import after3 from '../../assets/after3.webp';
import before4 from '../../assets/before4.webp';
import after4 from '../../assets/after4.webp';
import bg from '../../assets/bg.webp';
import BookAppointmentModal from '../../components/BookAppointmentModal';


export default function About() {
  const [showForm, setShowForm] = useState(false);

  const BeforeAfterSlider = ({ beforeImage, afterImage, title }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    };

    const handleMouseDown = () => setIsDragging(true);

    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
      const handleGlobalMouseUp = () => setIsDragging(false);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    return (
      <Card className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
        <div
          ref={containerRef}
          className="relative aspect-[4/3] cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        >
          {/* After Image (Right) */}
          <div className="absolute inset-0">
            <img
              src={afterImage}
              alt="After treatment"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </div>

          {/* Before Image (Left) - Clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={beforeImage}
              alt="Before treatment"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Slider Handle */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <ChevronLeft className="w-4 h-4 absolute left-1" />
              <ChevronRight className="w-4 h-4 absolute right-1" />
            </div>
          </div>

          {/* Title Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-white text-gray-800 font-semibold px-4 py-2 text-sm shadow-md">
              {title}
            </Badge>
          </div>
        </div>
      </Card>
    );
  };
  const treatments = [
    {
      id: 1,
      title: "Tooth Implant",
      beforeImage: before1,
      afterImage: after1,
    },
    {
      id: 2,
      title: "Teeth Whitening",
      beforeImage: before2,
      afterImage: after2,
    },
    {
      id: 3,
      title: "Braces Treatment",
      beforeImage: before3,
      afterImage: after3,
    },
    {
      id: 4,
      title: "Smile Makeover",
      beforeImage: before4,
      afterImage: after4,
    },
    {
      id: 5,
      title: "Veneers Application",
      beforeImage: before1,
      afterImage: after1,
    },
    {
      id: 6,
      title: "Gum Contouring",
      beforeImage: before2,
      afterImage: after2,
    }
  ];

  return (
    <div className="min-h-screen mt-6">
      {/* Hero Section */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Hero Image */}
            <div className="relative h-[500px]">
              <img
                src={bg}
                alt="Dental Treatment"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                {/* Top Label */}
                <div className="flex justify-start">
                  <Badge className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-medium shadow-lg border-3 border-gray-500">
                    Dental Treatment
                  </Badge>
                </div>

                {/* Main Heading */}
                <div className="max-w-xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                    Transformations Your Smile Healthy and Good
                  </h1>

                  {/* Action Badges */}
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-black text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-800 transition cursor-pointer"
                      onClick={() => setShowForm(true)}>
                      <Sparkles className="w-4 h-4" />
                      Book
                    </Badge>
                    <Badge className="bg-white text-gray-800 px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-100 transition cursor-pointer">
                      <Share2 className="w-4 h-4" />
                      Smile and Share
                    </Badge>
                  </div>
                </div>
                {/* Review Card - Top Right */}
                <div className=" absolute top-10 right-10 hidden md:block">
                  <Card className="bg-white p-4 rounded-2xl shadow-lg min-w-[200px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600">Review</span>
                      <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                        +2.5k
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">Meena</p>
                        <div className="flex items-center gap-1">
                          <span className="text-green-600 font-bold text-sm">90%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      I am employed my dental here
                    </p>
                  </Card>
                </div>

                {/* Bottom Section - Patient Reviews */}
                <div className="flex items-end justify-between relative mt-3">
                  <Card className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-white w-10 h-10">
                          <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                          <AvatarFallback>P1</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-white w-10 h-10">
                          <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                          <AvatarFallback>P2</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-white w-10 h-10">
                          <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                          <AvatarFallback>P3</AvatarFallback>
                        </Avatar>
                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm font-semibold text-gray-600">
                          +
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      Our Patents and then<br />Review for them
                    </p>
                  </Card>
                </div>
              </div>

              {/* Pagination Dots */}
              {/* <div className="absolute bottom-8 right-8 flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-semibold shadow-lg">1</div>
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center text-xs font-semibold shadow-lg">2</div>
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center text-xs font-semibold shadow-lg">3</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Before and After Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Treatment Before and After
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment) => (
            <BeforeAfterSlider
              key={treatment.id}
              beforeImage={treatment.beforeImage}
              afterImage={treatment.afterImage}
              title={treatment.title}
            />
          ))}

        </div>
      </section>

      {showForm && (
        <BookAppointmentModal onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}