import { Link, Outlet} from "react-router-dom";
// import { Route, Routes } from "react-router-dom";

export default function About() {
    return (
        <>
            <h1>About</h1>
            <Link to='/posts/new'>
                <button>create new post</button>
            </Link>

            <ul>
                <li><Link to="contacts">contacts</Link></li>
                <li><Link to="team">team</Link></li>
            </ul>

            <Outlet />

            {/* v1: component include routes */}
            {/* <Routes>
                <Route path="contacts" element={<p>Contacts data</p>}/>
                <Route path="team" element={<p>Team data</p>}/>
            </Routes> */}
        </>
    )
}