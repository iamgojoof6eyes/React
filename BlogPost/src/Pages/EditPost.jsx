import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/appwriteConfig'

function EditPost() {
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const { slug } = useParams()

    useEffect(
        () => {
            setError(null)
            if (slug) {
                appwriteService.getPost(
                    slug
                )
                .then(
                    (post) => post ? setPost(post) : null,
                )
                .catch(
                    (err) => setError(err.message)
                );
            } else {
                navigate("/")
            }
        },
        [slug, navigate]
    )

    return post ? (
        <div className='py-8'>
            <Container>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
