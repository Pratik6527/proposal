import { useState } from 'react';
import { motion } from 'framer-motion';
import { locationOptions } from '../data/foodOptions';

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function LocationStep({ value, onChange, onNext, onBack }) {
  const [error, setError] = useState('');

  const handleSelect = (name) => {
    onChange(name);
    setError('');
  };

  const handleNext = () => {
    if (!value) {
      setError('Please select a location 🌸');
      return;
    }
    onNext();
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
      <div className="glass-strong rounded-3xl p-6 sm:p-8 text-center">
        {/* Icon */}
        <motion.div
          className="mb-3 text-5xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌸
        </motion.div>

        {/* Heading */}
        <h2
          className="heading-romantic mb-1 font-script text-2xl font-bold sm:text-3xl"
          style={{
            background: 'linear-gradient(135deg, #fda4af, #fb7185, #f43f5e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Where should we go?
        </h2>
        <p className="mb-6 text-sm text-rose-200/50">
          Pick the perfect spot for our date ✨
        </p>

        {/* Location Cards */}
        <div className="grid grid-cols-2 gap-3">
          {locationOptions.map((loc, i) => (
            <motion.button
              key={loc.id}
              id={`location-${loc.id}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleSelect(loc.name)}
              className={`glass-card flex flex-col items-center gap-1 p-4 text-center ${
                value === loc.name ? 'glass-card-selected' : ''
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-2xl">{loc.icon}</span>
              <span className="text-sm font-semibold text-rose-100">
                {loc.name}
              </span>
              <span className="text-[11px] text-rose-200/40">
                {loc.desc}
              </span>
              {value === loc.name && (
                <motion.span
                  className="text-xs text-rose-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  ✓ Selected
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <motion.p
            className="mt-4 text-sm text-rose-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            id="location-back"
            onClick={onBack}
            className="btn-secondary px-6 py-3"
          >
            ← Back
          </button>
          <motion.button
            id="location-next"
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
