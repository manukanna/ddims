import React, { useRef } from 'react';
import './stylesStep.scss'
import { SurveyTabs } from './SurveyTabs';
import { MenuDropdown } from '../CommonComponents/MenuComponent/menuComponent';

export function StepperComponent() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const NUMBER_OF_STEPS = 12;

    // Array of titles for each step
    const stepTitles = [
        "Received",
        "Pre-Survey",
        "Pre-Survey Completed",
        "Survey",
        "Survey Complete",
        "Design",
        "Design Started",
        "Int QC",
        "QC Fix(Int)",
        "Site QC",
        "QC Fix (Sitec)",
        "Uploaded",
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

    const activeColor = (index: any) => currentStep === index ? 'bg-fuchsia-900' : 'bg-gray-300';
    const activeColorTitle = (index: any) => currentStep === index ? 'text-fuchsia-900' : 'text-gray-600';
    const isFinalStep = (index: any) => index === NUMBER_OF_STEPS - 1;
    // const checkedStatus = (index: any) => currentStep >= index ?
    //     <span className="material-symbols-outlined text-white">check</span> :
    //     <span className="material-symbols-outlined text-white">radio_button_unchecked</span>;

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
        <div className='container-fluid'>
            <div className='totalComponent px-3 my-2'>
                <div className='flex justify-center'>
                    <div className='text-center'>
                        <div className='font-bold underline underline-offset-8'>S&D Process</div>
                        <div className='font-bold text-xs mt-2 text-center'>R-0398437  <span className='font-normal text-[8px] text-center'>MDU Site</span></div>   
                    </div>
                    <div className='absolute right-4 top-3'>
                        <MenuDropdown />
                    </div>
                </div>
                <div className='d-flex items-center'>
                    <div className='-mt-8'>
                        <button
                            onClick={goToPreviousStep}
                            className="bg-fuchsia-900 text-white rounded-md h-6"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                    </div>
                    <div
                        className="stepper-content mx-3 flex items-center overflow-x-auto space-x-6 px-3 pb-5 pt-2"
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
                                        <span className="material-symbols-outlined text-white">radio_button_unchecked</span>
                                    </div>

                                    {/* Step Title */}
                                    <div className={`text-center text-sm mt-2 w-30 ${activeColorTitle(index)}`} style={{ position: 'absolute', top: '100%' }}>
                                        {stepTitles[index]}
                                    </div>
                                </div>

                                {/* Line between steps */}
                                {isFinalStep(index) ? null : (
                                    <div
                                        className={`w-40 h-1 px-0 mx-0 bg-gray-300`}
                                        style={{ flexShrink: 0 }}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className='-mt-8'>
                        <button
                            onClick={goToNextStep}
                            className="bg-fuchsia-900 text-white rounded-md h-6"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
                <div>
                    <SurveyTabs />
                </div>
            </div>
        </div>
    );
}
