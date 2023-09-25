import { useState } from 'react';
import { handleSignup } from '../../service/api/auth';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { User } from '../../types/Users';

export const SignUp = () => {
  const [data, setData] = useState<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    telephones_attributes: [],
    addresses_attributes: []
  });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = async (values: User) => {
    try {
      await handleSignup(values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextStep = (newData: User, final = false) => {
    setData(prev => ({ ...prev, ...newData }));
    console.log(data);
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} data={data} />
  ];

  return <div>{steps[currentStep]}</div>;
};

export interface StepProps {
  next: (values: User, final?: boolean) => void;
  prev?: (values: User) => void;
  data: User;
}
