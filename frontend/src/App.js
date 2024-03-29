import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Authentication/Login';
import Register from './components/pages/Authentication/Register';
import BlogPage from './components/pages/BlogPage';
import DisplayBlog from './components/pages/miscellaneous/DisplayBlog';
import AddNewBlog from './components/pages/miscellaneous/AddNewBlog';
import EditBlog from './components/pages/miscellaneous/EditBlog';
import DefaultAuth from './components/pages/Authentication/DefaultAuth';
import HomePageLayout from './layout/HomePageLayout';
import { UserState } from './components/Context/UserContext';
import { useEffect } from 'react';
import LinkErrorHandler from './components/pages/error/LinkErrorHandler';

export const App = () => {
  const { setUserDetails, setUserToken } = UserState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userInfo'));
    if (token) {
      setUserDetails(token.user);
      setUserToken(token.token);
    } else {
      setUserDetails(null);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DefaultAuth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/" element={<HomePageLayout />}>
          <Route path="/" element={<BlogPage />} />
          <Route path="edit/:blogId" element={<EditBlog />} />
          <Route path="currblog/:id" element={<DisplayBlog />} />
          <Route path="add_new_blog" element={<AddNewBlog />} />
        </Route>
      </Route>
      {/* Error Handler */}
      <Route path="*" element={<LinkErrorHandler />} />
    </Routes>
  );
}

// PrivateRoute component for handling private routes
