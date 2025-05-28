import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import {Container , Postcard} from "../components"

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() =>{
        appwriteService.getPosts().then((posts) =>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  if(posts.length===0){
    return (
        <div className='w-full h-screen pt-8'>
            <Container>
                <h1 className='text-2xl font-bold text-center'>No Posts Found</h1>
            </Container>
        </div>
    )
  }
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => {
                    return (
                        <div key={post.$id} className='w-1/4 p-2'>
                            <Postcard {...post}/>
                        </div>
                    )
                })}

            </div>
        </Container>
    </div>
  )
}

export default Home
