import React, { useState } from 'react';
import './tabsStyles.scss'; // Make sure to include the CSS file for styling.
import { SummaryComponent } from "../TabsComponents/summaryComponent";
import { PreSurveyComponent } from '../TabsComponents/preSurveyComponent';
import { DesignComponent } from '../TabsComponents/desginComponent';
import { DetailsComponent } from '../TabsComponents/detailsComponent';
import { BackgroundProcessComponent } from '../TabsComponents/backgroundProcessComponent';
import { SurveyComponent } from '../TabsComponents/surveyComponent';

export const SurveyTabs = () => {
    const [activeTab, setActiveTab] = useState(0); // Track the active tab index

    const tabs = [
      { title: 'Summary', content: 'This is the content of Tab 1.' },
      { title: 'Pre-Survey', content: 'This is the content of Tab 2.' },
      { title: 'Survey', content: 'This is the content of Tab 3.' },
      { title: 'Design', content: 'This is the content of Tab 4.' },
      { title: 'Details', content: 'This is the content of Tab 4.' },
      { title: 'Background Process', content: 'This is the content of Tab 4.' },
    ];
  
    // Handle changing active tab when dropdown selection changes
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveTab(Number(e.target.value));
    };
  
    const getTabContent = (activeTab:number) => {
      switch (activeTab) {
        case 0:
          return <SummaryComponent/>;
        case 1:
          return <PreSurveyComponent/>;
        case 2:
          return <SurveyComponent/>;
        case 3:
          return <DesignComponent/>;
        case 4:
          return <DetailsComponent/>;
        default:
          return <BackgroundProcessComponent/>;
      }
    }
    return (
      <div className="tabs-container">
        {/* Tabs Header for Desktop */}
        <div className="tabs-header mb-3">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-header ${index === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
  
        {/* Tabs Dropdown for Mobile */}
        <select
          className="tabs-dropdown mb-3"
          value={activeTab}
          onChange={handleSelectChange}
        >
          {tabs.map((tab, index) => (
            <option key={index} value={index}>
              {tab.title}
            </option>
          ))}
        </select>
  
        <div className="tab-content">
          <div>{getTabContent(activeTab)}</div>
        </div>
      </div>
    );
  };

