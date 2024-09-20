import type { APIRoute } from 'astro'
import { Likes, Posts, db, eq } from 'astro:db';
import { validateReferer } from '../../users/post';
import { sql } from 'astro:db';
import { alias } from 'astro:db';

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const postId = params.post_id as string

    const postLikes = await db.select({
      likes_count: sql<number>`count(${Likes.post_id})`,
    })
    .from(Posts)
    .leftJoin(Likes, eq(Posts.post_id, Likes.post_id))
    .where(eq(Posts.post_id, parseInt(postId)))
    .groupBy(
      Posts.post_id,
    )

    return new Response(JSON.stringify(postLikes[0]))
  })
}