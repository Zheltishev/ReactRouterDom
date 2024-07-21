import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IPost } from "../models/tsModels"

export default function Singlepage() {
    const { id } = useParams()
    const [post, setPost] = useState<IPost>()
    const navigate = useNavigate()
    const pageBack = () => navigate(-1)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            const jsonRes = await res.json()

            setPost(jsonRes)
        }

        fetchData()
    }, [id])

    return (
        <>
            {post && (
                <>
                    <button 
                        onClick={() => pageBack()}
                    >
                        page back
                    </button>
                    <h1>{post.id}. {post.title}</h1>
                    <p>{post.body}</p>
                    <Link to={`/posts/${id}/edit`}>
                        <button>
                            edit post
                        </button>
                    </Link>
                </>
            ) }
        </>
    )
}