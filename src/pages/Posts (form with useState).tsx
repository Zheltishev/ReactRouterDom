import { Link, useSearchParams } from "react-router-dom";
import { IPost, IURLParams } from "../models/tsModels";
import { FormEvent, useEffect, useState } from "react";
import { ChangeEvent } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [URLParamsObject, setURLParamsObject] = useState<IURLParams>()
    const [valueSearchInput, setValueSearchInput] = useState('')
    const [valueCheckboxInput, setValueCheckboxInput] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const jsonRes = await res.json()

            setPosts(jsonRes)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);

        setURLParamsObject(currentParams)

        // (useState) passing values to inputs from URL parameters after loading page with parameters
        currentParams.postName === undefined ? setValueSearchInput('') : setValueSearchInput(currentParams.postName)
        currentParams.latestTwentyItems === undefined ? setValueCheckboxInput(false) : setValueCheckboxInput(JSON.parse(currentParams.latestTwentyItems.toLowerCase()))
        }, [searchParams])
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const URLParams = {
            postName: '',
            latestTwentyItems: 'false',
        }

        URLParams.postName = form.postName.value
        URLParams.latestTwentyItems = form.latestTwentyItems.checked.toString()
        setURLParamsObject(URLParams)
        setSearchParams(URLParams)
    }

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="search" name="postName" value={valueSearchInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setValueSearchInput(e.target.value)} />
                <label style={{paddingInline: '1rem'}} >
                    <input type="checkbox" name="latestTwentyItems" checked={valueCheckboxInput} onChange={() => setValueCheckboxInput(!valueCheckboxInput)} />
                </label>
                <input type="submit" value="Search submit" />  
            </form>

            <Link to='/posts/new'>
                <button>create new post</button>
            </Link>

            {posts && URLParamsObject && posts
                        .filter((post: IPost) => {
                            const idNumberStart = URLParamsObject?.latestTwentyItems === 'true' ? 80 : 1

                            if (URLParamsObject?.postName && URLParamsObject?.postName.length > 0) {
                                return post.title.includes(URLParamsObject.postName) && post.id >= idNumberStart
                            } else {
                                return post.id >= idNumberStart
                            }
                        })
                        .map((post: IPost) => (
                            <Link to={`/posts/${post.id}`} key={post.id}>
                                <li>{post.title}</li>
                            </Link>
                        ))}
        </>
    )
}