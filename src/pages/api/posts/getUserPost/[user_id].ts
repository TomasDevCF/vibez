import type { APIRoute } from "astro"
import { Users, db, eq, sql } from "astro:db";
import { validateReferer } from "../../users/post";
import { Posts } from "astro:db";
import queryString from "query-string";
import { Likes } from "astro:db";
import { alias } from "astro:db";
import { desc } from "astro:db";

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
  const userId = parseInt(params.user_id as string)
  const page = queryString.parseUrl(request.url).query.page ? parseInt(queryString.parseUrl(request.url).query.page as string) : 0
  const CommentsAlias = alias(Posts, "CommentsAlias")
  console.log(page, queryString.parse(request.url).page)
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
    comments_count: sql<number>`count(DISTINCT ${CommentsAlias.post_id})`
  })
  .from(Posts)
  .leftJoin(Users, eq(Posts.user_id, Users.user_id))
  .leftJoin(LikesCount, eq(Posts.post_id, LikesCount.post_id))
  .leftJoin(CommentsAlias,
    eq(Posts.post_id, CommentsAlias.commented_post_id)
  )
  .where(
    eq(Posts.user_id, userId)
  )
  .groupBy(
    Posts.post_id,
    Posts.user_id
  )
  .orderBy(desc(Posts.created_at))
  .limit(10)
  .offset(10 * page)

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json',
      },
  })
  })
}