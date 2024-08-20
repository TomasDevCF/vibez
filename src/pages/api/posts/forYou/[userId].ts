import type { APIRoute } from "astro"
import { Users, and, count, db, eq, exists, notExists, sql } from "astro:db";
import { validateReferer } from "../../users/post";
import { Follows } from "astro:db";
import { not } from "astro:db";
import { desc } from "astro:db";
import { Posts } from "astro:db";
import queryString from "query-string";

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
  const userId = parseInt(params.userId as string)
  const page = queryString.parse(request.url).page ? parseInt(queryString.parse(request.url).page as string) : 0
  const postFromFolloweds = await db.select({
    post_id: Posts.post_id,
    user_id: Posts.user_id,
    image: Users.image,
    username: Users.username,
    name: Users.name,
    body: Posts.body,
    created_at: Posts.created_at,
  })
  .from(Posts)
  .leftJoin(Users, eq(Posts.user_id, Users.user_id))
  .where(
    exists(
      db.select().from(Follows).where(and(eq(Follows.followed_id, Users.user_id), eq(Follows.follower_id, userId)))
    )
  )
  .limit(6)
  .offset(6 * page)

  if (postFromFolloweds.length === 0) {
    const posts = await db.select({
      post_id: Posts.post_id,
      user_id: Posts.user_id,
      image: Users.image,
      username: Users.username,
      name: Users.name,
      body: Posts.body,
      created_at: Posts.created_at,
      followers: sql`count(${Follows.follower_id})`.as('followers')
    })
    .from(Posts)
    .leftJoin(Users, eq(Posts.user_id, Users.user_id))
    .leftJoin(Follows, eq(Users.user_id, Follows.followed_id))
    .where(notExists(
      db.select().from(Follows).where(and(eq(Follows.follower_id, userId), eq(Follows.followed_id, Users.user_id)))
    ))
    .groupBy(Posts.post_id, Users.user_id) 
    .orderBy(({ followers }) => desc(followers))
    .limit(10)
    .offset(10 * page)

    return new Response(JSON.stringify(posts.sort(() => Math.random() - 0.5)), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    })
  } else {
    const posts = await db.select({
      post_id: Posts.post_id,
      user_id: Posts.user_id,
      image: Users.image,
      username: Users.username,
      name: Users.name,
      body: Posts.body,
      created_at: Posts.created_at,
      followers: sql`count(${Follows.follower_id})`.as('followers')
    })
    .from(Posts)
    .leftJoin(Users, eq(Posts.user_id, Users.user_id))
    .leftJoin(Follows, eq(Users.user_id, Follows.followed_id))
    .where(notExists(
      db.select().from(Follows).where(and(eq(Follows.follower_id, userId), eq(Follows.followed_id, Users.user_id)))
    ))
    .groupBy(Posts.post_id, Users.user_id) 
    .orderBy(({ followers }) => desc(followers))
    .limit(10)
    .offset(10 * page)

    return new Response(JSON.stringify([...postFromFolloweds, ...posts].sort(() => Math.random() - 0.5)), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    })
  }
  })
}