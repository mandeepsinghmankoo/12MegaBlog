import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function Postcard({
  $id, title, featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full mb-4 justify-center'>
          {featuredImage ? (
            <img 
              src={appwriteService.getFilePreview(featuredImage)} 
              alt={title} 
              className="rounded-xl w-full"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
              <p className="text-gray-400">No image available</p>
            </div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default Postcard
