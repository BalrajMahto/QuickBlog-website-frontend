import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAppContext } from '../../context/appContext'
import axios from 'axios';


const Layout = () => {

  const { axios, setToken, navigate } = useAppContext()
  const logout = () => {
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = null;
  setToken(null);
  navigate('/');
}

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add a blog.");
        setIsAdding(false);
        return;
      }
      const blog = {
        title,
        subTitle,
        category,
        description: quillRef.current.root.innerHTML,
        isPublished
      };
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (data.success) {
        toast.success("Blog added successfully");
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "An error occurred while adding the blog. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', {
        blog: id, // or blogId: id, depending on your backend
        name,
        content
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (data.success) {
        toast.success("Comment added successfully");
        setName('');
        setContent('');
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding comment");
    }
  };

  return (
    <>
    <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={()=> navigate('/')} />
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
    </div>
    <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        <Outlet />
     </div>
    </>
  )
}

export default Layout

// Example Express middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  // ...verify token logic...
  next();
};