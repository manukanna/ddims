import { HeaderComponent } from "../HeaderComponent/headerComponent"
import { UsersSubmittedData } from "./submittedData/submittedUsersData"
// import Accordion from "./submittedData/submittedAccordionsData"

export const AdminComponents = () => {
    return (
        <>
        <div className="px-2">
        <HeaderComponent/>
        {/* <Accordion/> */}
        <UsersSubmittedData/>
        </div>
        </>
    )
}