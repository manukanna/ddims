import { useState } from "react";
import "../global_styles/loginSignUp.scss"
import { DangerAlert } from "../common_components/alert_component/Alert_Component"
import { SwitchLoginSignUpContent } from "../common_components/SwitchLoginSignUp/SwitchLoginSignUp" 
import { ValidateInputFields } from "../common_Utilis/validationOfInputFields"
const SignUpPage = () => {
  const [showErrorMessage, setshowErrorMessage] = useState({ showAlert: false, alertMessage: '' })
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    catogery: "",
  });
  // const [createAccount, setCreateAccount] = useState(false);
  const handleChange = (e: { target: any }) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };
  const handleCreateAccount = (e: any) => {
    e.preventDefault();
    const missingInputField = ValidateInputFields(signUpDetails);
    if (missingInputField) {
      setshowErrorMessage({ showAlert: true, alertMessage: `Please verify the ${missingInputField} field` })
      setTimeout(() => {
        setshowErrorMessage({ showAlert: false, alertMessage: '' });
      }, 2000);
    } else {
      // setCreateAccount(true);
      setSignUpDetails({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: "",
        catogery: "",
      });
    }
  };

  return (
    <>
      <div className="contaner loginSignUp_component position-relative">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center full_min_height">
            <div className="col-5">
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
                    />
                    <br />
                  </div>
                  <div className="input_parent my-2 text_starting position-relative">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="LastName"
                      onChange={handleChange}
                      value={signUpDetails.lastName}
                      className="w-100 px-2 py-2 input_focus_none"
                    />
                    <br />
                  </div>
                  <div className="input_parent my-2 text_starting position-relative">
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      value={signUpDetails.email}
                      className="w-100 px-2 py-2 input_focus_none"
                    />
                    <br />
                  </div>
                  <div className="input_parent my-2 text_starting position-relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={signUpDetails.password}
                      className="w-100 px-2 py-2 input_focus_none"
                    />
                    <br />
                  </div>
                  <div className="input_parent my-2 text_starting position-relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="confirmPassword"
                      onChange={handleChange}
                      value={signUpDetails.confirmPassword}
                      className="w-100 px-2 py-2 input_focus_none"
                    />
                    <br />
                  </div>
                  <div className="input_parent my-2 text_starting position-relative">
                    <select
                      name="catogery"
                      onChange={handleChange}
                      value={signUpDetails.catogery}
                      className="w-100 px-2 py-2 input_focus_none"
                    >
                      <option value=""> Select catogery</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                    </select>
                    <br />
                  </div>
                  <button type="submit" onClick={handleCreateAccount} className="btn btn-primary my-2 submitButton w-100 py-2 my-3">
                    Create
                  </button>
                  <SwitchLoginSignUpContent/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showErrorMessage.showAlert && <DangerAlert alertMessage={showErrorMessage.alertMessage} />}
    </>
  );
};
export default SignUpPage;
