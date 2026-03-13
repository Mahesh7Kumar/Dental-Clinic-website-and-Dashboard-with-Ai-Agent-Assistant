import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import avater from "../../assets/Ellipse1.png";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Newspaper, 
  GraduationCap, 
  Lightbulb, 
  Smile, 
  TrendingUp, 
  Heart,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import blog1 from '../../assets/blog1.webp';
import blog2 from '../../assets/blog2.webp';
import blog3 from '../../assets/blog3.webp';
import blog4 from '../../assets/blog4.webp';
import blog5 from '../../assets/blog5.webp';
import blog6 from '../../assets/blog6.webp';

const blogData = [
  {
    id: 1,
    title: "How Tech Shapes the Future of Work in 2024",
    excerpt: "In today's ever-evolving world, storytelling has become a powerful tool for connection. Revision provides a unique platform for individuals to...",
    content: `Preventive dental care is the foundation of long-term oral health. Regular checkups, proper hygiene, and early treatment help prevent serious dental problems before they become painful and costly. By focusing on prevention, patients can enjoy healthier teeth, stronger gums, and a confident smile at every stage of life.

What Is Preventive Dental Care?

Preventive dental care includes routine practices and professional treatments designed to maintain oral health and prevent dental diseases such as cavities, gum disease, and enamel erosion. These measures focus on early detection and consistent care rather than treating problems after they occur.

Common preventive services include:
• Regular dental checkups
• Professional teeth cleaning
• Dental X-rays
• Fluoride treatments
• Oral health education

Why Regular Dental Checkups Matter

Many dental issues develop silently without obvious symptoms. Routine dental visits allow dentists to identify problems early, such as:
• Tooth decay
• Gum inflammation
• Oral infections
• Early signs of oral cancer

Early detection means simpler treatments, less discomfort, and better long-term results.

Daily Habits That Protect Your Teeth

Maintaining good oral hygiene at home is just as important as visiting the dentist. Key daily habits include:
• Brushing twice a day with fluoride toothpaste
• Flossing daily to remove plaque between teeth
• Rinsing with a dentist-recommended mouthwash
• Limiting sugary foods and drinks
• Drinking plenty of water

These simple steps significantly reduce the risk of cavities and gum disease.`,
    author: "Ethan Caldwell",
    date: "October 16, 2024",
    image: blog1,
    categories: ["BUSINESS", "NEWS"]
  },
  {
    id: 2,
    title: "The Future of Work: Tech and Remote Trends",
    excerpt: "In today's ever-evolving world, storytelling has become a powerful tool for connection. Revision provides a unique platform for individuals to...",
    content: `Digital technology has transformed how dental practices operate and how patients receive care. From advanced imaging to AI-powered diagnostics, technology is making dental treatments more precise, efficient, and comfortable than ever before.

Digital Impressions and 3D Imaging

Gone are the days of uncomfortable impression molds. Digital scanners create precise 3D models of your teeth in minutes, improving the fit and comfort of crowns, bridges, and aligners. This technology also reduces treatment time and enhances accuracy.

AI-Powered Diagnostics

Artificial intelligence is helping dentists detect cavities, gum disease, and other oral health issues earlier and more accurately. AI algorithms analyze X-rays and scans to identify problems that might be missed by the human eye, leading to better treatment outcomes.

Laser Dentistry

Laser technology has revolutionized many dental procedures, offering:
• Less pain and discomfort
• Reduced bleeding and swelling
• Faster healing times
• Greater precision in treatment

Lasers are now used for cavity treatment, gum reshaping, teeth whitening, and more.

Teledentistry

Virtual consultations make dental care more accessible, especially for routine checkups, follow-ups, and initial assessments. Patients can connect with their dentist from home, saving time and making it easier to maintain regular care.`,
    author: "Ethan Caldwell",
    date: "September 28, 2024",
    image: blog2,
    categories: ["SPORT", "TRAVEL"]
  },
  {
    id: 3,
    title: "Remote Work Trends in the Digital Age",
    excerpt: "Discover the cutting-edge tech tools gadgets making travel smarter and more convenient in 2024.",
    content: `A bright, white smile is often associated with health, confidence, and beauty. While professional whitening treatments are effective, there are many natural and safe methods to enhance your smile at home.

Understanding Tooth Discoloration

Teeth can become stained or discolored due to:
• Foods and beverages (coffee, tea, red wine)
• Tobacco use
• Aging and enamel thinning
• Certain medications
• Poor oral hygiene

Understanding the cause helps in choosing the right whitening approach.

Professional Whitening Options

In-office whitening provides the fastest and most dramatic results. Dentists use professional-grade bleaching agents and specialized lights to whiten teeth several shades in just one visit. Custom take-home trays offer a more gradual approach with professional-strength gel.

Natural Whitening Methods

Several natural methods can help maintain a brighter smile:
• Oil pulling with coconut oil
• Brushing with baking soda (occasionally)
• Eating crunchy fruits and vegetables
• Limiting staining foods and drinks
• Using whitening toothpaste

Prevention Is Key

The best way to maintain white teeth is to prevent staining:
• Brush twice daily
• Floss regularly
• Rinse after consuming staining foods
• Use a straw for dark beverages
• Schedule regular dental cleanings

Maintaining results requires consistent oral hygiene and periodic touch-ups as recommended by your dentist.`,
    author: "Ethan Caldwell",
    date: "September 27, 2024",
    image: blog3,
    categories: ["NEWS", "TRENDS"]
  },
  {
    id: 4,
    title: "Business Travel Tools for the Digital Age",
    excerpt: "Learn how businesses can strategize and test their growth and scale in today's competitive landscape.",
    content: `Dental implants have become the gold standard for replacing missing teeth. They offer a permanent, natural-looking solution that restores both function and aesthetics, improving quality of life for millions of people.

What Are Dental Implants?

A dental implant is a titanium post surgically placed into the jawbone to serve as an artificial tooth root. Once integrated with the bone, it supports a crown, bridge, or denture, providing stability and strength comparable to natural teeth.

Benefits of Dental Implants

Dental implants offer numerous advantages:
• Permanent solution lasting decades
• Natural appearance and feel
• Preserve jawbone and facial structure
• No damage to adjacent teeth
• Improved chewing and speaking ability
• Enhanced confidence and self-esteem

The Implant Procedure

The process typically involves three stages:
1. Initial consultation and planning (including X-rays and 3D imaging)
2. Surgical placement of the implant
3. Healing period (3-6 months for osseointegration)
4. Placement of the final restoration

Modern techniques and sedation options make the procedure comfortable with minimal discomfort.

Caring for Your Implants

Dental implants require the same care as natural teeth:
• Brush twice daily
• Floss around implants
• Use antimicrobial mouthwash
• Regular dental checkups
• Avoid smoking

With proper care, dental implants can last a lifetime, making them an excellent investment in your oral health.`,
    author: "Ethan Caldwell",
    date: "September 25, 2024",
    image: blog4,
    categories: ["NEWS"]
  },
  {
    id: 5,
    title: "Key Sports Trends for 2024: From AI to Virtual Reality",
    excerpt: "Dive into the key sports trends like AI and virtual reality set to redefine the sports industry in 2024.",
    content: `Gum disease, also known as periodontal disease, is one of the most common dental problems affecting adults. Understanding the signs, causes, and prevention methods can help you maintain healthy gums and avoid serious complications.

What Is Gum Disease?

Gum disease is an infection of the tissues that support your teeth. It begins with gingivitis (inflammation of the gums) and can progress to periodontitis, which can lead to tooth loss if left untreated.

Signs and Symptoms

Watch for these warning signs:
• Red, swollen, or tender gums
• Bleeding when brushing or flossing
• Persistent bad breath
• Receding gums
• Loose teeth
• Pain when chewing

Early detection is crucial for successful treatment.

Causes and Risk Factors

Gum disease develops when plaque builds up along the gumline. Risk factors include:
• Poor oral hygiene
• Smoking and tobacco use
• Diabetes
• Hormonal changes
• Certain medications
• Genetic predisposition

Prevention Strategies

Preventing gum disease requires consistent oral care:
• Brush twice daily with a soft-bristled brush
• Floss daily to remove plaque between teeth
• Use an antimicrobial mouthwash
• Eat a balanced diet low in sugar
• Don't smoke
• Schedule regular dental cleanings

Treatment Options

Treatment depends on the severity:
• Professional cleaning for early-stage disease
• Scaling and root planing for moderate cases
• Surgical procedures for advanced periodontitis
• Antibiotics to control infection

Regular dental visits ensure early detection and treatment, preventing progression to more serious stages.`,
    author: "Ethan Caldwell",
    date: "September 24, 2024",
    image: blog5,
    categories: ["SPORT", "TECHNOLOGY"]
  },
  {
    id: 6,
    title: "Startups and AI: 2024 Sports Industry with Innovative Tech",
    excerpt: "Discover strategies and analytics leveraging technology to disrupt and innovate within the sports industry.",
    content: `Choosing the right toothbrush and toothpaste is fundamental to maintaining good oral health. With countless options available, understanding what works best for your specific needs can make a significant difference in your dental care routine.

Manual vs. Electric Toothbrushes

Manual Toothbrushes:
• Affordable and widely available
• Simple to use and travel-friendly
• Effective when used with proper technique
• Need to be replaced every 3 months

Electric Toothbrushes:
• More effective at removing plaque
• Built-in timers ensure adequate brushing
• Various modes for different needs
• Ideal for people with limited dexterity

Studies show that electric toothbrushes, particularly those with oscillating heads, remove more plaque and reduce gingivitis better than manual brushes.

Choosing the Right Toothpaste

Consider these factors when selecting toothpaste:

For Cavity Prevention: Look for fluoride toothpaste, which strengthens enamel and prevents decay.

For Sensitivity: Choose toothpaste specifically formulated for sensitive teeth, containing potassium nitrate or stannous fluoride.

For Whitening: Whitening toothpastes contain mild abrasives and chemicals to remove surface stains.

For Gum Health: Select toothpastes with antibacterial ingredients like stannous fluoride or triclosan.

Proper Brushing Technique

Regardless of your choice of brush:
• Brush for two minutes, twice daily
• Use gentle circular motions
• Angle the brush at 45 degrees toward the gumline
• Don't forget your tongue
• Replace your brush every 3-4 months

Additional Considerations

• Soft-bristled brushes are gentler on gums
• Look for the ADA Seal of Acceptance
• Consider your specific dental needs
• Ask your dentist for recommendations

The best toothbrush and toothpaste are the ones you'll use consistently. Establishing a solid oral hygiene routine is the foundation of dental health.`,
    author: "Ethan Caldwell",
    date: "September 16, 2024",
    image: blog6,
    categories: ["NEWS", "TRENDS"]
  }
];

