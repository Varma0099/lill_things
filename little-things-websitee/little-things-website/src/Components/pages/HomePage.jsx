import React, { useState, useEffect } from 'react';
import { Heart, Users, Coffee, Palette, Sparkles, ArrowRight, Star, Play } from 'lucide-react';
import BookingSection from '../sections/BookingSection';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const heroImages = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFsPesgEGoNOFqj6EXdb8f7AvjNrdsZbvUvg&s",
      alt: "Pottery making session",
      caption: "Shape Your Dreams with Clay"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc8fysmW6sE4x1KiaDk9NVIy_Kv-x0K1qJQg&s",
      alt: "Ceramic crafting workshop", 
      caption: "Create Beautiful Ceramics"
    },
    {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSnBeyJlVtB78qrVQuWvWQPaUnjBhEG0ioYw&s",
      
      alt: "Art and painting session",
      caption: "Express Yourself Through Art"
    },
    {
      src: "https://i.pinimg.com/736x/d4/d4/ee/d4d4ee8b3f45e22fa9306a1255c76d5c.jpg",
      alt: "Community crafting space",
      caption: "Connect & Create Together"
    },
    {
      src: "https://i.pinimg.com/736x/f7/4e/4a/f74e4a170f45ef78a44e806c77d48517.jpg",
      alt: "Traditional Dance Center",
      caption: "Connect & Create Together"
    }
  ];

  const quotes = [
    "Where creativity meets serenity, and every little thing becomes extraordinary.",
    "Discover the joy of making something beautiful with your own hands.",
    "In our peaceful space, your imagination comes to life through clay and color.",
    "Join our creative community where friendship blooms through shared artistry."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    
    return () => {
      clearInterval(quoteInterval);
      clearInterval(imageInterval);
    };
  }, [quotes.length, heroImages.length]);

  const FloatingElement = ({ children, className = "", delay = 0 }) => (
    <div 
      className={`animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300/20 to-rose-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-4 w-28 h-28 sm:w-48 sm:h-48 bg-gradient-to-br from-yellow-300/15 to-orange-400/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-300/10 to-pink-400/10 rounded-full blur-xl"></div>
        <FloatingElement className="absolute top-32 right-1/3" delay={0}>
          <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400/60" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-1/3 left-4 sm:left-20" delay={1}>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500/60" />
        </FloatingElement>
        <FloatingElement className="absolute top-1/2 right-4 sm:right-16" delay={2}>
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400/60" />
        </FloatingElement>
      </div>

      <div className="relative space-y-0">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden pt-20 pb-10 sm:pt-0 sm:pb-0">
          {/* Image Carousel Background */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-purple-900/30"></div>
              </div>
            ))}
          </div>

          {/* Artistic Overlay Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-rose-900/20"></div>
          
          {/* Hero Content */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className={`w-full max-w-lg sm:max-w-2xl transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <div className="mb-4 sm:mb-6">
                <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-white border border-white/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Premium Art Studio
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-pink-100 to-yellow-100 bg-clip-text text-transparent">
                Little Things
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-2 sm:mb-4 font-light leading-relaxed">
                Your Creative Haven in the Heart of the City
              </p>
              
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed">
                {heroImages[currentImage].caption}
              </p>
              
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button 
                  onClick={() => navigate('/booking')}
                  className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-semibold text-base sm:text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center">
                    Start Creating Today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                
                <button className="group px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/30 text-white rounded-full font-semibold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Our Story
                </button>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImage 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="relative py-10 sm:py-20 bg-gradient-to-r from-rose-100 via-pink-50 to-orange-100">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/5 to-orange-400/5"></div>
          <div className="relative max-w-2xl sm:max-w-5xl mx-auto px-4 text-center">
            <div className="mb-8 sm:mb-12">
              <Palette className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500 mx-auto mb-3 sm:mb-4" />
              <h2 className="text-xs sm:text-sm font-semibold text-pink-600 uppercase tracking-wider">
                Our Philosophy
              </h2>
            </div>
            
            <div className="relative h-20 sm:h-32 flex items-center justify-center mb-6 sm:mb-8">
              <p className="text-lg sm:text-2xl md:text-4xl font-light text-gray-700 italic transition-all duration-1000 leading-relaxed max-w-xs sm:max-w-4xl mx-auto">
                "{quotes[currentQuote]}"
              </p>
            </div>
            
            <div className="flex justify-center space-x-2 sm:space-x-3">
              {quotes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
                    index === currentQuote ? 'bg-pink-500 scale-125' : 'bg-pink-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-white to-rose-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-pink-600 uppercase tracking-wider mb-4">
                Why Choose Us
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Why Choose Little Things?
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the perfect blend of creativity, community, and craftsmanship in our inspiring studio
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Peaceful Environment",
                  description: "A serene space with positive vibes where creativity flows naturally and inspiration strikes",
                  color: "from-pink-500 to-rose-500",
                  bgColor: "from-pink-50 to-rose-50",
                  hoverColor: "group-hover:from-pink-100 group-hover:to-rose-100"
                },
                {
                  icon: Users,
                  title: "Expert Guidance", 
                  description: "Professional trainers and master artisans to help you discover and master pottery, ceramics, and fine arts",
                  color: "from-orange-500 to-yellow-500",
                  bgColor: "from-orange-50 to-yellow-50",
                  hoverColor: "group-hover:from-orange-100 group-hover:to-yellow-100"
                },
                {
                  icon: Coffee,
                  title: "Open Kitchen",
                  description: "Create your own delicious snacks or order from our artisanal menu while you craft your masterpiece",
                  color: "from-emerald-500 to-teal-500", 
                  bgColor: "from-emerald-50 to-teal-50",
                  hoverColor: "group-hover:from-emerald-100 group-hover:to-teal-100"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`group text-center p-8 rounded-2xl bg-gradient-to-br ${feature.bgColor} ${feature.hoverColor} border border-white/50 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2`}
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-gray-400 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Happy Artists" },
                { number: "1000+", label: "Masterpieces Created" },
                { number: "50+", label: "Workshops Monthly" },
                { number: "5★", label: "Average Rating" }
              ].map((stat, index) => (
                <div key={index} className="transform transition-all duration-500 hover:scale-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-rose-50 to-orange-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
              <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our community of artists and discover the joy of creating beautiful handcrafted pieces. 
                Your artistic journey starts here.
              </p>
              <button 
                onClick={() => navigate('/booking')}
                className="group px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center">
                  Book Your Session Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;