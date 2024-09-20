import type { APIRoute } from 'astro'
import { Likes, Posts, Users, and, db, eq } from 'astro:db';
import { validateReferer } from '../../users/post';
import { sql } from 'astro:db';
import { alias } from 'astro:db';
import { Images } from 'astro:db';

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const postId = params.post_id as string
    const CommentsAlias = alias(Posts, 'CommentsAlias')

    const LikesCount = db
  .select({
    post_id: Likes.post_id,
    count: sql<number>`count(${Likes.like_id})`.as('likes_count'),
  })
  .from(Likes)
  .groupBy(Likes.post_id)
  .as('LikesCount');

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
      likes_count: sql<number>`count(${LikesCount.post_id})`,
      comments_count: sql<number>`count(DISTINCT ${CommentsAlias.post_id})`,
      images: sql<string | null>`
      CASE 
        WHEN count(${Images.image_id}) = 0 THEN NULL
        ELSE json_group_array(
          json_object('image_id', ${Images.image_id}, 'post_id', ${Images.post_id}, 'image_url', ${Images.image_url})
        )
      END
    `.as('images'),
  })
  .from(Posts)
  .leftJoin(Users, eq(Posts.user_id, Users.user_id))
  .leftJoin(LikesCount, eq(Posts.post_id, LikesCount.post_id))
  .leftJoin(CommentsAlias, eq(Posts.post_id, CommentsAlias.commented_post_id))
  .leftJoin(Images, eq(Posts.post_id, Images.post_id))
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
      likes_count: sql<number>`count(${LikesCount.post_id})`,
      comments_count: sql<number>`count(DISTINCT ${CommentsAlias.post_id})`,
      images: sql<string | null>`
      CASE 
        WHEN count(${Images.image_id}) = 0 THEN NULL
        ELSE json_group_array(
          json_object('image_id', ${Images.image_id}, 'post_id', ${Images.post_id}, 'image_url', ${Images.image_url})
        )
      END
    `.as('images'),
  })
  .from(Posts)
  .leftJoin(Users, eq(Posts.user_id, Users.user_id))
  .leftJoin(LikesCount, eq(Posts.post_id, LikesCount.post_id))
  .leftJoin(CommentsAlias, eq(Posts.post_id, CommentsAlias.commented_post_id))
  .leftJoin(Images, eq(Posts.post_id, Images.post_id))
    .where(
      eq(Posts.commented_post_id, parseInt(postId))
    )
    .groupBy(
      Posts.post_id,
      Posts.user_id
    )

    if (postInfo.length === 0) {
      return new Response(JSON.stringify({
        error: 'Post no encontrado.',
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