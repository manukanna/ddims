import { useState } from "react"
import "./login.scss"
import { DangerAlert } from "../common_components/alert_component/Alert_Component"
export const Login = () => {
    const [userCreds, setUserCred] = useState({ name_email: '', password: '' })
    const [alertError, setalertError] = useState({ showAlert: false, alertMessage: '' });
    const [showHidePassword, setshowHidePassword] = useState(false);
    const hideShowPassword = () => {
        setshowHidePassword(!showHidePassword)
    }
    const userCredsChange = (e: { target: any }) => {
        setUserCred({ ...userCreds, [e.target.name]: e.target.value })
    }
    const submitUserCreds = () => {
        if ((userCreds.name_email === "") || (userCreds.password === "")) {
            setalertError({ showAlert: true, alertMessage: 'Please verify your Username or Password.' });
            setTimeout(() => {
                setalertError({ showAlert: false, alertMessage: '' });
            }, 2000);
        } else {
            console.log(userCreds)
        }
    }
    return (
        <>
            <div className="contaner login_component position-relative">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center align-items-center full_min_height">
                            <div className="login_box p-4 rounded text_center ">
                                <h3 className="my-2">Welcome Practice</h3>
                                <h6 className="mb-4 medium_font_size">Please Enter below Details to Experience</h6>
                                <div>
                                    <div className="input_parent w-100 my-2 text_starting">
                                        <label htmlFor="name_email">Username / Email*</label>
                                        <input onChange={userCredsChange} type="text" id="name_email" name="name_email" className="w-100 px-2 py-2 input_focus_none" autoComplete="off" />
                                    </div>
                                    <div className="input_parent my-2 text_starting position-relative">
                                        <label htmlFor="password">Password*</label>
                                        <input onChange={userCredsChange} type={showHidePassword ? 'text' : 'password'} id="password" name="password" className="w-100 ps-2 pe-5 py-2 input_focus_none" />
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
                                    <div className="create_account x_small_font_size">
                                        Don't have an account with Practice
                                        <span className="px-2 submit_color pointer">Create Account</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {alertError.showAlert && <DangerAlert alertMessage={alertError.alertMessage} />}
        </>
    )
}