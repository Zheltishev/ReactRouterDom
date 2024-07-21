import { createContext, useState } from "react"
import { IProps } from "../models/tsModels"

export const AuthContext = createContext(null as any)

export const AuthProvider = ({ children }: IProps) => {
    const [user, setUser] = useState<string | null>(null)
    const signIn = (newUser: string, cb: () => void) => {
        setUser(newUser)
        cb()
    }
    const signOut = (cb: () => void) => {
        setUser(null)
        cb()
    }

    const value = { user, signIn, signOut}

    return (
        <>
            <AuthContext.Provider value={value}>
                { children }
            </AuthContext.Provider>
        </>
    )
}