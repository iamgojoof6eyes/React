import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: new Object()
}


/*Structure
{
postSlug : post
}

*/

const postsSlice = createSlice(
    {
        name: "Posts",
        initialState,
        reducers: {
            initialUpdate: (state, action) => {
                state.posts = action.payload.posts
            },
            updatePost: (state, action) => {
                delete action.payload.post.image
                state.posts[action.payload.slug] = action.payload.post
            },
            removePost: (state, action) => {
                delete state.posts[action.payload.slug]
            }
        }
    }
)

export const { initialUpdate, updatePost, removePost } = postsSlice.actions;

export default postsSlice.reducer