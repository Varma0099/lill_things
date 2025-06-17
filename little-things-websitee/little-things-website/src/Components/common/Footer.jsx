import React from 'react';
import { Palette, MapPin, Phone, Mail, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-20 h-20 sm:top-10 sm:left-10 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-400/10 to-rose-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-4 w-28 h-28 sm:bottom-20 sm:right-20 sm:w-48 sm:h-48 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 sm:left-1/3 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-xl"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      <div className="relative py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:gap-8 md:grid-cols-4">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg shadow-lg mr-2 sm:mr-3">
                  <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                  Little Things
                </span>
              </div>
              <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Your creative haven where little things become extraordinary memories and artistic dreams come to life.
              </p>
              <div className="flex items-center text-pink-300">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-xs sm:text-sm font-medium">Premium Art Studio</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Activities', path: '/activities' },
                  { name: 'About', path: '/about' },
                  { name: 'Contact', path: '/contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="group flex items-center text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm sm:text-base"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activities List */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                Our Crafts
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  'Pottery Making',
                  'Ceramic Crafting', 
                  'Art & Painting',
                  'Open Kitchen'
                ].map((activity, index) => (
                  <li key={index} className="flex items-center text-white/70 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mr-2 sm:mr-3"></div>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">
                Get in Touch
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="group flex items-center text-white/70 hover:text-white transition-colors text-sm sm:text-base">
                  <div className="p-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg mr-2 sm:mr-3 group-hover:from-pink-500/30 group-hover:to-orange-500/30 transition-all">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>City Center, Hyderabad</span>
                </div>
                <div className="group flex items-center text-white/70 hover:text-white transition-colors text-sm sm:text-base">
                  <div className="p-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg mr-2 sm:mr-3 group-hover:from-pink-500/30 group-hover:to-orange-500/30 transition-all">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+91 9494343299</span>
                </div>
                <div className="group flex items-center text-white/70 hover:text-white transition-colors text-sm sm:text-base">
                  <div className="p-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg mr-2 sm:mr-3 group-hover:from-pink-500/30 group-hover:to-orange-500/30 transition-all">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>littlethings@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Copyright Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4 gap-2 sm:gap-0">
              <div className="flex items-center text-pink-300">
                <span className="text-white/60 mr-2 text-xs sm:text-base">Made with</span>
                <Heart className="w-4 h-4 fill-current text-pink-400 animate-pulse" />
                <span className="text-white/60 ml-2 text-xs sm:text-base">for creative souls</span>
              </div>
            </div>
            <p className="text-white/50 text-xs sm:text-sm">
              Little Things. Nirvana Communities
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;