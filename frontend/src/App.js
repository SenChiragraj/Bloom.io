import './App.css';
import {Routes, Route} from 'react-router-dom'

import HomePage from './components/pages/HomePage';
import Login from './components/pages/Authentication/Login'
import Register from './components/pages/Authentication/Register'
import BlogPage from './components/pages/BlogPage'
import DisplayBlog from './components/pages/miscellaneous/DisplayBlog';
import AddNewBlog from './components/pages/miscellaneous/AddNewBlog';
import EditBlog from './components/pages/miscellaneous/EditBlog';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/'  element={<HomePage/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/register'  element={<Register/>}/>
        <Route path='/edit/:blogId'  element={<EditBlog/>}/>
        <Route path='/blog_page'  element={<BlogPage/>}/>
        <Route path='/currblog'  element={<DisplayBlog/>}/>
        <Route path='/add_new_blog'  element={<AddNewBlog/>}/>
      </Routes>
    </>
  );
}

export default App;
