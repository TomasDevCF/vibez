import type { APIRoute } from 'astro'
import { Likes, Users, db, eq } from 'astro:db';
import { validateReferer } from '../users/post';
import { and } from 'astro:db';

export const POST: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const data = await request.json()
    const likes = await db.select().from(Likes).where(and(eq(Likes.user_id, data.user_id), eq(Likes.post_id, data.post_id)))

      return new Response(JSON.stringify({
        isLiked: likes.length != 0,
        like_id: likes.length != 0 ? likes[0].like_id : null 
      }))
  })
}