import { motion } from 'framer-motion';

const stepLabels = ['Date', 'Location', 'Meal', 'Food', 'Confirm'];

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-2">
      <div className="mx-auto max-w-lg">
        {/* Step indicators */}
        <div className="mb-2 flex justify-between">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex flex-col items-center">
              <motion.div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-500 ${
                  i + 1 <= currentStep
                    ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30'
                    : i + 1 === currentStep + 1
                    ? 'border-2 border-rose-400/50 text-rose-300 bg-rose-500/10'
                    : 'border border-white/10 text-white/30 bg-white/5'
                }`}
                initial={false}
                animate={
                  i + 1 <= currentStep
                    ? { scale: [1, 1.2, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.4 }}
              >
                {i + 1 <= currentStep ? '✓' : i + 1}
              </motion.div>
              <span
                className={`mt-1 text-[10px] transition-colors duration-300 ${
                  i + 1 <= currentStep
                    ? 'text-rose-300'
                    : 'text-white/30'
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="progress-bar-fill h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
