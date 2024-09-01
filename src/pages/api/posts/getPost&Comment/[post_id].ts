import type { APIRoute } from "astro"
import { Likes, Posts, Users, and, db, eq } from "astro:db";
import { validateReferer } from "../../users/post";
import { sql } from "astro:db";
import { alias } from "astro:db";

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const postId = params.post_id as string
    const CommentsAlias = alias(Posts, "CommentsAlias")

    const postInfo = await db.select({
      post_id: Posts.post_id,
      user_id: Posts.user_id,
      image: Users.image,
      username: Users.username,
      name: Users.name,
      body: Posts.body,
      created_at: Posts.created_at,
      is_comment: Posts.is_comment,
      commented_post_id: Posts.commented_post_id,
      likes_count: sql<number>`count(${Likes.post_id})`,
      comments_count: sql<number>`count(DISTINCT ${CommentsAlias.post_id})`
    })
    .from(Posts)
    .leftJoin(Users, eq(Posts.user_id, Users.user_id))
    .leftJoin(Likes, eq(Posts.post_id, Likes.post_id))
    .leftJoin(CommentsAlias,
      eq(Posts.post_id, CommentsAlias.commented_post_id)
    )
    .where(eq(Posts.post_id, parseInt(postId)))
    .groupBy(
      Posts.post_id,
      Posts.user_id
    )

    const commentsList = await db.select({
      post_id: Posts.post_id,
      user_id: Posts.user_id,
      image: Users.image,
      username: Users.username,
      name: Users.name,
      body: Posts.body,
      created_at: Posts.created_at,
      commented_post_id: Posts.commented_post_id,
      is_comment: Posts.is_comment,
      likes_count: sql<number>`count(${Likes.post_id})`,
      comments_count: sql<number>`count(DISTINCT ${CommentsAlias.post_id})`
    })
    .from(Posts)
    .leftJoin(Users, eq(Posts.user_id, Users.user_id))
    .leftJoin(Likes, eq(Posts.post_id, Likes.post_id))
    .leftJoin(CommentsAlias,
      eq(Posts.post_id, CommentsAlias.commented_post_id)
    )
    .where(
      eq(Posts.commented_post_id, parseInt(postId))
    )
    .groupBy(
      Posts.post_id,
      Posts.user_id
    )

    if (postInfo.length === 0) {
      return new Response(JSON.stringify({
        error: "Post no encontrado.",
      }), {
        status: 404,
      })
    }
    return new Response(JSON.stringify({
      postInfo: postInfo[0],
      commentsList: commentsList
    }))
  })
}