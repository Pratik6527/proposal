import { useState } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

export default function ConfirmStep({ formData, onSuccess, onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const formattedDate = formData.selectedDate
    ? new Date(formData.selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const validate = () => {
    const errors = {};
    if (!formData.selectedDate) errors.date = 'Date is required';
    if (!formData.selectedLocation) errors.location = 'Location is required';
    if (!formData.selectedMeal) errors.meal = 'Meal type is required';
    if (!formData.selectedFoods || formData.selectedFoods.length === 0)
      errors.food = 'Food selection is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    setLoading(true);
    setError('');
    
    // Simulate a brief loading state for UX
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  // Split foods into food and drinks
  const drinkItems = [
    'Cold Coffee', 'Hot Coffee', 'Masala Chai', 'Lemon Tea',
    'Fresh Lime Soda', 'Mocktail', 'Soft Drink', 'Mango Shake',
    'Chocolate Shake', 'Mineral Water',
  ];
  const selectedDrinks = formData.selectedFoods.filter((f) =>
    drinkItems.includes(f)
  );
  const selectedFood = formData.selectedFoods.filter(
    (f) => !drinkItems.includes(f)
  );

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
        <div className="mb-5 text-center">
          <motion.div
            className="mb-2 text-4xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💝
          </motion.div>
          <h2
            className="heading-romantic mb-1 font-script text-2xl font-bold sm:text-3xl"
            style={{
              background: 'linear-gradient(135deg, #fda4af, #fb7185, #f43f5e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Almost done!
          </h2>
          <p className="text-sm text-rose-200/50">
            Confirm your date with Pratik ❤️
          </p>
        </div>

        {/* Summary Card */}
        <div className="mb-5 rounded-2xl border border-white/8 bg-white/3 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-rose-300/80 uppercase tracking-wider">
            Date Summary 💫
          </h3>

          {/* Date */}
          <div className="flex items-start gap-3">
            <span className="text-lg">📅</span>
            <div>
              <p className="text-xs text-rose-200/50">Date</p>
              <p className="text-sm font-medium text-rose-100">{formattedDate || '—'}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <span className="text-lg">📍</span>
            <div>
              <p className="text-xs text-rose-200/50">Location</p>
              <p className="text-sm font-medium text-rose-100">{formData.selectedLocation || '—'}</p>
            </div>
          </div>

          {/* Meal Type */}
          <div className="flex items-start gap-3">
            <span className="text-lg">🍽️</span>
            <div>
              <p className="text-xs text-rose-200/50">Meal Type</p>
              <p className="text-sm font-medium text-rose-100">{formData.selectedMeal || '—'}</p>
            </div>
          </div>

          {/* Food Items */}
          {selectedFood.length > 0 && (
            <div className="flex items-start gap-3">
              <span className="text-lg">🍛</span>
              <div>
                <p className="text-xs text-rose-200/50">Food Items</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {selectedFood.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-rose-500/10 px-2 py-0.5 text-[11px] text-rose-200/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Drinks */}
          {selectedDrinks.length > 0 && (
            <div className="flex items-start gap-3">
              <span className="text-lg">🥤</span>
              <div>
                <p className="text-xs text-rose-200/50">Drinks</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {selectedDrinks.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-purple-500/10 px-2 py-0.5 text-[11px] text-purple-200/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Validation Errors for previous steps */}
        {(fieldErrors.date || fieldErrors.location || fieldErrors.meal || fieldErrors.food) && (
          <div className="mt-3 rounded-xl bg-red-500/10 p-3">
            <p className="text-xs text-red-300">
              ⚠️ Missing selections — please go back and complete:
            </p>
            <ul className="mt-1 list-inside list-disc text-xs text-red-300/70">
              {fieldErrors.date && <li>Select a date</li>}
              {fieldErrors.location && <li>Select a location</li>}
              {fieldErrors.meal && <li>Select a meal type</li>}
              {fieldErrors.food && <li>Select at least one food item</li>}
            </ul>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="mt-3 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            id="confirm-back"
            onClick={onBack}
            className="btn-secondary px-6 py-3"
            disabled={loading}
          >
            ← Back
          </button>
          <motion.button
            id="confirm-submit"
            onClick={handleConfirm}
            disabled={loading}
            className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50"
            whileHover={loading ? {} : { scale: 1.03 }}
            whileTap={loading ? {} : { scale: 0.97 }}
          >
            {loading ? (
              <>
                <div className="spinner" />
                <span>Confirming... 💕</span>
              </>
            ) : (
              'Confirm Date ❤️'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
