import { useState } from "react"
import "../GlobalStyles/loginSignUp.scss"
import { SwitchLoginSignUpContent } from "../CommonComponents/SwitchLoginSignUp/SwitchLoginSignUp"
import { DangerAlert } from "../CommonComponents/alert_component/Alert_Component"
import { useDispatch } from "react-redux"
import { useAuth } from "../ProtectedContent/AuthContext";
import { expiryTokenData } from "../ProtectedContent/secureAuthentication"
import { loggedUserDetails } from "../Redux/ddimsSlice"

export const Login = () => {
    const dispatch = useDispatch();
    const { login } = useAuth()
    const [userCreds, setUserCred] = useState({ email: '', password: '' })
    const [alertError, setalertError] = useState({ showAlert: false, message: '', alertBgColor: '' });
    const [showHidePassword, setshowHidePassword] = useState(false);

    const hideShowPassword = () => {
        setshowHidePassword(!showHidePassword)
    }
    const userCredsChange = (e: { target: any }) => {
        setUserCred({ ...userCreds, [e.target.name]: e.target.value })
    }
    const submitUserCreds = () => {
        if ((userCreds.email === "") || (userCreds.password === "")) {
            alertMessageResponse({ showAlert: true, message: 'Please verify your Username or Password.', alertBgColor: 'dangerBackground' })
        } else {
            loginUser()
        }
    }

    const loginUser = async () => {
        const registyerUrl = process.env.REACT_APP_API_URL+'/login';
        try {
            const response = await fetch(registyerUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userCreds),
            });
            const res = await response.json();
            if (!response.ok) {
                const message = res.error;
                alertMessageResponse({ showAlert: true, message, alertBgColor: "dangerBackground" });
                setTimeout(() => {
                    alertMessageResponse({ showAlert: false, message: "", alertBgColor: "" });
                }, 1500);
                return;
            } else {
                expiryTokenData(res?.uniqueToken);
                login();
                dispatch(loggedUserDetails(res.userDetails))
            }
        } catch (error: any) {
            alertMessageResponse({ showAlert: true, message: "Something went wrong. Please try again.", alertBgColor: "dangerBackground", });
        }
    };

    const alertMessageResponse = (alertMessageObj: { showAlert: boolean, message: string, alertBgColor: string }) => {
        setalertError(alertMessageObj);
        setTimeout(() => {
            setalertError({ showAlert: false, message: '', alertBgColor: '' })
        }, 2000);
    }
    return (
        <>
            <div className="contaner position-relative">
                <div className="loginSignUp_component">
                    <div className="d-flex justify-content-center align-items-center full_min_height">
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-11">
                            <div className="loginSignUp_box p-4 rounded text_center ">
                                <h3 className="my-2">Welcome DDIMS</h3>
                                <h6 className="mb-4 medium_font_size">Please Enter below Details to Experience</h6>
                                <div>
                                    <div className="input_parent w-100 my-2 text_starting">
                                        {/* <label htmlFor="email">Username / Email*</label> */}
                                        <input placeholder="Username / Email" autoComplete="off" onChange={userCredsChange} value={userCreds.email} type="text" id="email" name="email" className="w-100 px-2 py-2 input_focus_none" />
                                    </div>
                                    <div className="input_parent my-2 text_starting position-relative">
                                        {/* <label htmlFor="password">Password*</label> */}
                                        <input placeholder="Password" autoComplete="new-password" onChange={userCredsChange} value={userCreds.password} type={showHidePassword ? 'text' : 'password'} id="password" name="password" className="w-100 ps-2 pe-5 py-2 input_focus_none" />
                                        <div className="password_icons position-absolute" onClick={hideShowPassword}>
                                            {showHidePassword ? <div><span className="icon_modify pointer material-symbols-outlined cursor">visibility</span></div>
                                                : <div><span className="icon_modify material-symbols-outlined pointer">visibility_off</span></div>}
                                        </div>
                                    </div>
                                    <div className="forgot_password text_end pointer text-decoration-underline">Forgot Password</div>
                                    <div className="btn btn-primary my-2 submitButton w-100 py-2 my-3" onClick={submitUserCreds}>Login Practice</div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <hr className="w-50" />
                                        <span className="px-2 small_font_size">or</span>
                                        <hr className="w-50" />
                                    </div>
                                    <SwitchLoginSignUpContent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {alertError.showAlert && <DangerAlert alertMessage={alertError} />}
        </>
    )
}