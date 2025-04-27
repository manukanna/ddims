import { HeaderComponent } from "../HeaderComponent/headerComponent"
import { UsersSubmittedData } from "./submittedData/submittedUsersData"

export const AdminComponents = () => {
    return (
        <>
        <div className="px-2">
        <HeaderComponent/>
        <UsersSubmittedData/>
        </div>
        </>
    )
}