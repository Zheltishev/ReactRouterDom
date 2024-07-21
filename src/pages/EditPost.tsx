import { useParams } from "react-router-dom"

export default function EditPost() {
    const { id } = useParams()

    return (
        <>
            <h1>Edit post id { id }</h1>
        </>
    )
}