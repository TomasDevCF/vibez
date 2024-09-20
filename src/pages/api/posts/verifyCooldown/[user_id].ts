import type { APIRoute } from 'astro'
import { Posts, db, desc, eq } from 'astro:db';
import { validateReferer } from '../../users/post';

function validateDate(date: Date) {
  const twoMinutes = 2 * 60 * 1000; 
  const now = new Date().getTime();
  const dateTime = date.getTime();

  return (now - dateTime) > twoMinutes;
}

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const user_id = params.user_id
    const likes = await db.select().from(Posts).where(eq(Posts.user_id, parseInt(user_id as string))).orderBy(desc(Posts.created_at)).limit(1)

      return new Response(JSON.stringify({
        allowed: likes.length === 0 || validateDate(likes[0].created_at),
      }))
  })
}