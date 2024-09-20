import type { APIRoute } from 'astro'
import { Follows, Users, db, eq, sql } from 'astro:db';
import { validateReferer } from '../post';
import Cookies from 'js-cookie'

export const GET: APIRoute = async ({ params, request, redirect }) => {
  return validateReferer(request, async () => {
    const userId = params.user_id as string
    const followsInfo = await db.select({
      followers: sql<number>`count(DISTINCT ${Follows.follower_id})`,
      following: sql<number>`count(DISTINCT ${Follows.followed_id})`
    }).from(Users)
    .where(
      eq(Users.user_id, parseInt(userId))
    )
    .leftJoin(Follows, eq(Users.user_id, Follows.followed_id))
    .groupBy(Users.user_id);

    console.log(followsInfo)

    if (followsInfo.length === 0) {
      Cookies.remove('accountId')
      redirect('/register')
      return new Response(JSON.stringify({
        error: 'Usuario no encontrado.',
      }), {
        status: 404,
      })
    }
    return new Response(JSON.stringify(followsInfo[0]))
  })
}