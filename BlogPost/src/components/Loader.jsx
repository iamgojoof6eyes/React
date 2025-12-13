import { Spinner } from "@/components/ui/spinner"

function Loader({color = "text-blue-500", label="Please wait", size="6"}) {
    return (
        <div className="flex justify-center items-center gap-4">
            <Spinner className={`size-${size} text-xl ${color}`} />
            {label && <span className={`${color} font-bold`}>{label}</span>}
        </div>
    )
}

export default Loader
