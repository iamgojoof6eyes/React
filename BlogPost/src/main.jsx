import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from "./Pages"
import Protected from './components/AuthLayout.jsx'
import './index.css'
import store from "./store/store.js"

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/login",
          element: (
            <Protected authenticated={false}>
              <Login />
            </Protected>
          )
        },
        {
            path: "/signup",
            element: (
                <Protected authenticated={false}>
                    <Signup />
                </Protected>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protected authenticated>
                    {" "}
                    <AllPosts />
                </Protected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected authenticated>
                    {" "}
                    <AddPost />
                </Protected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected authenticated>
                    {" "}
                    <EditPost />
                </Protected>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
)
