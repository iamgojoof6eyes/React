import { forwardRef, useId } from 'react';

function Select(
    {
        options,
        label,
        className = "",
        ...props
    },
    ref
) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''>
                    {label}
                </label>}
            <select 
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-gray-500 text-black outline-none focus:bg-white focus:border-blue-600 focus:border-2 duration-200 border border-gray-200 w-full ${className}`}
            >
                {
                    options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default forwardRef(Select)