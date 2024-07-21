import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/posts">Posts</NavLink>
                <NavLink to="/about">About</NavLink>
            </header>

            <main style={{display: 'flex', flexDirection: 'column', paddingInline: '5rem'}}>
                <Outlet />
            </main>
            
            <footer>
                footer
            </footer>
        </>
    )
}