export const DangerAlert = ({ alertMessage }: any) => {
    return (
        <>
            <div className="rounded-1 px-2 py-2 position-fixed dangerBackground alertMessage">
                {alertMessage}
            </div>
        </>
    )
}