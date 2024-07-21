import { Navigate, useLocation } from "react-router-dom"
import { IProps } from "../models/tsModels"
import useAuth from "../hook/useAuth"

export default function RequireAuth({ children }: IProps) {
    const location = useLocation()
    const { user } = useAuth()

    return (
        <>
            {!user ? <Navigate to='/login' state={{from: location}} /> : children}
        </>
    )
}
