import type { APIRoute } from 'astro'
import { Images, Likes, Posts, Users, db, eq } from 'astro:db';
import { validateReferer } from '../../users/post';

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const postId = params.post_id as string

    const images = await db.select()
    .from(Images)
    .where(eq(Images.post_id, parseInt(postId)))
    return new Response(JSON.stringify(images))
  })
}