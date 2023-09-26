import { useState } from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';

export const PasswordRecovery = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <StepOne onSuccess={handleNextStep} />}
      {step === 2 && <StepTwo />}
    </>
  );
};
