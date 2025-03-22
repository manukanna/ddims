import { useEffect, useState } from 'react';
import './tabsContentStyles.scss'
import { TimeLimeComponent } from '../TimelineComponent/timeLine';

export const SummaryComponent = () => {
    const [desktopView, setdesktopView] = useState(window.matchMedia("(min-width: 768px)").matches);
    const [summaryInputFields, setsummaryInputFields] = useState({
        generalInputFields: [
            { title: "R-Number", value: '', name: 'rNumber' },
            { title: "Site Address", value: '', name: 'siteAddress' },
            { title: "Postcode", value: '', name: 'postcode' },
            { title: "City", value: '', name: 'city' },
            { title: "Region", value: '', name: 'region' },
        ],
        detailsInputfields: [
            { title: "PoP-PN-SN", value: '', name: 'rNumber' },
            { title: "DPID", value: '', name: 'dpid' },
            { title: "PIANOI#", value: '', name: 'pianoi#' },
        ],
        plannerInputfields: [
            { title: "Pre-Survey-PLanner", value: '', name: 'preSurveyPlanner' },
            { title: "Surveyor", value: '', name: 'suerveyor' },
            { title: "Planner", value: '', name: 'planner' },
        ],
        buldingImage: "",
        datesInputes: [
            { title: "Date Received", value: '', name: 'dateReceived' },
            { title: "Survey Assigned", value: '', name: 'surveyAssigned' },
            { title: "Survey Completed", value: '', name: 'surveyCompleted' },
            { title: "Site QC", value: '', name: 'siteQc' },
            { title: "QC Return", value: '', name: 'qcReturn' },
            { title: "upload", value: '', name: 'siteUpload' },
        ]
    })
    useEffect(() => {
        window.matchMedia("(min-width: 768px)").addEventListener("change", mobileViewAdjustMent);
    }, [desktopView]);
    const mobileViewAdjustMent = (e: any) => {
        setdesktopView(e.matches);
    };
    const changingBuildingImage = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setsummaryInputFields({ ...summaryInputFields, buldingImage: URL.createObjectURL(e.target.files[0]) })
        } else {
            setsummaryInputFields({ ...summaryInputFields, buldingImage: '' })
        }
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12'>
                        <div className='tab_content rounded-2 py-2 px-3 mb-3'>
                            <div className="tab_content_title mb-3">
                                General
                            </div>
                            {summaryInputFields.generalInputFields.map((item, index) => {
                                return (
                                    <div key={index} className={`${desktopView ? 'd-flex justify-content-between align-items-center mb-4' : 'mb-2'}`}>
                                        <div className='col-3'>
                                            <label>{item.title}</label>
                                        </div>
                                        <div className={`${desktopView ? 'col-9' : 'col-12 mt-1'}`}>
                                            <input className='textField py-1 rounded-1 px-2 bg-gray-200 h-8' name={item.name} placeholder={item.title} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='tab_content rounded-2 py-2 px-3 mb-3'>
                            <div className="tab_content_title mb-3">
                                Details
                            </div>
                            {summaryInputFields.detailsInputfields.map((item, index) => {
                                return (
                                    <div key={index} className={`${desktopView ? 'd-flex justify-content-between align-items-center mb-4' : 'mb-2'}`}>
                                        <div className='col-3'>
                                            <label>{item.title}</label>
                                        </div>
                                        <div className={`${desktopView ? 'col-9' : 'col-12 mt-1'}`}>
                                            <input className='textField py-1 rounded-1 px-2 bg-gray-200 h-8' name={item.name} placeholder={item.title} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='tab_content rounded-2 py-2 px-3 mb-3'>
                            {summaryInputFields.plannerInputfields.map((item, index) => {
                                return (
                                    <div key={index} className={`${desktopView ? 'd-flex justify-content-between align-items-center mb-4' : 'mb-2'}`}>
                                        <div className='col-3'>
                                            <label>{item.title}</label>
                                        </div>
                                        <div className={`${desktopView ? 'col-9' : 'col-12 mt-1'}`}>
                                            <input className='textField py-1 rounded-1 px-2 bg-gray-200 h-8' name={item.name} placeholder={item.title} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-xs-12'>
                        <div className='tab_content rounded-2 py-2 px-3 mb-3'>
                            <div className="tab_content_title mb-3">
                                Full Building Photo
                            </div>
                            <div className='building_image_upload'>
                                {summaryInputFields.buldingImage ?
                                    <div className='relative w-34'>
                                        <img className='rounded-[1vw] h-48' src={summaryInputFields.buldingImage} alt="" />
                                        <span className='absolute right-2 top-0 bg-white rounded-[1vw] h-6 cursor-pointer' onClick={changingBuildingImage}>
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </span>
                                    </div> :
                                    <input type="file" onChange={changingBuildingImage} className='cursor-pointer bg-gray-200 py-1 px-2 w-45 rounded-[0.5vw]' />}
                            </div>
                        </div>
                        <div className='tab_content rounded-2 py-2 px-3 mb-3'>
                            <div className="tab_content_title mb-3">
                                Dates
                            </div>
                            <div className='building_image_upload'>
                                {summaryInputFields.datesInputes.map((item, index) => {
                                    return (
                                        <div key={index} className='mb-2'>
                                            <div>
                                                <label>{item.title}</label>
                                            </div>
                                            <div className='mt-1'>
                                                <input type="date" name={item.name} className='cursor-pointer bg-gray-200 py-2 px-2 w-100 rounded-[0.5vw]' />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-xs-12'>
                        <div className='tab_content rounded-2 py-2 px-3 mb-3'>
                            <div className="tab_content_title mb-3">
                                Timeline
                            </div>
                            <div>
                                <TimeLimeComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}