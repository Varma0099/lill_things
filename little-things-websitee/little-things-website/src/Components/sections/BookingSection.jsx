import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import { Calendar, Clock, Users, Palette, Sparkles, ArrowRight, Check } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://lill-things-backend.onrender.com';

const activities = [
  { name: 'Pottery Making', icon: '🏺', color: 'from-pink-500 to-rose-500', description: 'Shape clay into beautiful pottery' },
  { name: 'Ceramic Crafting', icon: '🎨', color: 'from-purple-500 to-pink-500', description: 'Create stunning ceramic pieces' },
  { name: 'Art & Painting', icon: '🖌️', color: 'from-orange-500 to-yellow-500', description: 'Express yourself through colors' },
  { name: 'Creative Food Center', icon: '👨‍🍳', color: 'from-green-500 to-teal-500', description: 'Cook while you create' },
  { name: 'Mixed Activities', icon: '✨', color: 'from-indigo-500 to-purple-500', description: 'Try multiple creative activities' },
  { name: 'Bharatanatyam', icon: '💃', color: 'from-red-500 to-orange-500', description: 'Classical Indian dance and storytelling' },
  { name: 'Acting Studio', icon: '🎭', color: 'from-blue-500 to-cyan-500', description: 'Explore drama and performance arts' }
];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activity: '',
    date: '',
    time: '',
    participants: '1'
  });

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  // Slot availability state: { timeSlot, available, spotsLeft }
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch slot availability when activity or date changes
  useEffect(() => {
    if (formData.activity && formData.date) {
      setIsLoading(true);
      fetch(`${BACKEND_URL}/api/slots/availability?activity=${encodeURIComponent(formData.activity)}&date=${formData.date}`)
        .then(res => res.json())
        .then(data => {
          // Merge backend availability with local timeSlots
          const merged = timeSlots.map(ts => {
            const found = data.availableSlots?.find(s => s.timeSlot === ts);
            return found || { timeSlot: ts, available: true, spotsLeft: 8 };
          });
          setAvailableSlots(merged);
          setIsLoading(false);
        })
        .catch(() => {
          setError('Failed to load slot availability');
          setIsLoading(false);
        });
    } else {
      setAvailableSlots([]);
    }
  }, [formData.activity, formData.date]);

  // Real-time slot updates
  useEffect(() => {
    const socket = io(BACKEND_URL);
    if (formData.activity) {
      socket.emit('joinActivity', formData.activity);
    }
    socket.on('slotUpdated', (data) => {
      if (data.activity === formData.activity && data.date === formData.date) {
        setAvailableSlots(prev =>
          prev.map(slot =>
            slot.timeSlot === data.timeSlot
              ? { ...slot, spotsLeft: data.spotsLeft, available: data.spotsLeft > 0 }
              : slot
          )
        );
      }
    });
    return () => socket.disconnect();
    // eslint-disable-next-line
  }, [formData.activity, formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            participants: Number(formData.participants)
          },
          activity: formData.activity,
          date: formData.date,
          time: formData.time
        })
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        setConfirmationCode(data.booking.confirmationCode);
        setStep(1);
        setFormData({ name: '', email: '', phone: '', activity: '', date: '', time: '', participants: '1' });
      } else {
        setError(data.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    return (
      <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-6 sm:p-12 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-orange-400/10"></div>
        <div className="relative text-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">Booking Confirmed! 🎉</h3>
          <p className="text-gray-600 text-base sm:text-lg mb-2">
            Thank you for booking with Little Things! We'll contact you soon to confirm your creative session.
          </p>
          {confirmationCode && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/50 max-w-xs sm:max-w-sm mx-auto mt-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Your confirmation code:</p>
              <p className="text-base sm:text-lg font-bold text-pink-600">{confirmationCode}</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => { setIsSubmitted(false); setConfirmationCode(''); }}
            className="mt-6 sm:mt-8 px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 text-base sm:text-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-4 sm:p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300/20 to-orange-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-300/20 to-pink-400/20 rounded-full blur-xl"></div>
      <div className="relative">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-200 mb-3 sm:mb-4">
            <Sparkles className="w-4 h-4 mr-2 text-pink-600" />
            <span className="text-xs sm:text-sm font-semibold text-pink-700">Book Your Creative Journey</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            Reserve Your Creative Slot
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg max-w-xs sm:max-w-2xl mx-auto">
            Choose your perfect time to unleash your creativity in our inspiring studio space
          </p>
        </div>
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-10">
          <div className="flex justify-center mb-3 sm:mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                  i <= step 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={`w-10 h-1 sm:w-16 mx-1 sm:mx-2 rounded-full transition-all duration-300 ${
                    i < step ? 'bg-gradient-to-r from-pink-500 to-orange-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm">
            <span className={step >= 1 ? 'text-pink-600 font-semibold' : 'text-gray-400'}>Personal Info</span>
            <span className={step >= 2 ? 'text-pink-600 font-semibold' : 'text-gray-400'}>Activity & Time</span>
            <span className={step >= 3 ? 'text-pink-600 font-semibold' : 'text-gray-400'}>Confirmation</span>
          </div>
        </div>
        {error && (
          <div className="mb-4 text-center text-red-600 font-semibold">{error}</div>
        )}
        {isLoading && (
          <div className="mb-4 text-center text-pink-600 font-semibold">Loading...</div>
        )}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-pink-500" />
                Tell Us About Yourself
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Number of Participants</label>
                  <select
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-pink-500" />
                Choose Your Creative Experience
              </h3>
              {/* Activity Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-4">Select Activity</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.name}
                      onClick={() => setFormData({ ...formData, activity: activity.name, time: '' })}
                      className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        formData.activity === activity.name
                          ? `border-pink-500 bg-gradient-to-br ${activity.color} text-white shadow-lg`
                          : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{activity.icon}</div>
                      <h4 className="font-semibold mb-0.5 sm:mb-1 text-base sm:text-lg">{activity.name}</h4>
                      <p className={`text-xs sm:text-sm ${formData.activity === activity.name ? 'text-white/80' : 'text-gray-500'}`}>{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Date and Time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                  />
                </div>
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-pink-500" />
                    Preferred Time
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 text-sm sm:text-base"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    disabled={!formData.activity || !formData.date || isLoading}
                  >
                    <option value="">{isLoading ? 'Loading...' : 'Select time'}</option>
                    {availableSlots.length > 0
                      ? availableSlots.map((slot) => (
                          <option key={slot.timeSlot} value={slot.timeSlot} disabled={!slot.available}>
                            {slot.timeSlot} {slot.available ? `(Spots left: ${slot.spotsLeft})` : '(Full)'}
                          </option>
                        ))
                      : timeSlots.map((ts) => (
                          <option key={ts} value={ts}>{ts}</option>
                        ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-pink-500" />
                Confirm Your Booking
              </h3>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/50">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 text-xs sm:text-sm">
                  <div><span className="font-semibold text-gray-700">Name:</span> {formData.name}</div>
                  <div><span className="font-semibold text-gray-700">Email:</span> {formData.email}</div>
                  <div><span className="font-semibold text-gray-700">Phone:</span> {formData.phone}</div>
                  <div><span className="font-semibold text-gray-700">Activity:</span> {formData.activity}</div>
                  <div><span className="font-semibold text-gray-700">Date:</span> {formData.date}</div>
                  <div><span className="font-semibold text-gray-700">Time:</span> {formData.time}</div>
                  <div><span className="font-semibold text-gray-700">Participants:</span> {formData.participants} {formData.participants === '1' ? 'Person' : 'People'}</div>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-8 sm:mt-10">
            <button
              type="button"
              onClick={prevStep}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 ${
                step === 1 
                  ? 'invisible' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-7 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center text-base sm:text-lg"
                disabled={isLoading || (step === 1 && (!formData.name || !formData.email || !formData.phone || !formData.participants)) || (step === 2 && (!formData.activity || !formData.date || !formData.time))}
              >
                Next Step
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-7 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center text-base sm:text-lg"
                disabled={isLoading}
              >
                <Calendar className="mr-2 w-5 h-5" />
                {isLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            )}
          </div>
        </form>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BookingSection;