import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProposalPage from './components/ProposalPage';
import DateStep from './components/DateStep';
import LocationStep from './components/LocationStep';
import MealStep from './components/MealStep';
import FoodStep from './components/FoodStep';
import ConfirmStep from './components/ConfirmStep';
import SuccessPage from './components/SuccessPage';
import ProgressBar from './components/ProgressBar';
import FloatingHearts from './components/FloatingHearts';
import SparkleParticles from './components/SparkleParticles';

const TOTAL_STEPS = 6;

const initialState = {
  selectedDate: '',
  selectedLocation: '',
  selectedMeal: '',
  selectedFoods: [],
};

export default function App() {
  const [step, setStep] = useState(0); // 0 = proposal, 1-5 = form steps, 6 = success
  const [formData, setFormData] = useState(initialState);

  const updateFormData = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetToHome = useCallback(() => {
    setStep(0);
    setFormData({
      selectedDate: '',
      selectedLocation: '',
      selectedMeal: '',
      selectedFoods: [],
      name: '',
      email: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient Background Glows */}
      <div
        className="ambient-glow"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(244,63,94,0.15), transparent 70%)',
          top: '-100px',
          right: '-100px',
        }}
      />
      <div
        className="ambient-glow"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)',
          bottom: '-50px',
          left: '-50px',
        }}
      />
      <div
        className="ambient-glow"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(244,63,94,0.1), transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Sparkle Particles */}
      <SparkleParticles />

      {/* Progress Bar */}
      {step >= 1 && step <= 5 && (
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS - 1} />
      )}

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <ProposalPage key="proposal" onYes={nextStep} />
            )}
            {step === 1 && (
              <DateStep
                key="date"
                value={formData.selectedDate}
                onChange={(val) => updateFormData('selectedDate', val)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 2 && (
              <LocationStep
                key="location"
                value={formData.selectedLocation}
                onChange={(val) => updateFormData('selectedLocation', val)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <MealStep
                key="meal"
                value={formData.selectedMeal}
                onChange={(val) => updateFormData('selectedMeal', val)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 4 && (
              <FoodStep
                key="food"
                value={formData.selectedFoods}
                onChange={(val) => updateFormData('selectedFoods', val)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 5 && (
              <ConfirmStep
                key="confirm"
                formData={formData}
                updateFormData={updateFormData}
                onSuccess={() => setStep(6)}
                onBack={prevStep}
              />
            )}
            {step === 6 && (
              <SuccessPage key="success" formData={formData} onBackToHome={resetToHome} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
