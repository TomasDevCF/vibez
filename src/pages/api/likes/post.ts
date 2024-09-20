import type { APIRoute } from 'astro'
import { Likes, Users, db } from 'astro:db';
import { validateReferer } from '../users/post';

export const POST: APIRoute = async ({ request, params }) => {
  const data = await request.json()
  return validateReferer(request, async () => {
      const like_id = await db.insert(Likes).values({created_at: new Date(), post_id: data.post_id, user_id: data.user_id}).returning({ like_id: Likes.like_id})

      if (like_id) {
        return new Response(JSON.stringify({
          like_id,
        }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        }) 
      } else {
        return new Response(JSON.stringify({
          error: 'Error al poner el like',
          }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
    
  })
}