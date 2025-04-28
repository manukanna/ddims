import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { ValidateInputFields } from "../../CommonUtilis/validationOfInputFields";
import { DangerAlert } from "../../CommonComponents/alert_component/Alert_Component";

export const UserSubmittingForm = () => {
    const verifySurveyData = useRef(true);
    const [submittedForm, setsubmittedForm] = useState(false);
    const [showErrorMessage, setshowErrorMessage] = useState({ showAlert: false, message: '', alertBgColor: '' })
    const [surveyForm, setsurveyForm]: any = useState({
        surveyFormGeneral: [
            { label: "R-Number", value: '', name: 'rNumber' },
            { label: "Site Address", value: '', name: 'siteAddress' },
            { label: "Postcode", value: '', name: 'postcode' },
            { label: "City", value: '', name: 'city' },
            { label: "Region", value: '', name: 'region' },
        ],
        surveyFormDetails: [
            { label: "POP-PN-SN", value: '', name: 'poppnsn' },
            { label: "DPID", value: '', name: 'dipd' },
            { label: "PIANOI#", value: '', name: 'pianoi' },
            { label: "Pre-Survey-Planner", value: '', name: 'preSurveyPlanner' },
            { label: "Surveyor", value: '', name: 'surveyor' },
            { label: "Planner", value: '', name: 'planner' },
        ],
        surveyFormfiles: [
            { label: 'Building Image One', value: '', name: 'buildingImageOne' },
            { label: 'Building Image Two', value: '', name: 'buildingImageTwo' },
        ]
    });
    const handleChangeSurveyForm = (e: any, changeType: string) => {
        const { name, files } = e.target;
        const updateSurveyForms = surveyForm[changeType].map((item: any) => {
            if (item.name === name && files) {
                return { ...item, value: files[0] };
            } else if (item.name === name) {
                return { ...item, value: e.target.value };
            } else {
                return item;
            }
        })
        setsurveyForm({ ...surveyForm, [changeType]: updateSurveyForms })
    }

    const handleDeleteImages = (deleteItem: any) => {
        const deleteImage = surveyForm.surveyFormfiles.map((item: any) => {
            if (item.name === deleteItem.name) {
                return { ...item, value: '' }
            } else {
                return item
            }
        });
        setsurveyForm({ ...surveyForm, surveyFormfiles: deleteImage })
    }

    const submitSurveyForm = async () => {
        if (submittedForm) {
            return alertMessageResponse({
                showAlert: true,
                message: `You have already submitted your Survey Details.`,
                alertBgColor: "dangerBackground",
            });
        } else {
            const userToken = Cookies.get('authToken');
            const formData: any = new FormData();
            const transformedData = Object.keys(surveyForm).reduce((acc: any, key: any) => {
                acc[key] = Object.fromEntries(surveyForm[key].map((item: any) => [item.name, item.value]));
                return acc;
            }, {});

            const missingAnyField =
                ValidateInputFields(transformedData.surveyFormGeneral) ||
                ValidateInputFields(transformedData.surveyFormDetails) ||
                ValidateInputFields(transformedData.surveyFormfiles);

            if (missingAnyField) {
                return alertMessageResponse({
                    showAlert: true,
                    message: `Please verify the ${missingAnyField} field`,
                    alertBgColor: "dangerBackground",
                });
            }

            //surveyFormDetails
            Object.keys(transformedData.surveyFormDetails).forEach(key => {
                formData.append(`surveyFormDetails[${key}]`, transformedData.surveyFormDetails[key]);
            });
            //surveyFormGeneral
            Object.keys(transformedData.surveyFormGeneral).forEach(key => {
                formData.append(`surveyFormGeneral[${key}]`, transformedData.surveyFormGeneral[key]);
            });
            //surveyFormfiles
            Object.keys(transformedData.surveyFormfiles).forEach(key => {
                formData.append(`surveyFormfiles[${key}]`, transformedData.surveyFormfiles[key]);
            });
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/submitSurveyForms', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    }
                });

                const result = await response.json();
                if (!response.ok) {
                    console.log("failed");
                } else {
                    setsubmittedForm(!submittedForm)
                    alertMessageResponse({
                        showAlert: true,
                        message: result.message,
                        alertBgColor: "successBackground",
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const alertMessageResponse = (alertMessageObj: { showAlert: boolean, message: string, alertBgColor: string }) => {
        setshowErrorMessage(alertMessageObj);
        setTimeout(() => {
            setshowErrorMessage({ showAlert: false, message: '', alertBgColor: '' })
        }, 5000);
    }


    const verifySurveyDetailsSubmitted = useCallback(async () => {
        if (verifySurveyData.current) {
            const userToken = Cookies.get('authToken');
            try {
                const url = process.env.REACT_APP_API_URL + '/verifySurveyDetails';
                const resposne = await fetch(url, {
                    method: "GET"
                    , headers: { 'Authorization': `Bearer ${userToken}` },
                }
                );
                const result: any = await resposne.json();
                if (!resposne.ok) {
                    alertMessageResponse({
                        showAlert: true,
                        message: result.message,
                        alertBgColor: "dangerBackground",
                    });
                } else {
                    if (!result.surveySumitted) {
                        if (result.surveyDetails) {
                            let surveyDetails: any = {
                                surveyFormDetails: result.surveyDetails.surveyFormDetails,
                                surveyFormGeneral: result.surveyDetails.surveyFormGeneral,
                                surveyFormfiles: result.surveyDetails.surveyFormfiles,
                            }

                            const filledForm = Object.keys(surveyForm).reduce((acc, section) => {
                                acc[section as keyof any] = surveyForm[section as keyof any].map((field: any) => ({
                                    ...field,
                                    value: surveyDetails[section as keyof any]?.[field.name] || '' // Populate value
                                }));
                                return acc;
                            }, {} as any);
                            setsurveyForm(filledForm);
                        }
                        alertMessageResponse({
                            showAlert: true,
                            message: result.message,
                            alertBgColor: "dangerBackground",
                        });
                        verifySurveyData.current = false;
                    } else {
                        setsubmittedForm(result.surveySumitted ? true : false)
                        verifySurveyData.current = false;
                    }
                }
            } catch (err: any) {
                alertMessageResponse({
                    showAlert: true,
                    message: err.message,
                    alertBgColor: "dangerBackground",
                });
            }
        }
    }, [surveyForm])

    useEffect(() => {
        verifySurveyDetailsSubmitted();
    }, [verifySurveyDetailsSubmitted])

    const getProperImage = (imageUrl: any) => {
        if (imageUrl.name) {
            return URL.createObjectURL(imageUrl)
        } else {
            return process.env.REACT_APP_API_URL + `/surveyImages/${imageUrl}`
        }
    }
    return (
        <>
            {!submittedForm ? <>
                <div className="shadow-md border p-3 rounded-sm mt-3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="shadow-md border p-3 rounded-sm">
                                <div className="text-fuchsia-900 text-center text-2xl mb-2">General</div>
                                {surveyForm.surveyFormGeneral.map((item: any, index: any) => {
                                    return (<div key={index} className="mb-2">
                                        <label className="text-gray-400 text-sm mb-1">{item.label}</label>
                                        <br />
                                        <input disabled={submittedForm} onChange={(e) => handleChangeSurveyForm(e, 'surveyFormGeneral')} placeholder={item.label} value={item.value} name={item.name} className={`w-100 border-2 border-gray-200 rounded-md px-3 py-[6px] ${submittedForm ? 'bg-gray-200' : 'bg-white '} `} />
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="shadow-md border p-3 rounded-sm">
                                <div className="text-fuchsia-900 text-center text-2xl mb-2">Survey Details</div>
                                {surveyForm.surveyFormDetails.map((item: any, index: any) => {
                                    return (<div key={index} className="mb-2">
                                        <label className="text-gray-400 text-sm mb-1">{item.label}</label>
                                        <br />
                                        <input disabled={submittedForm} onChange={(e) => handleChangeSurveyForm(e, 'surveyFormDetails')} placeholder={item.label} value={item.value} name={item.name} className={`w-100 border-2 border-gray-200 rounded-md px-3 py-[6px] ${submittedForm ? 'bg-gray-200' : 'bg-white '}`} />
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="shadow-md border p-3 rounded-sm">
                                <div className="text-fuchsia-900 text-center text-2xl mb-2">Survey Image</div>
                                {surveyForm.surveyFormfiles.map((item: any, index: any) => {
                                    return (
                                        <div key={index}>
                                            <label className="text-gray-400 text-sm mb-1">{item.label}</label>
                                            <br />
                                            {item.value ? <div className="relative">
                                                <span className={`${submittedForm ? 'opacity-50 pointer-events-none' : ''} absolute right-0.5 top-1 bg-gray-600 text-white h-6 rounded-xl cursor-pointer`} onClick={() => handleDeleteImages(item)}>
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </span>
                                                <img className="rounded-[1vw]" src={getProperImage(item.value)} alt="" />
                                                <br />
                                            </div> : <div key={index} className="mb-2">
                                                <input disabled={submittedForm} onChange={(e: any) => handleChangeSurveyForm(e, 'surveyFormfiles')} type="file" name={item.name} className='cursor-pointer py-1 px-2 w-45 bg-white border-2 border-gray-200 rounded-md' />
                                            </div>}
                                        </div>
                                    )

                                })}
                            </div>
                        </div>
                    </div>
                    <div className="text-center border-top pt-3 mt-5">
                        <button type="button" className="btn btn-primary me-3 btn-md" onClick={submitSurveyForm}>Submit</button> <button className="btn btn-secondary me-3 btn-md">Clear all Fields</button>
                    </div>
                </div>
                {showErrorMessage.showAlert && <DangerAlert alertMessage={showErrorMessage} />}
            </> :
                <div className="relative h-90">
                    <div className="text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sky-600 text-3xl">
                        Your application is under process. Please wait until you receive approval.
                    </div>
                </div>}
        </>
    )
}