import { Login } from "../../Login/login";
import SignUpPage from "../../SignUp/signUp";
import { useDispatch, useSelector } from "react-redux";
import { swicthLoginSignUpComponent } from "../../Redux/ddimsSlice";

export const SwitchLoginSignUpContent = () => {
    const dispatch = useDispatch()
    const { switchLoginSignUp } = useSelector((state: any) => state.swicthLoginSignUpComponent);
    const handleSwitchLoginSignUp = () => {
        dispatch(swicthLoginSignUpComponent(switchLoginSignUp));
    }
    return (<>
        <div className="create_account x_small_font_size">
            {switchLoginSignUp ? "Don't" : "You"} have an account with DDIMS
            <span onClick={handleSwitchLoginSignUp} className="px-2 submit_color pointer">{switchLoginSignUp ? 'Create Account' : 'Login'}</span>
        </div>
    </>)
}

export const SwitchLoginSignUpComponent = () => {
    const { switchLoginSignUp } = useSelector((state: any) => state.swicthLoginSignUpComponent);
    return (
        <>
            {switchLoginSignUp ? <Login /> : <SignUpPage />}
        </>
    )
}


