import { HeaderComponent } from "../HeaderComponent/headerComponent"
import { UserSubmittingForm } from "./UserSubmittingDataDForms/submittingForm"

export const UserComponents = () => {
    return (
        <>
            <div className="px-2">
                <HeaderComponent />
                <UserSubmittingForm />
            </div>
        </>
    )
}