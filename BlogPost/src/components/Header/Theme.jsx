import { Moon, Sun, SunMoon } from 'lucide-react';
import { cloneElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from "../../store/themeSlice";

function RadioBtn(
    {
        children,
        id,
        value,
        isChecked=false,
        clickHandler
    }
) {
    const modifiedChildren = cloneElement(children, {
            className: `${children.props.className || ''} ${isChecked ? 'text-white' : ''}`.trim()
        });
    return(
        <div>
            <input name='theme' type='radio' id={id} value={value} className='hidden peer' checked={isChecked} onChange={clickHandler} />
            <label htmlFor={id} className='peer-checked:bg-blue-500 duration-500 rounded-xl peer-checked:hover:bg-blue-600 hover:shadow-2xl/40 hover:shadow-blue-400 hover:bg-blue-500 p-2 mt-1 mx-1 inline-flex cursor-pointer items-center justify-between' title={value}>
                {modifiedChildren}
            </label>
        </div>
    )   
}

function Theme() {
    const dispatch = useDispatch()

    const themes = [
        {
            id: "dark",
            value: "dark",
            svg: <Moon size={18} className='group-hover:text-white peer-checked:text-white text-blue-500' stroke="currentColor" />
        },
        {
            id: "light",
            value: "light",
            svg: <Sun size={18} className='group-hover:text-white text-blue-500' stroke="currentColor" />
        },
        {
            id: "system",
            value: "system",
            svg: <SunMoon size={18} className='group-hover:text-white text-blue-500' stroke="currentColor" />
        }
    ]

    const storedTheme = useSelector(state => state.theme.theme)

    const [theme, setTheme] = useState(storedTheme)

    const clickHandler = (e) => {
        e.target.checked=true
        setTheme(e.target.value)
    }
    
    useEffect(
        () => {
            const root = window.document.documentElement
            
            if (theme === "system") {
                const themeSet = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
                dispatch(changeTheme({theme: "system"}))
                root.classList.remove("dark", "light")
                root.classList.add(themeSet)
                return
            } 

            if (theme === "dark" || theme === "light"){
                root.classList.remove("dark", "light")
                root.classList.add(theme)
                dispatch(changeTheme({theme: theme}))
            } else {
                root.classList.add("dark")
                root.classList.remove("dark", "light")
                dispatch(changeTheme({theme: "dark"}))
                console.error(`components::Header::Theme.jsx: Got an invalid theme option ${theme} for setting theme, set the theme to dark`)
            }
        },
        [theme, setTheme]
    )

    return (
        <div className='rounded-2xl w-fit mr-2'>
            <ul className='flex ml-auto' id='themeSelectors'>
                {
                    themes.map(
                        (themeConfig) => (
                            <li key={themeConfig.id} className='group'>
                                <RadioBtn id={themeConfig.id} value={themeConfig.value} isChecked={themeConfig.value===theme} clickHandler={clickHandler}>
                                    {themeConfig.svg}
                                </RadioBtn>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default Theme
