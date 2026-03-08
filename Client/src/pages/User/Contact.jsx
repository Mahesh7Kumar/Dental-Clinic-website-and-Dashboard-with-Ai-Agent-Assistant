import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import api from "@/utils/api";
import Rectangle from "../../assets/Rectangle.png"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/leads", formData);
      alert("Message sent successfully");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="mt-26">
      {/* Hero Section */}
      <section className="relative h-[50dvh] rounded-4xl overflow-hidden">
        <img
          src={Rectangle}
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/40" />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">We would love to hear from you</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Get in Touch */}
        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Come to our clinic for the full check up for your tooth and maintain your smile by our care.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <MapPin />
              </div>
              <p className="text-sm">Plot no: 5, A.K.S Tower, Sakthi Nagar Main Rd, Porur, Chennai</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                <Mail />
              </div>
              <p className="text-sm">demo@lucifer1234.com<br />freedomfreelancer@gmail.com</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-pink-100 text-pink-600">
                <Phone />
              </div>
              <p className="text-sm">+91 98845 66666<br />+91 66666 38108</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-semibold mb-3">Follow our Social media</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <button key={i} className="p-3 rounded-full bg-cyan-500 text-white">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Send Message */}
        <form onSubmit={sendMessage} className="bg-white rounded-2xl p-8 shadow space-y-5">
          <h2 className="text-2xl font-bold">Send a message</h2>
          <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>
          <Textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />
          <Button className="bg-cyan-500 hover:bg-cyan-600">Send</Button>
        </form>
      </section>

      {/* Map */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <iframe
          className="w-full h-[300px] rounded-2xl"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d568.5920043632722!2d80.1579224340945!3d13.045405420224428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261006508551f%3A0x83acebfa53d3de2a!2sBloodtasty%20Motion%20Crafts%20Private%20Limited!5e1!3m2!1sen!2sin!4v1766684636644!5m2!1sen!2sin"
        />
      </section>
    </div>
  );
}
