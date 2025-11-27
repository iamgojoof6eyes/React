import { createContext, useContext } from "react";

export const TodoContext = createContext(
    {
        todos: [],
        addTodo: (todo) => {},
        rmTodo: (id) => {},
        editTodo: (id, todo) => {},
        markDone: (id) => {}
    },
)

/*
todos structure:
{
id: Int,
completed: boolean,
todo: String
}
*/

export const useTodo = () => useContext(TodoContext)

export const TodoProvider = TodoContext.Provider