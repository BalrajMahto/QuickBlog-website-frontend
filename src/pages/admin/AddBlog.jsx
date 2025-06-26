import React, { useState, useEffect, useRef } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import toast from 'react-hot-toast'
import {parse} from 'marked'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'

const AddBlog = () => {

  const [isAdding, setIsAdding] = useState(false);
  const [Loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    // Logic to generate content using AI
    if(!title) return toast.error("Please enter a title before generating content.");

    try {
      setLoading(true);
      const {data} = await axios.post('/api/blog/generate', {prompt: title});
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
        toast.success("Content generated successfully");
      } else {
        toast.error(data.message || "Failed to generate content");
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "An error occurred while generating content. Please try again.");
    }
    finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
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
      }
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

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      });
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setTitle(e.target.value)} value={title} />

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setSubTitle(e.target.value)} value={subTitle} />

        <p className='mt-4'>Blog description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          {Loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-100/20 z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-blue-300 border-b-transparent animate-spin-slow"></div>
                  </div>
                  <p className="text-blue-700 font-medium text-sm tracking-wide animate-pulse">
                    AI is generating your blog content...
                  </p>
                </div>
              </div>
            )}
        <button
          disabled={Loading}
          onClick={generateContent}
          type='button'
          className='mt-4 sm:mt-0 sm:absolute sm:bottom-1 sm:right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>
            Generate with AI
        </button>

        </div>

        <p className='mt-10 sm:mt-4'>Blog category</p>
        <select onChange={(e) => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded' value={category}>
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)} />
        </div>

        <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  )
}

export default AddBlog