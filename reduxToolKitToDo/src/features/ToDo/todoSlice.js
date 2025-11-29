import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

export const todoSlice = createSlice(
    {
        name: "todo",
        initialState,
        reducers: {
            addTodo: (state, action) => {
                const todo = {
                    id: nanoid(), //generates random id 
                    text: action.payload // since we will pass the text as text so we don't need to do action.payload.text
                }
                state.todos.push(todo)
            },
            removeTodo: (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            }
        }
    }
)

export const { addTodo, removeTodo } = todoSlice.actions //Slice.action gives the reducers we have created

export default todoSlice.reducer

/*
in reducers when we create function we always get two things,
state and action
state gives the current state of context i.e. the initialState will changed in further action so state will give the current present state of initialState

action takes the extra parameters in the function in this case if we want to pass id to add todo it will be retrived via actions
we can get it using actions.payload.<the name which we have passed in action> if we give only one variable in action we can retrive it using action.payload

*/