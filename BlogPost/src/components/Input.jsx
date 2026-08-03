import { Eye, EyeOff } from 'lucide-react'
import { useId, useState } from 'react'

function Input(
        {
            label,
            type = "text",
            className = "",
            ...props
        },
        ref
    ) {
        const id = useId()
        const isPassField = (type === "Password")
        const [isVisible, setIsVisible] = useState(false)

        const handleClick = (e) => {
            e.preventDefault()
            setIsVisible(!isVisible)
            document.querySelector(`#${id}`)?.focus()
        }   

        if (isPassField) type = ((isPassField) && (!isVisible)) ? "Password" : "text"

        return (
            <div className='w-full'>
                {
                    label && <label className='inline-block pl-1 mb-1' htmlFor={id}>
                        {label}
                    </label>
                }
                <div className='flex'>
                    <input 
                    type={type}
                    className={`px-3 py-2 ${isPassField ? 'rounded-l-lg' : 'rounded-lg'} bg-gray-300 dark:bg-gray-500 outline-none duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full ${isPassField ? 'peer': ''} ${className}`}
                    {...props}
                    id={id}
                    />
                    {
                        isPassField && <button className={`p-2 justify-items-center items-center shadow-xl shadow- transition-colors duration-200 rounded-r-lg ${isVisible? 'bg-red-600 peer-focus:ring-red-700 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500 peer-focus:ring-blue-700'} peer-focus:ring-2 peer-focus:outline-none`} onClick={handleClick}>
                            {(isVisible) ? <Eye color='#fff'/> : <EyeOff color='#fff'/>}
                        </button>
                    }
                </div>
            </div>
        )
    }


export default Input
