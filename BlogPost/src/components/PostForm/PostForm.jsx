import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/appwriteConfig'
import { updatePost } from '../../store/postSlice'
import { Button, Input, Loader, RTE, Select } from "../index"

function PostForm({ post }) {
    const [error, setError] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)

    const dispatch = useDispatch()

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post ? (post.status ? "active" : "inactive") : "active",
            }
        }
    )
    //watch is used to watch a field continously and to set values we use setValue and control gives the control of the current form

    const nvaigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    
    const submit = async (data) => {
        setIsSubmit(true)
        try {
            if (post) {
                // data.image?.[0] if data.image is not null or undefined then it will slice it if u forgot how it works just read about it on mdn the topic is optional chaining
                // Just tested what happens to this statement if the data.image is an empty array it will still work as in js if we slice a non existing value from array it give undefined and null and undefined conditions are treated as false but I have written it in case data.image is null or undefined already
                
                const file = data?.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : data.featuredImage;
                
                if (file && post.featuredImage) {
                    await appwriteService.removeFile(post.featuredImage)
                }
                dispatch(updatePost({slug: data.slug, post: {...data, featuredImage: file ? file.$id : null, userId: userData.$id, status: data.status === "active" ? true : false}}))
                const dbPost = await appwriteService.updatePost(
                    post.$id,
                    {
                        ...data,
                        featuredImage: file ? file.$id : null,
                        status: data.status === "active" ? true : false
                    }
                )
                setIsSubmit(false)

                if (dbPost) {
                    nvaigate(`/post/${dbPost.$id}`)
                }
            } else {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId
                }

                dispatch(updatePost({slug: data.slug, post: {...data, userId: userData.$id, status: data.status === "active" ? true : false}}))
                
                try {
                    const dbPost = await appwriteService.createPost(
                        {
                            ...data,
                            userId: userData.$id,
                            status: data.status === "active" ? true : false,
                        }
                    )
                    if (dbPost) {
                        nvaigate(`/post/${dbPost.$id}`)
                    }
                } catch {
                    setError("You have already created a post with same slug. Try changing the slug manually or try changing the title")
                } finally {
                    setIsSubmit(false)
                }
            }
        } catch (err) {
            setError(err.message)
            setIsSubmit(false)
        }
    }

    //slugTransfrom (can be anything we are saying slugTransform here) is used to change particular output in this case it will replace the space in title with - and create a slug
    const slugTransform = useCallback(
        (value) => {
            if (value && typeof value === "string") {
                return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
            }
            return ''
        },
        []
    )
    
    useEffect(
        () => {
            const subscription = watch(
                (value, {name}) => {
                    if (name === "title") {
                        setValue(
                            'slug',
                            slugTransform(
                                value.title,
                            ),
                            {
                                shouldValidate: true
                            }
                        )
                    }
                }
            )

            return () => subscription.unsubscribe(); // in useEffect we can do <variable name>.unsubscribe() for memory management 
        },
        [watch, slugTransform, setValue]
    )

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    readOnly={isSubmit}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    readOnly={isSubmit}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 cursor-pointer bg-black"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                    readOnly={isSubmit}
                    
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    disabled={isSubmit}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full duration-300 enabled:hover:shadow-lg enabled:hover:shadow-black/50 disabled:bg-gray-300 mt-5" disabled={isSubmit}>
                    {isSubmit ? (
                        <Loader label={(post ? "Updating" : "Submitting")}/>
                    ) : (post ? "Update" : "Submit")}
                </Button>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            </div>
        </form>
    )
}

export default PostForm
