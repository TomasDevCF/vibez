import type { APIRoute } from 'astro'
import { Follows, and, db, eq } from 'astro:db';
import { validateReferer } from '../users/post';

export const DELETE: APIRoute = async ({ request, params }) => {
  const data = await request.json()
  return validateReferer(request, async () => {
      const follow_id = await db.delete(Follows).where(and(eq(Follows.followed_id, data.followed_id), eq(Follows.follower_id, data.follower_id))).returning({ follow_id: Follows.follow_id})


      if (follow_id) {
        return new Response(JSON.stringify({
          follow_id,
        }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        }) 
      } else {
        return new Response(JSON.stringify({
          error: 'Error al poner el follow',
          }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
    
  })
}