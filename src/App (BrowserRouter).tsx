import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import Notfound from './pages/Notfound';
import Layout from './components/Layout';
import Singlepage from './pages/Singlepage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about/*' element={<About />} >
              <Route path="contacts" element={<p>Contacts data</p>}/>
              <Route path="team" element={<p>Team data</p>}/>
            </Route>
            <Route path='about-us' element={<Navigate to='/about' replace />} />
            <Route path='posts' element={<Posts />} />
            <Route path='posts/:id' element={<Singlepage />} />
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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
