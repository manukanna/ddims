import { useEffect, useState } from 'react';
import './tabsContentStyles.scss'
export const SummaryComponent = () => {
    const [desktopView, setdesktopView] = useState(window.matchMedia("(min-width: 768px)").matches);
    const summaryInputFields = {
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
        ]
    }
    useEffect(() => {
        window.matchMedia("(min-width: 768px)").addEventListener("change", mobileViewAdjustMent);
    }, [desktopView]);
    const mobileViewAdjustMent = (e: any) => {
        setdesktopView(e.matches);
    };
    return (
        <>
            <div className='container-fluid px-1'>
                <div className='row'>
                    <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-8 col-sm-12 col-xs-12 mb-3'>
                        <div className='tab_content rounded-2 py-2 px-3'>
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
                                            <input className='textField py-1 rounded-1 px-2' name={item.name} placeholder={item.title} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-7'></div>
                    <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-8 col-sm-12 col-xs-12 mb-3'>
                        <div className='tab_content rounded-2 py-2 px-3'>
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
                                            <input className='textField py-1 rounded-1 px-2' name={item.name} placeholder={item.title} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-7'></div>
                    <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-8 col-sm-12 col-xs-12 mb-3'>
                        <div className='tab_content rounded-2 py-2 px-3'>
                            {summaryInputFields.plannerInputfields.map((item, index) => {
                                return (
                                    <div key={index} className={`${desktopView ? 'd-flex justify-content-between align-items-center mb-4' : 'mb-2'}`}>
                                        <div className='col-3'>
                                            <label>{item.title}</label>
                                        </div>
                                        <div className={`${desktopView ? 'col-9' : 'col-12 mt-1'}`}>
                                            <input className='textField py-1 rounded-1 px-2' name={item.name} placeholder={item.title} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}