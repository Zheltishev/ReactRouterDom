import { ReactNode } from "react"
import { Params } from "react-router-dom"

export interface IPost {
    body: string,
    id: number,
    title: string,
    userId: number
}

export interface IComment {
    body: string,
    email: string,
    id: number,
    name: string,
    postId: number
}

export interface IPostsArray {
    posts: IPost[]
}

export interface IProps {
    children?: ReactNode
}

export interface IURLParams {
    postName?: string,
    latestTwentyItems?: string
}

export interface ILoader {
    params: Params,
    request: Request
}

export interface IParams {
    post: string,
    id: string
}