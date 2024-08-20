import { useEffect, useState } from "react";
import type { Post } from "../layouts/HomePage";
import Cookies from "js-cookie"

interface Props {
  post: Post
}

export function hoursSince(date: Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInMs = now.getTime() - then.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  if (diffInHours >= 24) {
    if (diffInHours >= 730) {
      if (diffInHours >= 8760) {
        return `${Math.floor(diffInHours / 8760)}año/s`
      }
      return `${Math.floor(diffInHours / 730)}mes/es`
    }
    return `${Math.floor(diffInHours / 24)}dia/s`
  } else {
    if (diffInMins <= 60) {
      return `${diffInMins}mins`
    }
    return `${diffInHours}horas`
  }

}

export default function Post({ post }: Props) {
  const [isLiked, setIsLiked] = useState<{ isLiked: null | boolean, like_id: null | number }>({
    isLiked: null,
    like_id: null,
  })

  useEffect(() => {
    if (isLiked.isLiked == null) {
      fetch("/api/likes/verifyIsLiked", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: post.post_id, user_id: parseInt(Cookies.get("accountId") as string) })
      })
        .then(res => res.json())
        .then(data => {
          setIsLiked(data)
          console.log(data)
        })
    }
  }, [])

  function alternateLike() {
    if (isLiked.isLiked) {
      fetch("/api/likes/removeLike", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: post.post_id, user_id: parseInt(Cookies.get("accountId") as string) })
      })
        .then(res => res.json())
        .then(data => {
          if (data.like_id) {
            setIsLiked({ isLiked: false, like_id: null })
          } else {
            console.error(data.error)
          }
        })
    } else {
      fetch("/api/likes/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: post.post_id, user_id: parseInt(Cookies.get("accountId") as string) })
      })
        .then(res => res.json())
        .then(data => {
          if (data.like_id) {
            setIsLiked({ isLiked: true, like_id: data.like_id })
          } else {
            setIsLiked({ isLiked: false, like_id: null })
          }
        })
    }
  }

  return (
    <>
      {isLiked.isLiked !== null && <article className="w-full h-max border-b border-solid border-white/20 ps-3 flex flex-col hover:bg-white/10 transition-colors">
        <div className="flex gap-2 py-2 w-full relative">
          <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src={post.image ? post.image : `https://ui-avatars.com/api/?name=${post.name.charAt(0)}&background=random&bold=true`} alt={post.name} />
          </div>
          <div className="flex-auto min-w-0">
            <div className="flex gap-2">
              <p className="text-sm font-medium truncate text-white">
                {post.name}
              </p>
              <p className="text-sm truncate text-gray-400">
                @{post.username}
              </p>
              <p className="text-sm truncate text-gray-400">
                {hoursSince(post.created_at)}
              </p>
            </div>
            <div>
              <p className="text-sm font-normal text-wrap text-white">
                {post.body}
              </p>
            </div>
          </div>
          <svg className="w-6 h-6 cursor-pointer text-white absolute top-0 right-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01" />
          </svg>

        </div>
        <div className="flex gap-2 pb-2 w-full">
          {post.user_id != parseInt(Cookies.get("accountId") as string) && (isLiked.isLiked ?
            <svg onClick={alternateLike} className="w-[1.35rem] h-[1.35rem] cursor-pointer font-light hover:text-white transition-colors text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
            </svg> :
            <svg onClick={alternateLike} className="w-[1.35rem] h-[1.35rem] cursor-pointer font-light hover:text-red-600 transition-colors text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>)}


          <svg className="w-[1.35rem] h-[1.35rem] cursor-pointer font-light hover:text-blue-500 transition-colors text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
          </svg>
          <svg className="w-[1.35rem] h-[1.35rem] cursor-pointer font-light hover:text-amber-500 transition-colors text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M4.248 19C3.22 15.77 5.275 8.232 12.466 8.232V6.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861v-2.154C5.275 13.616 4.248 19 4.248 19Z" />
          </svg>

        </div>
      </article>}
    </>
  )
}