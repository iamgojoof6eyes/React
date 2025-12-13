import { forwardRef, useId } from 'react'

const Input = forwardRef(
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
        return (
            <div className='w-full'>
                {
                    label && <label className='inline-block pl-1 mb-1' htmlFor={id}>
                        {label}
                    </label>
                }
                <input 
                type={type}
                className={`px-3 py-2 rounded-lg bg-gray-500 text-black outline-none duration-200 border border-gray-900 focus:bg-white focus:border-blue-600 focus:border-2 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
                />
            </div>
        )
    }
)

export default Input
