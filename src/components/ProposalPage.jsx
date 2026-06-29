import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -40, scale: 0.95 },
};

const SWEET_MESSAGES = [
  "Haha, nice try! 😄",
  "You can't escape Pratik's charm! 💕",
  "Oops! The button ran away! 🏃‍♂️",
  "Are you sure about that? 🤔💗",
  "Pratik won't give up! 💪❤️",
  "That button has a mind of its own! 😜",
  "Come on, just say yes! 🥺💖",
];

const FINAL_MESSAGE = "Okay okay 😄 but Pratik is still waiting with hope ❤️";

export default function ProposalPage({ onYes }) {
  const [noTaps, setNoTaps] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [showFinal, setShowFinal] = useState(false);
  const containerRef = useRef(null);
  const noButtonRef = useRef(null);

  const moveNoButton = useCallback(() => {
    const container = containerRef.current;
    const button = noButtonRef.current;
    if (!container || !button) return;

    const padding = 20;
    const maxX = container.clientWidth - button.offsetWidth - padding;
    const maxY = container.clientHeight - button.offsetHeight - padding;

    const randomX = Math.floor(Math.random() * Math.max(maxX - padding, 1)) + padding;
    const randomY = Math.floor(Math.random() * Math.max(maxY - padding, 1)) + padding;

    setNoPosition({ x: randomX, y: randomY });
    setHasMoved(true);
  }, []);

  const handleNo = useCallback(() => {
    const newTaps = noTaps + 1;
    setNoTaps(newTaps);

    if (newTaps >= 7) {
      setShowFinal(true);
      setShowMessage(FINAL_MESSAGE);
    } else {
      setShowMessage(SWEET_MESSAGES[newTaps - 1] || SWEET_MESSAGES[0]);
      moveNoButton();
    }

    // Clear message after delay
    setTimeout(() => {
      if (newTaps < 7) setShowMessage('');
    }, 2000);
  }, [noTaps, moveNoButton]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 text-center"
    >
      {/* Decorative Heart */}
      <motion.div
        className="mb-6 text-7xl sm:text-8xl"
        animate={{
          scale: [1, 1.15, 1, 1.15, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      >
        💖
      </motion.div>

      {/* Main Card */}
      <div className="glass-strong rounded-3xl p-8 sm:p-10">
        <motion.h1
          className="heading-romantic mb-3 font-script text-3xl font-bold sm:text-4xl md:text-5xl"
          style={{
            background: 'linear-gradient(135deg, #fda4af, #fb7185, #f43f5e, #e879f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Will you go on a beautiful date with me? 
        </motion.h1>

        <motion.p
          className="mb-2 text-5xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          ❤️
        </motion.p>

        <motion.p
          className="mb-8 text-sm text-rose-200/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Take a deep breath and choose your answer...
        </motion.p>

        {/* Button Area — relative container for absolute No button */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{ minHeight: '360px' }}
        >
          {/* Yes Button — always centered at the top */}
          <div className="relative z-10 flex justify-center">
            <motion.button
              id="yes-button"
              type="button"
              className="btn-primary px-12 py-4 text-lg font-bold"
              onClick={onYes}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, type: 'spring' }}
              style={{
                background: 'linear-gradient(135deg, #f43f5e, #e11d48, #be123c)',
                boxShadow: '0 0 30px rgba(244, 63, 94, 0.4), 0 0 60px rgba(244, 63, 94, 0.2)',
              }}
            >
              Yes! 💕
            </motion.button>
          </div>

          {/* No Button — absolute positioned, moves around inside container */}
          {!showFinal && (
            <motion.button
              ref={noButtonRef}
              id="no-button"
              type="button"
              className="btn-secondary px-8 py-3 text-sm"
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                handleNo();
              }}
              onClick={(e) => {
                // Prevent double-fire on mobile (touchstart already handled it)
                if (e.detail === 0) return;
                handleNo();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                position: hasMoved ? 'absolute' : 'relative',
                left: hasMoved ? `${noPosition.x}px` : 'auto',
                top: hasMoved ? `${noPosition.y}px` : '20px',
                zIndex: 20,
                margin: hasMoved ? 0 : '0 auto',
                display: 'block',
                transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              No 😅
            </motion.button>
          )}
        </div>

        {/* Sweet Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.p
              className="mt-4 rounded-2xl bg-rose-500/10 px-6 py-3 font-script text-lg text-rose-300"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {showMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decoration */}
      <motion.p
        className="mt-6 text-xs text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Made with love by Pratik 💝
      </motion.p>
    </motion.div>
  );
}
