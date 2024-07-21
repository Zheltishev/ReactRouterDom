import { Await, Link, LoaderFunctionArgs, useAsyncValue, useLoaderData, useNavigate } from "react-router-dom"
import { IComment, IPost } from "../models/tsModels"
import { Suspense } from "react"

const Post = () => {
    const receivedPost = useAsyncValue() as IPost    
    
    return (
        <>
            <h1>{receivedPost.id}. {receivedPost.title}</h1>
            <p>{receivedPost.body}</p>
        </>
    )
}

const Comments = () => {
    const comments = useAsyncValue() as IComment[]

    return (
        <>
            <h2>Comments</h2>
            {comments.map((comment: IComment) => (
                <div key={comment.id}>
                    <h3>{comment.email}</h3>
                    <h3>{comment.name}</h3>
                    <p>{comment.body}</p>
                </div>
            ))}
        </>
    )
}

export default function Singlepage() {
    const {postData, id, commentsData} = useLoaderData() as {postData: IPost, id: string, commentsData: IComment[]}
    const navigate = useNavigate()
    const pageBack = () => navigate(-1)
    
    return (
        <>
            <button 
                onClick={() => pageBack()}
            >
                page back
            </button>
            <Suspense fallback={<h2>loading post...</h2>}>
                <Await resolve={postData}>
                    <Post />
                </Await>
            </Suspense>
            <Suspense fallback={<h2>loading comments...</h2>}>
                <Await resolve={commentsData}>
                    <Comments />
                </Await>
            </Suspense>
            <Link to={`/posts/${id}/edit`}>
                <button>
                    edit post
                </button>
            </Link>
        </>
    )
}

async function getPostById(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    return res.json()
}

async function getCommentsById(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

    return res.json()
}

const singlePostLoader = async ({params}: LoaderFunctionArgs) => {
    const id = params.id
    

    return {postData: await getPostById(id!), id, commentsData: getCommentsById(id!)}
}

export {singlePostLoader}