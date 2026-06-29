import { useState } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

export default function DateStep({ value, onChange, onNext, onBack }) {
  const [error, setError] = useState('');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleNext = () => {
    if (!value) {
      setError('Please select a date for your special day 💕');
      return;
    }
    if (value < today) {
      setError("Let's pick a future date! ✨");
      return;
    }
    setError('');
    onNext();
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    setError('');
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="mt-16 sm:mt-20"
    >
      <div className="glass-strong rounded-3xl p-8 sm:p-10 text-center">
        {/* Icon */}
        <motion.div
          className="mb-4 text-5xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          💌
        </motion.div>

        {/* Heading */}
        <h2
          className="heading-romantic mb-2 font-script text-2xl font-bold sm:text-3xl"
          style={{
            background: 'linear-gradient(135deg, #fda4af, #fb7185, #f43f5e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Choose our special date
        </h2>
        <p className="mb-8 text-sm text-rose-200/50">
          Pick a day that will become a beautiful memory ✨
        </p>

        {/* Date Picker */}
        <div className="mx-auto max-w-xs">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              id="date-picker"
              type="date"
              min={today}
              value={value}
              onChange={handleChange}
              className="input-romantic w-full text-center text-lg font-medium"
              style={{ cursor: 'pointer' }}
            />
          </motion.div>

          {/* Selected Date Display */}
          {value && (
            <motion.div
              className="mt-4 rounded-2xl bg-rose-500/10 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm text-rose-300/70">Our date will be on</p>
              <p className="mt-1 font-script text-xl font-semibold text-rose-200">
                {new Date(value + 'T00:00:00').toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="mt-1 text-lg">🗓️✨</p>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.p
              className="mt-3 text-sm text-rose-400"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            id="date-back"
            onClick={onBack}
            className="btn-secondary px-6 py-3"
          >
            ← Back
          </button>
          <motion.button
            id="date-next"
            onClick={handleNext}
            className="btn-primary px-8 py-3"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Next →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
