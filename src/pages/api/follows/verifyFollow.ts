import type { APIRoute } from 'astro'
import { Follows, and, db } from 'astro:db';
import { validateReferer } from '../users/post';
import { eq } from 'astro:db';

export const POST: APIRoute = async ({ request, params }) => {
  const data = await request.json()
  return validateReferer(request, async () => {
      const followsData = await db.select().from(Follows)
      .where(and(eq(Follows.followed_id, data.followed_id), eq(Follows.follower_id, data.follower_id)))


        return new Response(JSON.stringify({
          isFollow: followsData.length != 0,
        }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        }) 
      
    
  })
}