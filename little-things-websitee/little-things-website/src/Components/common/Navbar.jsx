import React, { useState, useEffect } from 'react';
import { Palette, Menu, X, Sparkles, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Heart, path: '/' },
    { name: 'Activities', icon: Palette, path: '/activities' },
    { name: 'About', icon: Sparkles, path: '/about' },
    { name: 'Contact', icon: Menu, path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-pink-100' 
        : 'bg-gradient-to-r from-white/90 via-pink-50/80 to-orange-50/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-pink-500 to-orange-500 p-2 sm:p-3 rounded-full">
                <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div className="ml-2 sm:ml-3">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Little Things
              </span>
              <div className="text-[10px] sm:text-xs text-gray-500 font-medium">Creative Studio</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center space-x-2 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:text-pink-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                    {/* Hover effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      location.pathname === item.path ? 'hidden' : ''
                    }`}></div>
                  </Link>
                );
              })}
              {/* CTA Button */}
              <button 
                onClick={() => navigate('/booking')}
                className="ml-2 sm:ml-4 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-xs sm:text-sm hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/80 hover:bg-pink-100 text-pink-600 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 shadow-lg z-50 rounded-b-3xl border-b border-pink-100 animate-fade-in">
            <div className="px-2 py-4 sm:px-4 sm:py-6 space-y-2 sm:space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl font-semibold text-left transition-all duration-300 text-xs sm:text-base ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:text-pink-600'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {/* Mobile CTA */}
              <div className="pt-2 sm:pt-4 border-t border-pink-100">
                <button 
                  onClick={() => { navigate('/booking'); setIsMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-xs sm:text-base"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Book Your Session</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-20 w-2 h-2 bg-pink-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-40 w-1 h-1 bg-orange-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-6 right-60 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </nav>
  );
};

export default Navbar;