const categories = [
  { name: "News", icon: Newspaper },
  { name: "Patient Education", icon: GraduationCap },
  { name: "Dental Care Tips", icon: Lightbulb },
  { name: "Dental Implants", icon: Smile },
  { name: "Trends", icon: TrendingUp },
  { name: "Health Info", icon: Heart }
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredBlogs = selectedCategory
    ? blogData.filter(blog => 
        blog.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      )
    : blogData;

  if (selectedBlog) {
    return <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Heartfelt <span className="text-indigo-500">Reflections:</span> Stories of Love, Loss, and Growth
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
            Welcome to your trusted source for brighter smiles and better oral health! Explore informative and engaging dental content created to educate, comfort, and connect patients worldwide.
          </p>
        </div>

        {/* Explore Trending Topics */}
        <div className="mb-12">
          <h2 className="text-center text-sm font-semibold text-gray-500 mb-6 tracking-wider uppercase">
            Explore Trending Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.name;
              return (
                <Badge
                  key={category.name}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="relative px-3">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
                />
                <div className="absolute top-5 right-5 flex gap-2">
                  {blog.categories.map((cat) => (
                    <Badge
                      key={cat}
                      className="bg-green-300 text-gray-800 text-xs px-3 py-1 font-semibold shadow-md"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-2">
                  {blog.author} on {blog.date}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button variant="outline" className="w-10 h-10 p-0">1</Button>
          <Button variant="ghost" className="w-10 h-10 p-0">2</Button>
          <span className="px-2">...</span>
          <Button variant="ghost" className="w-10 h-10 p-0">3</Button>
          <Button variant="ghost" className="w-10 h-10 p-0">&gt;</Button>
        </div>

       
      </div>
    </div>
  );
};

const BlogDetail = ({ blog, onBack }) => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 rounded-full"
        >
          ← Back
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Heartfelt <span className="text-indigo-500">Reflections:</span> Stories of Love, Loss, and Growth
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden mb-8">
              <div className="relative px-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-5 left-5 flex gap-2">
                  {blog.categories.map((cat) => (
                    <Badge
                      key={cat}
                      className="bg-green-300 text-gray-800 px-4 py-1 font-semibold shadow-md"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-6">{blog.author} on {blog.date}</p>
              
              <h3 className="text-xl font-bold mb-4">
                Simple habits today can protect your smile for a lifetime
              </h3>
              
              <div className="prose prose-lg max-w-none">
                {blog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">About</h3>
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avater} />
                  <AvatarFallback>EC</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">Ethan Caldwell</h4>
                  <p className="text-xs text-gray-500">REFLECTIVE BLOGGER</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Ethan Caldwell shares thoughtful insights and reflections on life, culture, and personal growth. His work explores the intersections of creativity and experience, offering readers unique perspectives.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </div>
              <div className="flex gap-3">
                <Twitter className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                <Facebook className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                <Instagram className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                <Linkedin className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
              </div>
            </Card>

            {/* Featured Posts */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Featured Posts</h3>
              <Card className="overflow-hidden mb-4 bg-gradient-to-br from-orange-400 to-pink-500 px-2">
                <img
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop"
                  alt="Featured"
                  className="w-full h-32 object-cover opacity-75 rounded-lg"
                />
                <div className="p-4 text-white">
                  <Badge className="bg-white/20 text-white text-xs mb-2">MANAGEMENT</Badge>
                  <p className="text-xs mb-1">Ethan Caldwell • January 7, 2024</p>
                  <h4 className="font-bold text-sm">AI in Business Management: Improving Efficiency and Decision Making</h4>
                </div>
              </Card>
              <div className="flex gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-white border border-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </Card>

            {/* Work Experience */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Work Experience</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm">Cheif Doctor at Clinic</h4>
                    <span className="text-xs text-gray-500">2022 — Now</span>
                  </div>
                  <p className="text-xs text-gray-500">Pioneer</p>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm">Dental Doctor</h4>
                    <span className="text-xs text-gray-500">2020 — 2022</span>
                  </div>
                  <p className="text-xs text-gray-500">Digital</p>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm">Public Doctor</h4>
                    <span className="text-xs text-gray-500">2017 — 2020</span>
                  </div>
                  <p className="text-xs text-gray-500">Digital</p>
                </div>
              </div>
            </Card>

            {/* Creating */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Creating</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between text-sm text-indigo-600 hover:text-indigo-700">
                  <span>Heartfelt Reflections</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-xs text-gray-600">
                  A deep dive into emotional experiences and personal growth, sharing valuable insights on life's most meaningful moments.
                </p>
                <a href="#" className="flex items-center justify-between text-sm text-indigo-600 hover:text-indigo-700">
                  <span>Latest Tech Gadgets</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-xs text-gray-600">
                  Explore the newest and most innovative technology products hitting the market, from smart devices to cutting-edge tools.
                </p>
                <a href="#" className="flex items-center justify-between text-sm text-indigo-600 hover:text-indigo-700">
                  <span>Trends For 2024</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-xs text-gray-600">
                  A look ahead at the emerging trends that will shape the world in 2024, from lifestyle shifts to groundbreaking innovations.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;