import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { createWhatsAppUrl } from '../utils/whatsappMessage';

const pageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export default function SuccessPage({ formData, onBackToHome }) {
  useEffect(() => {
    // Fire confetti celebration
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ['#f43f5e', '#e11d48', '#fda4af', '#a855f7', '#ec4899', '#fbbf24'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
    }, 500);
  }, []);

  const whatsappUrl = createWhatsAppUrl({
    selectedDate: formData.selectedDate,
    location: formData.selectedLocation,
    mealType: formData.selectedMeal,
    foods: formData.selectedFoods,
  });

  const formattedDate = formData.selectedDate
    ? new Date(formData.selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7, type: 'spring', stiffness: 150 }}
      className="text-center"
    >
      <div className="glass-strong rounded-3xl p-8 sm:p-10">
        {/* Celebration Emoji */}
        <motion.div
          className="mb-4 text-7xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          🎉
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="heading-romantic mb-3 font-script text-3xl font-bold sm:text-4xl"
          style={{
            background: 'linear-gradient(135deg, #fda4af, #fb7185, #f43f5e, #e879f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Date Confirmed Successfully ❤️
        </motion.h1>

        {/* Subtitle messages */}
        <motion.p
          className="mb-6 text-base text-rose-200/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Pratik is waiting for this special day!
        </motion.p>

        {/* Date Info */}
        {formData.selectedDate && (
          <motion.div
            className="mb-6 rounded-2xl bg-rose-500/10 p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-rose-300/60">Your date is on</p>
            <p className="mt-1 font-script text-xl font-semibold text-rose-200">
              {formattedDate}
            </p>
            <p className="mt-2 text-sm text-rose-300/50">
              📍 {formData.selectedLocation} · 🍽️ {formData.selectedMeal}
            </p>
          </motion.div>
        )}

        {/* Hearts row */}
        <motion.div
          className="mb-6 flex justify-center gap-2 text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {['💕', '💖', '💝', '💗', '💕'].map((h, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3">
          {/* WhatsApp Button */}
          <motion.a
            id="whatsapp-button"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all"
            style={{
              background: 'linear-gradient(135deg, #25d366, #128c7e)',
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, type: 'spring' }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message Pratik on WhatsApp ❤️
          </motion.a>

          {/* Back to Home Button */}
          <motion.button
            id="back-to-home"
            onClick={onBackToHome}
            className="btn-secondary mt-1 w-full max-w-xs px-8 py-3"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, type: 'spring' }}
          >
            🏠 Back to Home
          </motion.button>
        </div>

        <motion.p
          className="mt-6 text-xs text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Made with endless love by Pratik 💝
        </motion.p>
      </div>
    </motion.div>
  );
}
