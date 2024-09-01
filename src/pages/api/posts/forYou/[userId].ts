import type { APIRoute } from "astro"
import { Users, and, db, eq, exists, notExists, sql } from "astro:db";
import { validateReferer } from "../../users/post";
import { Follows } from "astro:db";
import { desc } from "astro:db";
import { Posts } from "astro:db";
import queryString from "query-string";
import { Likes } from "astro:db";
import { alias } from "astro:db";
import { isNull } from "astro:db";

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
  const userId = parseInt(params.userId as string)
  const page = queryString.parseUrl(request.url).query.page ? parseInt(queryString.parseUrl(request.url).query.page as string) : 0
  const CommentsAlias = alias(Posts, "CommentsAlias")
  console.log(queryString.parseUrl(request.url))

  const LikesCount = db
  .select({
    post_id: Likes.post_id,
    count: sql<number>`count(${Likes.like_id})`.as('likes_count'),
  })
  .from(Likes)
  .groupBy(Likes.post_id)
  .as('LikesCount');

  const FollowersCount = db
  .select({
    user_id: Follows.followed_id,
    count: sql<number>`count(${Follows.follower_id})`.as('followers'),
  })
  .from(Follows)
  .groupBy(Follows.followed_id)
  .as('FollowersCount');
  
  const postFromFolloweds = await db.select({
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
    and(
      exists(
        db.select().from(Follows).where(and(eq(Follows.followed_id, Users.user_id), eq(Follows.follower_id, userId)))
      ),
      notExists(
      db
        .select()
        .from(Likes)
        .where(and(eq(Likes.post_id, Posts.post_id), eq(Likes.user_id, userId)))
      ),
      isNull(Posts.is_comment)
    )
  )
  .groupBy(
    Posts.post_id,
    Posts.user_id
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
      followers: FollowersCount.count,
      likes_count: LikesCount.count,
      comments_count: sql<number>`count(DISTINCT ${CommentsAlias.post_id})`,
    })
    .from(Posts)
    .leftJoin(Users, eq(Posts.user_id, Users.user_id))
    .leftJoin(LikesCount, eq(Posts.post_id, LikesCount.post_id))
    .leftJoin(CommentsAlias, eq(Posts.post_id, CommentsAlias.commented_post_id))
    .leftJoin(FollowersCount, eq(Users.user_id, FollowersCount.user_id))
    .where(
      and(
        notExists(
          db
            .select()
            .from(Follows)
            .where(and(eq(Follows.follower_id, userId), eq(Follows.followed_id, Users.user_id)))
        ),
        notExists(
          db
            .select()
            .from(Likes)
            .where(and(eq(Likes.post_id, Posts.post_id), eq(Likes.user_id, userId)))
        ),
        isNull(Posts.is_comment)
      )
    )
    .groupBy(Posts.post_id, Posts.user_id, Users.user_id)
    .orderBy(({ followers }) => desc(followers))
    .limit(10)
    .offset(10 * page);

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
      followers: FollowersCount.count,
      likes_count: LikesCount.count,
      comments_count: sql<number>`count(DISTINCT ${CommentsAlias.post_id})`,
    })
    .from(Posts)
    .leftJoin(Users, eq(Posts.user_id, Users.user_id))
    .leftJoin(LikesCount, eq(Posts.post_id, LikesCount.post_id))
    .leftJoin(CommentsAlias, eq(Posts.post_id, CommentsAlias.commented_post_id))
    .leftJoin(FollowersCount, eq(Users.user_id, FollowersCount.user_id))
    .where(
      and(
        notExists(
          db
            .select()
            .from(Follows)
            .where(and(eq(Follows.follower_id, userId), eq(Follows.followed_id, Users.user_id)))
        ),
        notExists(
          db
            .select()
            .from(Likes)
            .where(and(eq(Likes.post_id, Posts.post_id), eq(Likes.user_id, userId)))
        ),
        isNull(Posts.is_comment)
      )
    )
    .groupBy(Posts.post_id, Posts.user_id, Users.user_id) 
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