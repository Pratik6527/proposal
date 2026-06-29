import { useState } from 'react';
import { motion } from 'framer-motion';
import { mealOptions } from '../data/foodOptions';

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, type: 'spring', stiffness: 200 },
  }),
};

export default function MealStep({ value, onChange, onNext, onBack }) {
  const [error, setError] = useState('');

  const handleSelect = (name) => {
    onChange(name);
    setError('');
  };

  const handleNext = () => {
    if (!value) {
      setError('Please select a meal type 🍽️');
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
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🍽️
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
          What should we enjoy together?
        </h2>
        <p className="mb-6 text-sm text-rose-200/50">
          Choose the vibe for our date ✨
        </p>

        {/* Meal Cards */}
        <div className="grid grid-cols-2 gap-4">
          {mealOptions.map((meal, i) => (
            <motion.button
              key={meal.id}
              id={`meal-${meal.id}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleSelect(meal.name)}
              className={`glass-card flex flex-col items-center gap-2 p-6 ${
                value === meal.name ? 'glass-card-selected' : ''
              }`}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-4xl">{meal.icon}</span>
              <span className="text-base font-semibold text-rose-100">
                {meal.name}
              </span>
              <span className="text-xs text-rose-200/40">
                {meal.desc}
              </span>
              {value === meal.name && (
                <motion.div
                  className="mt-1 rounded-full bg-rose-500/20 px-3 py-1 text-xs text-rose-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  ✓ Selected
                </motion.div>
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
            id="meal-back"
            onClick={onBack}
            className="btn-secondary px-6 py-3"
          >
            ← Back
          </button>
          <motion.button
            id="meal-next"
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
