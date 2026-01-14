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
            className={`px-3 py-2 rounded-lg bg-gray-300 dark:bg-gray-500 outline-none duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full ${className} appearance-none`}
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