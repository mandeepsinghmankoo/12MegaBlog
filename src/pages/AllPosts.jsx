import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, Postcard } from "../components"

function AllPosts() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-1/4 p-2'>
                            <Postcard 
                                $id={post.$id} 
                                title={post.title} 
                                featuredImage={post.featuredImage}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
