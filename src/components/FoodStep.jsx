import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { foodOptions } from '../data/foodOptions';

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

export default function FoodStep({ value, onChange, onNext, onBack }) {
  const [error, setError] = useState('');
  const selected = value || [];

  const toggleItem = (item) => {
    setError('');
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError('Please select at least one food or drink 😋');
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
      <div className="glass-strong rounded-3xl p-5 sm:p-7">
        {/* Header */}
        <div className="mb-4 text-center">
          <motion.div
            className="mb-2 text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          >
            😋
          </motion.div>
          <h2
            className="heading-romantic mb-1 font-script text-2xl font-bold sm:text-3xl"
            style={{
              background: 'linear-gradient(135deg, #fda4af, #fb7185, #f43f5e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Choose your favorite food & drinks
          </h2>
          <p className="text-sm text-rose-200/50">
            Select everything you'd love to enjoy together ✨
          </p>
        </div>

        {/* Selected Count Badge */}
        <div className="mb-4 flex items-center justify-between">
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                className="flex items-center gap-2 rounded-full bg-rose-500/15 px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <span className="text-sm font-semibold text-rose-300">
                  {selected.length} item{selected.length !== 1 ? 's' : ''} selected
                </span>
                <span className="text-base">🛒</span>
              </motion.div>
            )}
          </AnimatePresence>
          {selected.length > 0 && (
            <motion.button
              onClick={clearAll}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-rose-300/70 transition-colors hover:bg-white/10 hover:text-rose-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All ✕
            </motion.button>
          )}
        </div>

        {/* Food Sections */}
        <div className="max-h-[50vh] space-y-4 overflow-y-auto pr-1 sm:max-h-[55vh]">
          {Object.entries(foodOptions).map(([section, items]) => (
            <div key={section}>
              {/* Section Header */}
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-rose-200/80">
                  {section}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-rose-500/20 to-transparent" />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {items.map((item) => {
                  const isSelected = selected.includes(item);
                  return (
                    <motion.button
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={`checkbox-card flex items-center gap-2 text-left ${
                        isSelected ? 'checkbox-card-selected' : ''
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Custom Checkbox */}
                      <div
                        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${
                          isSelected
                            ? 'border-rose-400 bg-rose-500/30 text-rose-200'
                            : 'border-white/15 bg-white/5'
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            className="text-[10px]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                      <span
                        className={`text-xs leading-tight transition-colors ${
                          isSelected
                            ? 'font-medium text-rose-200'
                            : 'text-rose-100/70'
                        }`}
                      >
                        {item}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <motion.p
            className="mt-3 text-center text-sm text-rose-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Buttons */}
        <div className="mt-5 flex justify-center gap-3">
          <button
            id="food-back"
            onClick={onBack}
            className="btn-secondary px-6 py-3"
          >
            ← Back
          </button>
          <motion.button
            id="food-next"
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
