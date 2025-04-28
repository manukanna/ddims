import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { DangerAlert } from "../../CommonComponents/alert_component/Alert_Component";

const submittedSurveyTitles = ['R-Number', 'Site Address', 'Postcode', 'City', "Region", 'POP-PN-SN', 'DPID', 'PIANOI', 'Pre-Survey-Planner', 'Surveyor', 'Planner', 'Image One', 'Image Two', 'Reject Action', 'Apporve Action']

export const UsersSubmittedData = () => {

    const [showErrorMessage, setshowErrorMessage] = useState({ showAlert: false, message: '', alertBgColor: '' })
    const [allSurveysData, setallSurveysData] = useState([]);

    useEffect(() => {
        const fetchAllSurveysList = async () => {
            const token = Cookies.get('authToken');
            const url = process.env.REACT_APP_API_URL + '/submittedSurveysList';
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                const result = await response.json();
                if (!response.ok) {
                    console.log("aaa");
                } else {
                    setallSurveysData(result.submittedSurveys)
                    alertMessageResponse({
                        showAlert: true,
                        message: result.message,
                        alertBgColor: "successBackground",
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllSurveysList();
    }, [])

    const alertMessageResponse = (alertMessageObj: { showAlert: boolean, message: string, alertBgColor: string }) => {
        setshowErrorMessage(alertMessageObj);
        setTimeout(() => {
            setshowErrorMessage({ showAlert: false, message: '', alertBgColor: '' })
        }, 5000);
    }

    const approveRejectSurvey = async (surveyData: any, updateSurvey: string) => {

        const token = Cookies.get('authToken');
        const url = process.env.REACT_APP_API_URL + '/approve-reject-survey';
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: surveyData.createdBy,
                    email: surveyData.createdEmail,
                    surveyId: surveyData._id,
                    [updateSurvey]: updateSurvey === "approveSurvey" ? true : false
                })
            });
            const result = await response.json();

            if (!response.ok) {
                console.log("Error");
            } else {
                const changeKeyValue = updateSurvey === 'approveSurvey' ? 'approvedSurvey' : 'submittedSurvey';
                const updateSurveyData: any = allSurveysData.map((item: any) => {
                    if (item.createdEmail === surveyData.createdEmail) {
                        return { ...item, [changeKeyValue]: !item[changeKeyValue] }
                    } else {
                        return item;
                    }
                })
                setallSurveysData(updateSurveyData)
                alertMessageResponse({
                    showAlert: true,
                    message: result.message,
                    alertBgColor: "successBackground",
                });
            }
        } catch (err) {
            console.log(err);

        }
    }
    return (
        <>
            {allSurveysData.length ? <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {submittedSurveyTitles.map((item, index) => (<th key={index} scope="col" className="px-6 py-3">{item}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {allSurveysData.map((item: any, index: any) => {
                                return (<tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.rNumber}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.siteAddress}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.postcode}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.city}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.region}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.poppnsn}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.dipd}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.pianoi}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.preSurveyPlanner}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.surveyor}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.planner}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img src={process.env.REACT_APP_API_URL + `/surveyImages/${item.buildingImageOne}`} alt="" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <img src={process.env.REACT_APP_API_URL + `/surveyImages/${item.buildingImageTwo}`} alt="" />
                                    </td>
                                    <td className="px-6 py-4">
                                        {!item.submittedSurvey ? <button className={` font-medium text-red-600 dark:text-blue-500 hover:underline`}>
                                            Survey Rejected
                                        </button> :
                                            <button onClick={() => approveRejectSurvey(item, 'rejectSurvey')} className={`${item.approvedSurvey && 'opacity-50 pointer-events-none'} font-medium text-red-600 dark:text-blue-500 hover:underline`}>
                                                Reject Survey
                                            </button>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.approvedSurvey ? <button className="font-medium text-sucess-600 dark:text-blue-500 hover:underline">
                                            Survey Approved
                                        </button> :
                                            <button onClick={() => approveRejectSurvey(item, 'approveSurvey')} className={`${!item.submittedSurvey && 'opacity-50 pointer-events-none'} font-medium text-blue-600 dark:text-blue-500 hover:underline`}>
                                                Approve Survey
                                            </button>}
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </> :

                <div className="relative h-90">
                    <div className="text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sky-600 text-3xl">
                        You do not have any applications to Approve or Reject
                    </div>
                </div>}
            {showErrorMessage.showAlert && <DangerAlert alertMessage={showErrorMessage} />}
        </>
    )
}