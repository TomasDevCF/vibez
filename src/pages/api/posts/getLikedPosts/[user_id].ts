import type { APIRoute } from 'astro'
import { Users, and, db, eq, exists, notExists, sql } from 'astro:db';
import { validateReferer } from '../../users/post';
import { Follows } from 'astro:db';
import { desc } from 'astro:db';
import { Posts } from 'astro:db';
import queryString from 'query-string';
import { Likes } from 'astro:db';
import { alias } from 'astro:db';
import { isNull } from 'astro:db';
import { Images } from 'astro:db';

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
  const userId = parseInt(params.user_id as string)
  const page = queryString.parse(request.url).page ? parseInt(queryString.parse(request.url).page as string) : 0
  const CommentsAlias = alias(Posts, 'CommentsAlias')

  const LikesCount = db
  .select({
    post_id: Likes.post_id,
    count: sql<number>`count(${Likes.like_id})`.as('likes_count'),
  })
  .from(Likes)
  .groupBy(Likes.post_id)
  .as('LikesCount');
  
  const posts = await db.select({
    post_id: Posts.post_id,
    user_id: Posts.user_id,
    image: Users.image,
    username: Users.username,
    name: Users.name,
    body: Posts.body,
    created_at: Posts.created_at,
    likes_count: LikesCount.count,
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
  .leftJoin(Likes, eq(Posts.post_id, Likes.post_id))
  .where(eq(Likes.user_id, userId))
  .groupBy(
    Posts.post_id,
    Posts.user_id
  )
  .limit(10)
  .offset(10 * page);

  console.log(posts)

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json',
      },
  })
  })
}