import { useEffect, useState } from "react"
import type { Post } from "../layouts/HomePage"
import InfiniteScroll from "react-infinite-scroll-component"
import CPost from "./Post";
import queryString from "query-string";
interface Props {
  userId: number
}

export default function UserPosts({ userId }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [showQuery, setShowQuery] = useState<string>("")

  useEffect(() => {
    const query = queryString.parseUrl(window.location.href)
    if (query.query.show) {
      setShowQuery(query.query.show as string)
    }
    if (query) {
      fetch(`/api/posts/${query.query.show == "likes" ? "getLikedPosts" : "getUserPost"}/${userId}`)
        .then(res => res.json())
        .then(posts => {
          if (posts.length === 0) setHasMore(false)
          setPosts(posts)
        })
        .catch(err => console.error(err))
    }
  }, [])

  function handleLoadMore() {
    fetch(`/api/posts/${showQuery == "likes" ? "getLikedPosts" : "getUserPost"}/${userId}?page=${page + 1}`)
      .then(res => res.json())
      .then(posts => {
        if (posts.length === 0) setHasMore(false)
        setPosts(prevPosts => [...prevPosts, ...posts])
      })
    setPage(prevPage => prevPage + 1)
  }

  return (
    <>
      {posts.length != 0 && <div className="infinite-scroll-container-user w-full overflow-y-auto"
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

          {posts && posts.map(post => <CPost post={post} key={post.post_id} />)}
        </InfiniteScroll>
      </div>}
    </>
  )
}