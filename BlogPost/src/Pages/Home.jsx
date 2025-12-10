import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import appwriteService from "../appwrite/appwriteConfig"
import { Container, PostCard } from "../components"

function Home() {
    const [error, setError] = useState(null)
    const [posts, setPost] = useState([])

    const status = useSelector(state => state.auth.status)

    useEffect(
        () => {
            appwriteService.getPosts()
            .then((posts) => setPost(posts.documents))
            .catch((err) => {
                setError(err.message)
                console.error(`Pages :: Home.jsx :: Got error while fetching the posts ${err.message}`)
            }
            )
        },
        []
    )

    if (!status) {
        return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }
    if (posts?.length > 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl">
                            Don't have anything to show
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )


}

export default Home
