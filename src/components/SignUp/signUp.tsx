import { useState } from "react";
import "../global_styles/loginSignUp.scss"
import { DangerAlert } from "../common_components/alert_component/Alert_Component"
import { SwitchLoginSignUpContent } from "../common_components/SwitchLoginSignUp/SwitchLoginSignUp"
import { ValidateInputFields } from "../common_Utilis/validationOfInputFields"
import { useDispatch } from "react-redux";
import { swicthLoginSignUpComponent, updateSignUpData } from "../Redux/ddimsSlice";
import { useNavigate } from "react-router-dom";

type PasswordsType = {
  [key: string]: boolean;
};
const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showHidePassword, setshowHidePassword] = useState<PasswordsType>({
    passwordEye: false,
    confirmPasswordEye: false
  });
  const [showErrorMessage, setshowErrorMessage] = useState({ showAlert: false, message: '', alertBgColor: '' })
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    catogery: "",
  });
  const handleChange = (e: { target: any }) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };
  const handleCreateAccount = (e: any) => {
    e.preventDefault();
    const missingInputField = ValidateInputFields(signUpDetails);
    if (missingInputField) {
      setshowErrorMessage({ showAlert: true, message: `Please verify the ${missingInputField} field`, alertBgColor: "dangerBackground" })
      setTimeout(() => {
        setshowErrorMessage({ showAlert: false, message: '', alertBgColor: '' });
      }, 2000);
    } else {
      setshowErrorMessage({ showAlert: true, message: `your account has been created successfully`, alertBgColor: "successBackground" })
      setTimeout(() => {
        setshowErrorMessage({ showAlert: false, message: '', alertBgColor: '' });
        dispatch(updateSignUpData(signUpDetails));
        dispatch(swicthLoginSignUpComponent(true));
        setSignUpDetails({
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          email: "",
          catogery: "",
        });
      }, 1500);
    }
  };

  const hideShowPassword = (passwordType:string) => {
    setshowHidePassword({...showHidePassword, [passwordType]:!showHidePassword[passwordType]})
}

  let passwordError;
  let confirmPasswordError;
  if (signUpDetails.password.length) {
    if (signUpDetails.password.length < 8) {
      passwordError = "Password should contain 8 Characters";
    } else {
      passwordError = "";
    }
  }
  if (signUpDetails.confirmPassword.length) {
    if (signUpDetails.confirmPassword !== signUpDetails.password) {
      confirmPasswordError = "Confirm Password should match with Password";
    } else {
      confirmPasswordError = "";
    }
  }
  return (
    <>
      <div className="contaner position-relative">
        <div className="loginSignUp_component">
          <div className="d-flex justify-content-center align-items-center full_min_height">
            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-11">
              <div className="loginSignUp_box p-4 rounded text_center ">
                <h3 className="my-2"> SignUp Page</h3>
                <h6 className="mb-4 medium_font_size">Please Enter below Details to Register</h6>
                <div>
                  <div className="input_parent w-100 my-2 text_starting">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="FirstName"
                      onChange={handleChange}
                      value={signUpDetails.firstName}
                      className="w-100 px-2 py-2 input_focus_none"
                      autoComplete="0ff"
                    />
                  </div>
                  <div className="input_parent mb-1 text_starting position-relative">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="LastName"
                      onChange={handleChange}
                      value={signUpDetails.lastName}
                      className="w-100 px-2 py-2 input_focus_none"
                      autoComplete="0ff"
                    />
                  </div>
                  <div className="input_parent mb-1 text_starting position-relative">
                    <input
                      type="text"
                      name="email"
                      autoComplete="off"
                      placeholder="email"
                      onChange={handleChange}
                      value={signUpDetails.email}
                      className="w-100 px-2 py-2 input_focus_none"
                    />
                  </div>
                  <div className="input_parent mb-1 text_starting position-relative">
                    <input
                      type={showHidePassword.passwordEye ? 'text' : "password"}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={signUpDetails.password}
                      className="w-100 px-2 py-2 input_focus_none"
                    />
                    <div className="password_icons position-absolute" onClick={() => hideShowPassword('passwordEye')}>
                      {showHidePassword.passwordEye ? <div><span className="icon_modify pointer material-symbols-outlined cursor">visibility</span></div>
                        : <div><span className="icon_modify material-symbols-outlined pointer">visibility_off</span></div>}
                    </div>
                    <div className='text-red-500 text-[10px]'>{passwordError}</div>
                  </div>
                  <div className="input_parent mb-1 text_starting position-relative">
                    <input
                      type={showHidePassword.confirmPasswordEye ? 'text' : "password"}
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="confirmPassword"
                      onChange={handleChange}
                      value={signUpDetails.confirmPassword}
                      className="w-100 px-2 py-2 input_focus_none"
                    />
                    <div className="password_icons position-absolute" onClick={() => hideShowPassword('confirmPasswordEye')}>
                      {showHidePassword.confirmPasswordEye ? <div><span className="icon_modify pointer material-symbols-outlined cursor">visibility</span></div>
                        : <div><span className="icon_modify material-symbols-outlined pointer">visibility_off</span></div>}
                    </div>
                    <div className='text-red-500 text-[10px]'>{confirmPasswordError}</div>
                  </div>
                  <div className="input_parent mb-1 text_starting position-relative">
                    <select
                      name="catogery"
                      onChange={handleChange}
                      value={signUpDetails.catogery}
                      className="border w-100 px-2 py-2 input_focus_none"
                    >
                      <option value=""> Select catogery</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                    </select>
                    <br />
                  </div>
                  <button disabled={!!passwordError || !!confirmPasswordError} type="submit" onClick={handleCreateAccount} className="btn btn-primary my-2 submitButton w-100 py-2 my-3">
                    Create
                  </button>
                  <SwitchLoginSignUpContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showErrorMessage.showAlert && <DangerAlert alertMessage={showErrorMessage} />}
    </>
  );
};
export default SignUpPage;
