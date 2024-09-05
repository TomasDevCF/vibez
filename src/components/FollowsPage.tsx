import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Post, UserInfo } from "../layouts/HomePage.astro";
import Cookies from "js-cookie"
import CPost from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Follows() {
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(() => {
    fetch(`/api/posts/forYouFollowed/${Cookies.get("accountId")}`)
      .then(res => res.json())
      .then(posts => {
        setPosts(prevPosts => {
          if (prevPosts) {
            return [...prevPosts, ...posts]
          }
          return posts
        })
      })
  }, [])

  function handleLoadMore() {
    fetch(`/api/posts/getUserPost/${Cookies.get("accountId")}?page=${page + 1}`)
      .then(res => res.json())
      .then(posts => {
        if (posts.length === 0) setHasMore(false)
        setPosts(prevPosts => {
          if (prevPosts) {
            return [...prevPosts, ...posts]
          }
          return posts
        })
      })
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div className="for-you h-full relative grid">
      {posts && (posts.length != 0 ? <div className="infinite-scroll-container w-full overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
        id="infiniteScroll">
        <InfiniteScroll
          dataLength={posts.length}
          hasMore={hasMore}
          loader={<svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="inline w-12 h-12 animate-spin text-white text-center"
          >
            <path
              fill="currentColor"
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            >
            </path>
          </svg>}
          style={{ scrollbarWidth: "none" }}
          className="overflow-y-hidden"
          scrollableTarget="infiniteScroll"
          next={() => handleLoadMore()}
        >

          {posts && posts.map(post => <CPost post={post} />)}
        </InfiniteScroll>
      </div>
        :
        <div className="w-full">
          <p className="text-zinc-400 text-center pt-4 font-medium text-sm">No estas siguiendo a nadie o no han publicado ningun post</p>
        </div>)
      }
    </div>
  )
}