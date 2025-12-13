
function OverLay({ message, children, textColor="text-red-500" }) {
    return (
        <div className="fixed inset-0 bg-black/85 flex items-center flex-col justify-center z-50">
            {children}
            <p className={`text-2xl font-semibold mt-6 ${textColor}`}>{message}</p>
        </div>
    )
}

export default OverLay
