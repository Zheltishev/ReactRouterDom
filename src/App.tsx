import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Posts, { postLoader } from './pages/Posts';
import Notfound from './pages/Notfound';
import Layout from './components/Layout';
import Singlepage, { singlePostLoader } from './pages/Singlepage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about/*' element={<About />} >
        <Route path="contacts" element={<p>Contacts data</p>}/>
        <Route path="team" element={<p>Team data</p>}/>
      </Route>
      <Route path='about-us' element={<Navigate to='/about' replace />} />
      <Route path='posts' element={<Posts />} loader={postLoader}/>
      <Route path='posts/:id' element={<Singlepage />} loader={singlePostLoader}/>
      <Route path='posts/new' element={
        <RequireAuth>
          <CreatePost />
        </RequireAuth>
      } />
      <Route path='posts/:id/edit' element={<EditPost />} />
      <Route path='posts/new/edit' element={<Notfound />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<Notfound />} />
    </Route>
  ))

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </>
  );
}

export default App;
