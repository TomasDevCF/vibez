import { useEffect, useRef, useState, type FormEvent, type SetStateAction } from "react";
import type { Post, UserInfo } from "../layouts/HomePage.astro"
import Cookies from "js-cookie"
import AddImageButton from "./AddImageButton";

interface Props {
  placeholder: string
  setPosts: (value: SetStateAction<Post[]>) => void
  isCommentInput?: boolean
  commentedPostId?: number
}

export interface Image {
  url: string
  file: File
}

export default function PostInput({ placeholder, setPosts, isCommentInput = false, commentedPostId }: Props) {
  const textareaRef = useRef(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [images, setImages] = useState<Image[] | null>(null)


  useEffect(() => {
    fetch(`/api/users/getUser/${Cookies.get("accountId")}`)
      .then(res => res.json())
      .then(data => {
        setUserInfo(data)
        console.log(data)
      })
  }, [])

  function submitPost(imagesToSubmit: Image[] | null, postInfo: any, e: FormEvent<HTMLFormElement>) {
    if (imagesToSubmit) {
      for (let i = 0; i < imagesToSubmit.length; i++) {
        const formData = new FormData(e.target as HTMLFormElement)
        formData.append("image", imagesToSubmit[i].file)
        fetch("https://api.imgbb.com/1/upload?key=6e78ea3a8c7043b01b29f549d7e9ece7&", {
          method: "POST",
          body: formData
        })
          .then(res => res.json())
          .then(data => {
            fetch(`/api/posts/addImage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                image_url: data.data.url,
                post_id: postInfo.post[0].post_id
              })
            })
              .then(res => res.json())
              .then(data => {
                console.log(data)
              })
              .catch(err => {
                console.error(err)
                //TODO: ERROR
              })
          })
      }
    }
    setPosts(prevPosts => [{
      body: postInfo.post[0].body as string,
      post_id: postInfo.post[0].post_id as number,
      user_id: postInfo.post[0].user_id as number,
      created_at: postInfo.post[0].created_at as Date,
      image: userInfo?.image as string | null,
      username: userInfo?.username as string,
      name: userInfo?.name as string,
      comments_count: 0,
      likes_count: 0,
    }, ...prevPosts])
    setImages(null)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement)

    fetch(`/api/posts/verifyCooldown/${userInfo?.user_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.allowed) {
          fetch("/api/posts/addPost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              body: formData.get("addPost"),
              user_id: userInfo?.user_id,
              commented_post_id: isCommentInput ? commentedPostId : null
            })
          }) //TODO
            .then(res => res.json())
            .then(data => {
              e.target[0].value = ""

              if (textareaRef.current) {
                textareaRef.current.style.height = "54px" // eslint-disable-line
              }

              if (data.post) {
                console.log(images)
                submitPost(images, data, e)
              }
            })
        } else {
          //TODO: ERROR COOLDOWN
        }
      })
      .catch(err => console.error(err))
  }

  function handleInput(e: FormEvent<HTMLTextAreaElement>) {
    if (textareaRef.current) {
      textareaRef.current.style.height = "54px" // eslint-disable-line
      textareaRef.current.style.height = `${e.target.scrollHeight}px` // eslint-disable-line
    }
  }

  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <div className="add-post border-b border-white/20 border-solid flex justify-between relative top-0 right-0 bg-white/10 backdrop-blur w-full z-20 h-max">
      {userInfo && <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex size-[54px] items-center ps-3 pointer-events-none">
            <img className="rounded-full size-8 object-cover bg-black" src={userInfo.image ? userInfo.image : `https://ui-avatars.com/api/?name=${userInfo.name.charAt(0)}&background=random&bold=true`} alt={userInfo.name} />
          </div>
          <textarea onInput={handleInput} ref={textareaRef} wrap="soft" rows={1} id="addPost" name="addPost" className="resize-none h-full w-full p-4 ps-[51px] text-sm border rounded-lg bg-transparent placeholder-gray-400 text-white block outline-none border-transparent max-h-64" placeholder={placeholder} required style={{ scrollbarWidth: "none" }} />
        </div>
        {images && <div className="flex gap-x-2 ps-[53px]">
          {images.map(img => <img className="size-16 rounded-md object-cover" src={img.url} />)}
        </div>}
        <div className="flex gap-x-2 justify-end pb-2 pe-2">
          <AddImageButton images={images} setImages={setImages} />
          <button type="submit" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600/90 focus:ring-blue-800">Postear</button>
        </div>
      </form>}
    </div>
  )
}