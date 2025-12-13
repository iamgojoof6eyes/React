import { useEffect, useState } from "react"
import appwriteService from "../appwrite/appwriteConfig"
import { Container, PostCard } from "../components"

function AllPosts() {
    const [posts, setPost] = useState(null)
    const [error, setError] = useState(null)
    useEffect(
        () => {
            appwriteService.getPosts([])
            .then(
                (posts) => {
                    setError(null)
                    if (posts) {
                        setPost(posts.documents)
                    }
                }
            )
            .catch(
                (err) => {
                    setError(err.message)
                    console.error(`Got error in AllPosts.jsx in Pages ${err.message}`)
                }
            );
        },
        []
    )

    return (
        <div className='w-full py-8'>
            <Container>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <div className='flex flex-wrap'>
                    {
                        posts ? posts.map(
                            (post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ) 
                        ) : (
                        <div className="p-2 w-full text-center">
                            <h1 className="text-2xl">
                                Don't have anything to show
                            </h1>
                        </div>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
