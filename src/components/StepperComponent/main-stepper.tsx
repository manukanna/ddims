import React, { useRef } from 'react';
import './stylesStep.scss'

export function StepperComponent() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const NUMBER_OF_STEPS = 10;

    // Array of titles for each step
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

    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    const goToNextStep = () => {
        setCurrentStep((prev) => {
            const newStep = prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1;
            scrollToStep(newStep); // Scroll to the next step
            return newStep;
        });
    };

    const goToPreviousStep = () => {
        setCurrentStep((prev) => {
            const newStep = prev <= 0 ? prev : prev - 1;
            scrollToStep(newStep); // Scroll to the previous step
            return newStep;
        });
    };

    const activeColor = (index: any) => currentStep >= index ? 'bg-blue-500' : 'bg-gray-300';
    const isFinalStep = (index: any) => index === NUMBER_OF_STEPS - 1;
    const checkedStatus = (index: any) => currentStep >= index ? 
        <span className="material-symbols-outlined text-white">check</span> : 
        <span className="material-symbols-outlined text-white">radio_button_unchecked</span>;

    // Scroll to the specific step
    const scrollToStep = (step: number) => {
        if (stepRefs.current[step]) {
            stepRefs.current[step]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center', // Center the active step
                inline: 'center', // Ensure it scrolls horizontally
            });
        }
    };

    return (
        <div>
            <div className='d-flex items-center'>
                <div>
                    <button
                        onClick={goToPreviousStep}
                        className="bg-blue-600 text-white rounded-md"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                </div>
                <div
                    className="stepper-content mx-3 flex items-center overflow-x-auto space-x-6 px-3 py-5"
                    style={{ maxWidth: '100%' }}
                >
                    {Array.from({ length: NUMBER_OF_STEPS }).map((_, index) => (
                        <React.Fragment key={index}>
                            {/* Step circle and title stacked vertically */}
                            <div className="flex flex-col items-center relative mx-0">
                                {/* Step Circle */}
                                <div
                                    ref={(el: any) => (stepRefs.current[index] = el)}
                                    className={`w-7 h-7 rounded-full ${activeColor(index)} flex items-center justify-center`}
                                    style={{ flexShrink: 0, position: 'relative' }}
                                >
                                    {checkedStatus(index)}
                                </div>

                                {/* Step Title */}
                                <div className="text-center text-sm mt-2" style={{ position: 'absolute', top: '100%' }}>
                                    {stepTitles[index]}
                                </div>
                            </div>

                            {/* Line between steps */}
                            {isFinalStep(index) ? null : (
                                <div
                                    className={`w-40 h-1 px-0 mx-0 ${activeColor(index + 1)}`}
                                    style={{ flexShrink: 0 }}
                                ></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div>
                    <button
                        onClick={goToNextStep}
                        className="bg-blue-600 text-white rounded-md"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
