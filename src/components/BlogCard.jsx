import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
    
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate();
    return (
 <div
  onClick={() => navigate(`/blog/${_id}`)}
  className="w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:scale-102 hover:shadow-primary/30 transition duration-200 cursor-pointer"
>
  <img src={image} alt="Blog" className="w-full h-44 object-cover rounded-t-lg" />

  <div className="p-5 space-y-2">
    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
      {category}
    </span>

    <h5 className="text-base font-semibold text-gray-800 leading-snug">
      {title}
    </h5>

    <p
      className="text-sm text-gray-600 leading-normal"
      dangerouslySetInnerHTML={{ __html: description.slice(0, 75) + "..." }}
    ></p>
  </div>
</div>

  )
}

export default BlogCard