import React, { useState, useRef } from "react";
import "./stylesStep.scss";
import { SurveyTabs } from './SurveyTabs';

export const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 12;

  // Titles for the steps
  const stepTitles = [
    "Received",
    "Pre Survey",
    "Pre Survey Complete",
    "Survey",
    "Survey Complete",
    "Desgin",
    "Design Started",
    "Int QC",
    "QC Fix(Int)",
    "Site QC",
    "QC Fix(Sitec)",
    "Uploaded",
  ];

  // Use ref with correct type
  const stepperRef = useRef<HTMLDivElement>(null);

  // Handling "Next" button click
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      scrollToStep(currentStep + 1);
    }
  };

  // Handling "Previous" button click
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToStep(currentStep - 1);
    }
  };

  // Scroll the stepper to the specific step
  const scrollToStep = (step: number) => {
    const stepElement = document.getElementById(`step-${step}`);
    if (stepElement && stepperRef.current) {
      const stepRect = stepElement.getBoundingClientRect();
      const containerRect = stepperRef.current.getBoundingClientRect();
      // Check if the step is within the visible area and scroll if necessary
      if (
        stepRect.left < containerRect.left ||
        stepRect.right > containerRect.right
      ) {
        stepperRef.current.scrollTo({
          left:
            stepElement.offsetLeft - (containerRect.width - stepRect.width) / 2,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <div className="stepper-container position-relative">
        <div className="d-flex align-items-center top-0 start-0 mt-3 ms-4 side-details">
          <div className="site-id rounded-5 p-1 px-2 me-2">R-</div>
          <div className="site-data">
            R-0398437<span className="ms-2">Saved</span>
          </div>
        </div>
        <div className="text-center mb-2">
          <strong>S & D Process</strong>
          <div>Active for 65 days</div>
        </div>
        <div className="stepper-navigation rounded-top">
          {/* Previous Button */}
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="nav-button prev-button"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Stepper Progress */}
          <div className="stepper-progress" ref={stepperRef}>
            {stepTitles.map((title, index) => (
              <div
                key={index}
                className={`step-item ${
                  index + 1 === currentStep ? "active" : ""
                }`}
                id={`step-${index + 1}`}
              >
                <div className="step-circle">{index + 1}</div>
                <div className="step-title">{title}</div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className="nav-button next-button"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="container-fluid tabs-details rounded-bottom m-0 p-0">
            <SurveyTabs/>
        </div>
      </div>
    </>
  );
};
