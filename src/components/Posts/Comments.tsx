import { useEffect, useState } from "react"
import type { Post } from "../layouts/HomePage.astro"
import CPost from "./Post"
import PostInput from "../Inputs/PostInput"

interface Props {
  post_id: number
}

export default function Comments({ post_id }: Props) {
  const [comments, setComments] = useState<Post[]>([])
  const [postInfo, setPostInfo] = useState<Post | null>(null)
  const [parentPost, setParentPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch(`/api/posts/getPost&Comment/${post_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          return window.location.href = "/"
        } else {
          setComments(data.commentsList)
          setPostInfo(data.postInfo)
          if (data.postInfo.is_comment) {
            fetch(`/api/posts/getPost&Comment/${data.postInfo.commented_post_id}`)
              .then(res => res.json())
              .then(data => {
                setParentPost(data.postInfo)
              })
          }
        }
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      {postInfo && comments &&
        <div className="comments h-screen w-full flex flex-col">
          <PostInput setPosts={setComments} isCommentInput={true} commentedPostId={postInfo.post_id} placeholder="¿Que piensas de este post?" />
          {parentPost && <>
            <CPost post={parentPost} />
            <div className="w-0.5 h-[38px] rounded-full bg-white/10 ml-10">

            </div>
          </>}
          <CPost className="border-t" post={postInfo} />

          {comments.length > 0 && <div>
            <div className="w-0.5 h-[38px] rounded-full bg-white/10 ml-10">

            </div>
            <div className="comments-list border-t border-white/20 border-solid">
              {comments.map((comment) => (
                <CPost key={comment.post_id} post={comment} />
              ))}
            </div>
          </div>} {/* TODO: INFINITE SCROLL PARA COMENTARIOS */}
        </div>
      }
    </>
  )
}