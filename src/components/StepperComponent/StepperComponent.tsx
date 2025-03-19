import React, { useRef, useState } from 'react';
import "./styles.scss"

export const StepperComponent = () => {
    const [currentStep, setCurrentStep] = useState(1);
  const [finished, setFinished] = useState(false); // Track if the process is finished
  const [waiting, setWaiting] = useState(false); // Track waiting state after clicking Finish
  const totalSteps = 10;

  const stepperRef = useRef<HTMLDivElement>(null);

  const stepTitles = [
    "Personal Info",
    "Contact Info",
    "Phone Number",
    "Address",
    "Confirmation",
    "Address Book",
    "Schedule",
    "Payment",
    "User Verification",
    "Finish"
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      scrollToStepIfNeeded(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      scrollToStepIfNeeded(newStep);
    }
  };

  const handleFinish = () => {
    setFinished(true); // Mark as finished
    setCurrentStep(totalSteps); // Go directly to the last step
    // Disable the Finish button and start waiting for 5 seconds before resetting
    setWaiting(true);

    setTimeout(() => {
      setFinished(false);
      setCurrentStep(1); // Restart the process
      setWaiting(false); // Allow next steps after waiting
    }, 5000); // Wait for 5 seconds before restarting
  };

  const scrollToStepIfNeeded = (step: number) => {
    const stepElement = document.getElementById(`step-${step}`);
    if (stepElement && stepperRef.current) {
      const stepRect = stepElement.getBoundingClientRect();
      const containerRect = stepperRef.current.getBoundingClientRect();
      // If the step is not visible within the container, scroll it into view
      if (stepRect.left < containerRect.left || stepRect.right > containerRect.right) {
        stepperRef.current.scrollTo({
          left: stepElement.offsetLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  const renderStepContent = () => {
    return <div>Step {currentStep}: {stepTitles[currentStep - 1]}</div>;
  };

  return (
    <div className="stepper-container">
      <div className="stepper">
        <div className="stepper-progress" ref={stepperRef}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <div className="step-item" key={index} id={`step-${index + 1}`}>
              <div
                className={`step-circle 
                  ${index + 1 === currentStep ? 'active' : ''} 
                  ${index + 1 < currentStep ? 'completed' : ''} 
                  ${finished && index + 1 === totalSteps ? 'completed' : ''}`} // If finished, mark the last step as completed
              >
                {index + 1 < currentStep || (finished && index + 1 === totalSteps) ? (
                  <span className="material-symbols-outlined check-icon">check_circle</span>
                ) : (
                  <span className="material-symbols-outlined">radio_button_unchecked</span>
                )}
              </div>
              <div className={`step-title ${index + 1 === currentStep ? 'active' : ''}`}>
                {stepTitles[index]}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`step-line ${
                    index + 1 < currentStep || (finished && index + 1 === totalSteps) ? 'completed' : ''
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="step-content">{renderStepContent()}</div>
      </div>

      {/* Fixed Navigation Buttons */}
      <button 
        onClick={handleBack} 
        disabled={currentStep === 1 || finished || waiting} 
        className="nav-button prev-button"
      >
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </button>

      {/* Next or Finish Button */}
      {currentStep < totalSteps ? (
        <button 
          onClick={handleNext} 
          disabled={currentStep === totalSteps || finished || waiting} 
          className="nav-button next-button"
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      ) : (
        <button 
          onClick={handleFinish} 
          disabled={waiting} // Disable finish button when waiting for 5 seconds
          className="nav-button finish-button"
        >
          Finish
        </button>
      )}
    </div>
  );
};
