import { Await, defer, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { ILoader, IPost, IPostsArray, IURLParams } from "../models/tsModels";
import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import ErrorPage from "./ErrorPage";

export default function Posts() {
    const {posts} = useLoaderData() as IPostsArray
    const [searchParams, setSearchParams] = useSearchParams()
    const [URLParamsObject, setURLParamsObject] = useState<IURLParams>()
    const valueSearchInput = useRef<HTMLInputElement>(null)
    const valueCheckboxInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);

        setURLParamsObject(currentParams)

        // passing values to inputs from URL parameters after loading page with parameters
        currentParams.postName && currentParams.postName.length > 0 
            ? valueSearchInput.current!.value = currentParams.postName 
            : valueSearchInput.current!.value = ''

        currentParams.latestTwentyItems === 'true' 
            ? valueCheckboxInput.current!.checked = true 
            : valueCheckboxInput.current!.checked = false
      }, [searchParams])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const form = e.currentTarget
        const URLParams = {
            postName: '',
            latestTwentyItems: 'false',
        }

        URLParams.postName = form.searchInput.value
        URLParams.latestTwentyItems = form.checkboxLatestItems.checked.toString()
        setURLParamsObject(URLParams)
        setSearchParams(URLParams)
    }

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="search" name="searchInput" ref={valueSearchInput} />
                <label style={{paddingInline: '1rem'}} >
                    <input type="checkbox" name="checkboxLatestItems" ref={valueCheckboxInput} />
                </label>
                <input type="submit" value="Search submit" />  
            </form>

            <Link to='/posts/new'>
                <button>create new post</button>
            </Link>

            <Suspense fallback={<h2>loading...</h2>}>
                <Await resolve={posts} errorElement={<ErrorPage />}>
                    {
                        (resolvedPosts) => (<>
                            {Array.isArray(resolvedPosts) && URLParamsObject && resolvedPosts
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
                        </>)
                    }
                </Await>
            </Suspense>
        </>
    )
}

async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!res.ok) {
        throw new Response('', {status: res.status, statusText: 'Not found'})
    }

    return res.json()
}

const postLoader = async ({request, params}: ILoader) => {
    // console.log(request, params)

    return defer({
        posts: getPosts()
    })
}

export {postLoader}