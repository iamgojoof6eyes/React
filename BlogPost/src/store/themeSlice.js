import { createSlice } from "@reduxjs/toolkit";

const localTheme = localStorage.getItem("theme")

const initialState = {
    theme: localTheme || "system"
}

const themeProvider = createSlice(
    {
        name: "theme",
        initialState,
        reducers: {
            changeTheme: (state, action) => {
                state.theme = action.payload.theme
                localStorage.setItem("theme", action.payload.theme)
            }
        }
    }
)

export const { changeTheme } = themeProvider.actions;

export default themeProvider.reducer