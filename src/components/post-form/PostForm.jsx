import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth?.userData);

 const submit = async (data) => {
  try {
    console.log('Submitting with post:', post);
    console.log('post.$id:', post?.$id);
    console.log("userData:", userData);

    if (!userData?.$id) {
      console.error("User not logged in or userData is undefined");
      return;
    }

    if (post && post.$id) {
      // Edit post flow
      const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file && post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // Create post flow
      if (!data.image || !data.image[0]) {
        console.error("No image file selected.");
        return;
      }

      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  } catch (error) {
    console.error("Error submitting post:", error);
  }
};


  const slugTransform = useCallback((value) => {
  if (value && typeof value === 'string') {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')     // Remove invalid characters
      .replace(/\s+/g, '-')         // Replace spaces with dashes
      .replace(/^-+|-+$/g, '')      // Trim dashes from start and end
      .slice(0, 36);                // Limit to 36 characters
  } else return '';
}, []);
  React.useEffect(() =>{
    const subscription = watch((value, {name})=>{
      if(name === 'title'){
        setValue('slug', slugTransform(value.title, {shouldValidate: true}))
      }
    })
  },[watch, slugTransform, setValue])

  return (
     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage ? (
                  <div className="w-full mb-4">
                    <img
                      src={appwriteService.getFilePreview(post.featuredImage) || ''}
                      alt={post.title}
                      className="rounded-lg"
                    />
                  </div>
                ) : null}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm
