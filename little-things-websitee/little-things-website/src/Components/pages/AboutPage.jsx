import React, { useState, useEffect } from 'react';
import { Heart, Users, Star, Sparkles, ArrowRight, Palette, Coffee, Target, Eye, Award, Zap, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Floating animation component
const FloatingElement = ({ children, className, delay = 0 }) => {
  return (
    <div 
      className={`${className} animate-bounce`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );
};

// Counter animation component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const specialFeatures = [
    {
      icon: Heart,
      title: "Peaceful Atmosphere",
      description: "Our studio is designed to be a sanctuary of calm, with soft lighting, comfortable seating, and positive energy that flows throughout the space.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-100"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Our team of passionate artists and craftspeople are dedicated to helping you discover and develop your creative abilities.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-100"
    },
    {
      icon: Sparkles,
      title: "Community Focus",
      description: "We believe in the power of creative community, where friendships are forged and inspiration is shared.",
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-50 to-yellow-100"
    },
    {
      icon: Coffee,
      title: "Complete Experience",
      description: "From our open kitchen where you can create your own snacks to our showcase area where you can display your work, we offer a complete creative experience.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-100"
    },
    {
      icon: Award,
      title: "Quality Materials",
      description: "We provide only the finest clays, glazes, paints, and tools to ensure your creative experience is nothing short of exceptional.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-100"
    },
    {
      icon: Clock,
      title: "Flexible Sessions",
      description: "Whether you want a quick creative break or an extended artistic journey, we offer flexible session lengths to fit your schedule.",
      gradient: "from-violet-500 to-pink-500",
      bgGradient: "from-violet-50 to-pink-100"
    }
  ];

  const stats = [
    { number: 500, suffix: "+", label: "Happy Artists" },
    { number: 1000, suffix: "+", label: "Masterpieces" },
    { number: 50, suffix: "+", label: "Monthly Workshops" },
    { number: 5, suffix: "★", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-4 w-20 h-20 sm:top-20 sm:left-10 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300/20 to-rose-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-24 right-4 w-28 h-28 sm:top-40 sm:right-20 sm:w-48 sm:h-48 bg-gradient-to-br from-yellow-300/15 to-orange-400/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/6 w-24 h-24 sm:bottom-40 sm:left-1/4 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-300/10 to-pink-400/10 rounded-full blur-xl"></div>
        <FloatingElement className="absolute top-24 right-1/3 sm:top-32" delay={0}>
          <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400/60" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-1/4 left-4 sm:left-20" delay={1}>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500/60" />
        </FloatingElement>
        <FloatingElement className="absolute top-1/2 right-4 sm:right-16" delay={2}>
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400/60" />
        </FloatingElement>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="relative max-w-2xl sm:max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-pink-700 border border-pink-200 backdrop-blur-sm">
                <Heart className="w-4 h-4 mr-2" />
                Our Story
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              About Little Things
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative max-w-2xl sm:max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pb-10 sm:pb-20">
        <div className="space-y-10 sm:space-y-20">
          
          {/* Our Story Section */}
          <div className="relative">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-pink-300/10 to-orange-300/10 rounded-3xl blur-lg"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-5 sm:p-12 rounded-3xl shadow-2xl border border-white/50">
              <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-8 gap-3 sm:gap-0">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl shadow-lg mr-0 sm:mr-4">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Our Story
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Little Things was born from a simple belief: that creativity and happiness are found in the small, meaningful moments we create with our own hands. Located in the heart of the city, our handcrafting studio serves as an oasis of peace and positive energy where people from all walks of life come together to discover the joy of making something beautiful.
              </p>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-pink-300/20 to-rose-300/20 rounded-2xl blur group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-5 sm:p-8 rounded-2xl shadow-xl border border-white/50 h-full group-hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg mr-3 sm:mr-4">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  To provide a peaceful, inspiring environment where creativity flourishes and connections are made. We believe that through art and craft, people can find relief from daily stress, discover new talents, and experience the pure joy of creation.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-2xl blur group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-5 sm:p-8 rounded-2xl shadow-xl border border-white/50 h-full group-hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-lg mr-3 sm:mr-4">
                    <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  To be the premier destination for creative expression in our city, fostering a community where artisans, beginners, and everyone in between can explore their artistic potential in a supportive, friendly environment.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="relative py-10 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-orange-900/90 rounded-3xl"></div>
            <div className="relative text-center text-white">
              <h2 className="text-xl sm:text-3xl font-bold mb-6 sm:mb-12 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="group transform transition-all duration-500 hover:scale-110">
                    <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-white/80 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What Makes Us Special Section */}
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                What Makes Us Special
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the unique elements that make Little Things more than just a studio—it's a creative sanctuary.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative transform transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient.replace('500', '300/20')} rounded-2xl blur group-hover:blur-lg transition-all duration-300`}></div>
                  <div className={`relative bg-gradient-to-br ${feature.bgGradient} p-8 rounded-2xl shadow-xl border border-white/50 h-full group-hover:shadow-2xl transition-all duration-300`}>
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                    
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Zap className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-100 via-pink-50 to-orange-100 rounded-3xl"></div>
            <div className="relative text-center p-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-3xl shadow-lg">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Join Our Creative Family
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                  At Little Things, we believe that every person has an artist within them waiting to be discovered. Come join our welcoming community and see what beautiful little things you can create!
                </p>
                <button className="group px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/booking')}
                >
                  <span className="flex items-center">
                    Book Your First Session
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;