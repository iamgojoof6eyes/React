import appwriteService from "../appwrite/appwriteConfig"
import { Link } from "react-router-dom"

function PostCard(
    {
        $id,
        title,
        featuredImage
    }
) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-400 rounded-xl p-4">
                {featuredImage && <div className="mb-4 justify-center w-full">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-xl"/>
                </div>}
                <h2 className={`text-xl text-center font-bold`}>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
