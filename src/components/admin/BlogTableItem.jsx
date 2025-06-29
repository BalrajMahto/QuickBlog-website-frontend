import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';
import React from 'react'


const BlogTableItem = ({blog,fetchBlogs,index}) => {

    const {title,createdAt} = blog;
    const BlogDate = new Date(createdAt)

    const {axios} = useAppContext()
   
    const deleteBlog= async () => {
      const confirm = window.confirm('Are you sure to delete this blog ? ')
      if(!confirm) return;
      try{
        const {data} = await axios.post('/api/blog/delete',{id: blog._id})
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        }else{
          toast.error(error.message)
        }
      }catch(error){
        toast.error(error.message)

      }
      
    }

    const togglePublish = async () => {
      try{
        const { data } = await axios.post(`/api/blog/toggle-publish/${blog._id}`);
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        }else{
          toast.error(error.message)
        }
      
    }catch(error){
      toast.error(error.message)
    }
  }
    
  
  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4'>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidded'>{BlogDate.toDateString()}</td>
        <td  className='px-2 py-4 max-sm:hidded'>
            <p className={`${blog.isPublished ? "text-green-600" : "text-orange-600"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
            <img src={assets.cross_icon} onClick={deleteBlog} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" />
        </td>
    </tr>
  )
}

export default BlogTableItem