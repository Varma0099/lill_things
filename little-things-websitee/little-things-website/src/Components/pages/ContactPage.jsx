import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Heart, Sparkles, Star, CheckCircle, Calendar, Users } from 'lucide-react';
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Studio",
      content: "123 Creative Street, City Center\nHyderabad, Telangana 512004",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-100"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 9494343299\nFree consultation available",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-100"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "littlethings@gmail.com\nor\npoojithainturi@gmail.com\nWe reply within 24 hours",
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-50 to-yellow-100"
    }
  ];

  const studioHours = [
    { day: "Monday - Friday", hours: "10:00 AM - 8:00 PM", isToday: false },
    { day: "Saturday", hours: "9:00 AM - 11:00 PM", isToday: false },
    { day: "Sunday", hours: "8:00 AM - 11:00 PM", isToday: true }
  ];

  const socialPlatforms = [
    { name: "Facebook", color: "bg-blue-500 hover:bg-blue-600", icon: "📘" },
    { name: "Instagram", color: "bg-pink-500 hover:bg-pink-600", icon: "📷" },
    { name: "YouTube", color: "bg-red-500 hover:bg-red-600", icon: "🎥" },
    { name: "WhatsApp", color: "bg-green-500 hover:bg-green-600", icon: "💬" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-4 w-20 h-20 sm:top-20 sm:left-10 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300/20 to-rose-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-24 right-4 w-28 h-28 sm:top-40 sm:right-20 sm:w-48 sm:h-48 bg-gradient-to-br from-yellow-300/15 to-orange-400/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/6 w-24 h-24 sm:bottom-40 sm:left-1/4 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-300/10 to-pink-400/10 rounded-full blur-xl"></div>
        <FloatingElement className="absolute top-24 right-1/3 sm:top-32" delay={0}>
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400/60" />
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
                <MessageCircle className="w-4 h-4 mr-2" />
                Get In Touch
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            
            <p className="text-base sm:text-xl text-gray-600 max-w-xl sm:max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you! Whether you have questions about our activities, want to book a session, or just want to say hello, don't hesitate to reach out.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative max-w-2xl sm:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-10 sm:pb-20">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-3">
          
          {/* Contact Form - Takes 2 columns */}
          <div className="sm:col-span-2">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-pink-300/10 to-orange-300/10 rounded-3xl blur-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 p-5 sm:p-8 text-white">
                  <div className="flex items-center mb-2 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-2 sm:mr-4">
                      <Send className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-3xl font-bold">Send Us a Message</h2>
                  </div>
                  <p className="text-white/90 text-xs sm:text-base">
                    Share your creative dreams with us, and we'll help make them come true!
                  </p>
                </div>

                {/* Form Content */}
                <div className="p-4 sm:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8 sm:py-12">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-4 sm:mb-6">
                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">Message Sent!</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Thank you for reaching out! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="group">
                          <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Full Name *
                          </div>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="group">
                          <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Email Address *
                          </div>
                          <input
                            type="email"
                            required
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="group">
                        <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Subject *
                        </div>
                        <select
                          required
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                        >
                          <option value="">Select a subject</option>
                          <option value="workshop-booking">Workshop Booking</option>
                          <option value="private-session">Private Session</option>
                          <option value="group-event">Group Event</option>
                          <option value="general-inquiry">General Inquiry</option>
                          <option value="partnership">Partnership</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                      
                      <div className="group">
                        <div className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Message *
                        </div>
                        <textarea
                          rows="6"
                          required
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base resize-none"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us about your creative vision or ask us anything..."
                        ></textarea>
                      </div>
                      
                      <button
                        onClick={handleSubmit}
                        className="group w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
                      >
                        <span className="flex items-center justify-center">
                          Send Message
                          <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information - Takes 1 column */}
          <div className="space-y-8">
            
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <div key={index} className="group relative transform transition-all duration-500 hover:-translate-y-1">
                <div className={`absolute -inset-2 bg-gradient-to-r ${info.gradient.replace('500', '300/20')} rounded-2xl blur group-hover:blur-lg transition-all duration-300`}></div>
                <div className={`relative bg-gradient-to-br ${info.bgGradient} p-6 rounded-2xl shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300`}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${info.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{info.content}</p>
                </div>
              </div>
            ))}

            {/* Studio Hours */}
            <div className="group relative transform transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-2xl blur group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-100 p-6 rounded-2xl shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Studio Hours</h3>
                <div className="space-y-3">
                  {studioHours.map((schedule, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${
                      schedule.isToday ? 'bg-white/60 border border-emerald-200' : 'bg-white/30'
                    }`}>
                      <span className={`text-sm ${schedule.isToday ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                        {schedule.day}
                      </span>
                      <span className={`text-sm font-medium ${schedule.isToday ? 'text-emerald-600' : 'text-gray-700'}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-white/60 rounded-lg border border-emerald-200">
                  <p className="text-xs text-gray-600 flex items-start">
                    <Calendar className="w-4 h-4 mr-2 mt-0.5 text-emerald-500 flex-shrink-0" />
                    We recommend booking in advance to secure your preferred time slot, especially on weekends.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="group relative transform transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-300/20 to-pink-300/20 rounded-2xl blur group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-violet-50 to-pink-100 p-6 rounded-2xl shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Follow Our Journey</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay updated with our latest creations, workshops, and community highlights!
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map((platform, index) => (
                    <button
                      key={index}
                      className={`${platform.color} text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm font-medium shadow-md hover:shadow-lg`}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100 via-pink-50 to-orange-100 rounded-3xl"></div>
          <div className="relative text-center p-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-3xl shadow-lg">
                  <Star className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                Don't wait to start your creative journey! Book a session today and discover the joy of handcrafting in our peaceful, inspiring studio environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/booking')}
                >
                  Book Now
                </button>
                <button className="group px-8 py-4 bg-white text-gray-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-gray-200">
                  Virtual Tour
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;