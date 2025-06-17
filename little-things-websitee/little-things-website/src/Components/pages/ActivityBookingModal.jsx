import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://lill-things-backend.onrender.com';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];

const ActivityBookingModal = ({ open, onClose, activityName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activity: activityName || '',
    date: '',
    time: '',
    participants: '1',
  });
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, activity: activityName }));
  }, [activityName]);

  // Fetch slot availability when activity or date changes
  useEffect(() => {
    if (activityName && formData.date) {
      setIsLoading(true);
      fetch(`${BACKEND_URL}/api/slots/availability?activity=${encodeURIComponent(activityName)}&date=${formData.date}`)
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Activity not found') {
            setError('Activity not found. Please try again.');
            setAvailableSlots([]);
          } else {
            // Merge backend availability with local timeSlots
            const merged = timeSlots.map(ts => {
              const found = data.availableSlots?.find(s => s.timeSlot === ts);
              return found || { timeSlot: ts, available: true, spotsLeft: 8 };
            });
            setAvailableSlots(merged);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setError('Failed to load slot availability');
          setIsLoading(false);
        });
    } else {
      setAvailableSlots([]);
    }
  }, [activityName, formData.date]);

  // Real-time slot updates
  useEffect(() => {
    const socket = io(BACKEND_URL);
    if (activityName) {
      socket.emit('joinActivity', activityName);
    }
    socket.on('slotUpdated', (data) => {
      if (data.activity === activityName && data.date === formData.date) {
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
  }, [activityName, formData.date]);

  if (!open) return null;

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
          activity: activityName,
          date: formData.date,
          time: formData.time
        })
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        setConfirmationCode(data.booking.confirmationCode);
        setStep(1);
        setFormData({ name: '', email: '', phone: '', activity: activityName, date: '', time: '', participants: '1' });
      } else {
        setError(data.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => { if (step < 3) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 text-2xl font-bold">&times;</button>
        <form onSubmit={handleSubmit}>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${i <= step ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>{i}</div>
                  {i < 3 && <div className={`w-10 h-1 mx-2 rounded-full transition-all duration-300 ${i < step ? 'bg-gradient-to-r from-pink-500 to-orange-500' : 'bg-gray-200'}`}></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 text-sm">
              <span className={step >= 1 ? 'text-pink-600 font-semibold' : 'text-gray-400'}>Personal Info</span>
              <span className={step >= 2 ? 'text-pink-600 font-semibold' : 'text-gray-400'}>Date & Time</span>
              <span className={step >= 3 ? 'text-pink-600 font-semibold' : 'text-gray-400'}>Confirmation</span>
            </div>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">Thank you for booking <span className="font-semibold text-pink-500">{activityName}</span>! We'll contact you soon.</p>
              {confirmationCode && (
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 max-w-sm mx-auto mt-4">
                  <p className="text-sm text-gray-600 mb-1">Your confirmation code:</p>
                  <p className="text-lg font-bold text-pink-600">{confirmationCode}</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => { setIsSubmitted(false); setConfirmationCode(''); onClose(); }}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                    <input type="email" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                    <input type="tel" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Number of Participants</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300" value={formData.participants} onChange={e => setFormData({ ...formData, participants: e.target.value })}>
                      {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>)}
                    </select>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Activity</label>
                    <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed" value={activityName} disabled />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">Preferred Date</label>
                    <input type="date" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value, time: '' })} />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">Preferred Time</label>
                    <select required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} disabled={!formData.activity || !formData.date || isLoading}>
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
              )}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><span className="font-semibold text-gray-700">Name:</span> {formData.name}</div>
                      <div><span className="font-semibold text-gray-700">Email:</span> {formData.email}</div>
                      <div><span className="font-semibold text-gray-700">Phone:</span> {formData.phone}</div>
                      <div><span className="font-semibold text-gray-700">Activity:</span> {activityName}</div>
                      <div><span className="font-semibold text-gray-700">Date:</span> {formData.date}</div>
                      <div><span className="font-semibold text-gray-700">Time:</span> {formData.time}</div>
                      <div><span className="font-semibold text-gray-700">Participants:</span> {formData.participants} {formData.participants === '1' ? 'Person' : 'People'}</div>
                    </div>
                  </div>
                </div>
              )}
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10">
                <button type="button" onClick={prevStep} className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${step === 1 ? 'invisible' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Previous</button>
                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center" disabled={isLoading || (step === 1 && (!formData.name || !formData.email || !formData.phone || !formData.participants)) || (step === 2 && (!formData.activity || !formData.date || !formData.time))}>Next Step</button>
                ) : (
                  <button type="submit" className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center" disabled={isLoading}>{isLoading ? 'Booking...' : 'Confirm Booking'}</button>
                )}
              </div>
              {error && <div className="mt-4 text-center text-red-600 font-semibold">{error}</div>}
              {isLoading && <div className="mt-4 text-center text-pink-600 font-semibold">Loading...</div>}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ActivityBookingModal; 