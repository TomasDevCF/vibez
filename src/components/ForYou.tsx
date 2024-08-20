import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Post, UserInfo } from "../layouts/HomePage";
import Cookies from "js-cookie"
import CPost from "./Post";

export default function ForYou() {
  const [page, setPage] = useState<number>(0)
  const [posts, setPosts] = useState<Post[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const textareaRef = useRef(null);

  useEffect(() => {
    fetch(`/api/users/getUser/${Cookies.get("accountId")}`)
      .then(res => res.json())
      .then(data => {
        setUserInfo(data)
        fetch(`/api/posts/forYou/${Cookies.get("accountId")}?${page ? `page=${page}` : ""}`)
          .then(res => res.json())
          .then(posts => {
            setPosts(prevPosts => [...prevPosts, ...posts])
          })
      })
      .catch(err => console.error(err))

  }, [page])

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
              user_id: userInfo?.user_id
            })
          })
            .then(res => res.json())
            .then(data => {
              e.target[0].value = ""
              if (data.post) {
                console.log(data.post)
                setPosts(prevPosts => [{
                  body: data.post[0].body as string,
                  post_id: data.post[0].post_id as number,
                  user_id: data.post[0].user_id as number,
                  created_at: data.post[0].created_at as Date,
                  image: userInfo?.image as string | null,
                  username: userInfo?.username as string,
                  name: userInfo?.name as string
                }, ...prevPosts])
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
    console.log(posts)
  }, [posts])

  return (
    <>
      {userInfo &&
        <div className="for-you h-full">
          <div className="add-post border-b border-white/20 border-solid flex justify-between">
            <form onSubmit={handleSubmit} className="w-full">
              <label htmlFor="addPost" className="mb-2 text-sm font-medium sr-only text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex w-[28px] h-[54px] items-center ps-3 pointer-events-none">
                  <img className="rounded-full scale-150" src={userInfo.image ? userInfo.image : `https://ui-avatars.com/api/?name=${userInfo.name.charAt(0)}&background=random&bold=true`} alt={userInfo.name} />
                </div>
                <textarea onInput={handleInput} ref={textareaRef} wrap="soft" rows={1} id="addPost" name="addPost" className="resize-none h-full w-full p-4 ps-10 text-sm border rounded-lg bg-transparent placeholder-gray-400 text-white pe-24 block outline-none border-transparent scrollba" placeholder="¡¿Que esta pasando?!" required style={{ scrollbarWidth: "none" }} />
                <button type="submit" className=" text-white absolute end-2.5 top-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600/90 focus:ring-blue-800">Postear</button>
              </div>
            </form>
          </div>
          <div className="flex flex-col overflow-y-auto h-full w-full" style={{ height: "calc(100% - 120px)", scrollbarWidth: "none" }}>
            {posts && posts.map(post => <CPost post={post} />)}
          </div>
        </div>
      }
    </>
  )
}