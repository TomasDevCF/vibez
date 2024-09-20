import type { APIRoute } from 'astro'
import { Likes, Users, and, db, eq } from 'astro:db';
import { validateReferer } from '../users/post';

export const DELETE: APIRoute = async ({ request, params }) => {
  const data = await request.json()
  return validateReferer(request, async () => {
      const like_id = await db.delete(Likes)
      .where(and(eq(Likes.user_id, data.user_id), eq(Likes.post_id, data.post_id)))
      .returning({like_id: Likes.like_id})

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
          error: 'Error al eliminar el like',
          }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
    
  })
}