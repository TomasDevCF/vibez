import type { APIRoute } from 'astro'
import { Users, and, count, db, eq, exists, sql } from 'astro:db';
import { validateReferer } from '../post';
import { Follows } from 'astro:db';
import { not } from 'astro:db';
import { desc } from 'astro:db';

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const userId = parseInt(params.userId as string)
    const userInfo = await db.select({
      user_id: Users.user_id,
      username: Users.username,
      image: Users.image,
      name: Users.name,
      follower_count: sql`count(DISTINCT ${Follows.follower_id})`.as('follower_count'),
    })
    .from(Users)
    .leftJoin(Follows, eq(Users.user_id, Follows.followed_id))
    .where(
      not(
        exists(
          db.select().from(Follows).where(and(eq(Follows.followed_id, Users.user_id), eq(Follows.follower_id, userId)))
        )
      )
    )
    .groupBy(Users.user_id)
    .orderBy(({ follower_count }) => desc(follower_count))
    .limit(8);
    console.log(userInfo)

      if (userInfo.length === 0) {
        return new Response(JSON.stringify({
          error: 'Usuarios no encontrados',
        }), {
          status: 404,
        })
      }
      return new Response(JSON.stringify(userInfo))
  })
}