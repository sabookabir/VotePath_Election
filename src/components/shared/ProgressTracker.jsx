import { motion } from "framer-motion";

export function ProgressTracker({ currentStep, totalSteps }) {
  const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between mb-2 text-sm font-medium text-slate-500">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
