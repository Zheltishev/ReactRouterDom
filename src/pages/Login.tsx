import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hook/useAuth"
import { FormEvent } from "react"

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'
    const { signIn } = useAuth()

    const handleSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        const name = event.currentTarget.username.value

        signIn(name, () => navigate(fromPage, {replace: true}))
    }

    return (
        <>
            <h1>Login</h1>
            { fromPage}

            <form onSubmit={handleSubmit}>
                <label>
                    Name: <input name="username" />
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    )
}