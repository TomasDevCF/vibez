import type { APIRoute } from "astro"
import { Likes, Posts, Users, db, eq, Follows, and,  } from "astro:db";

export function validateReferer(request: Request, next: () => Promise<Response>) {
  const referer = request.headers.get('referer');

  if (referer && referer.startsWith('http://localhost:4321')) {
    return next();
  } else {
    return new Response(null, { status: 403 });
  }
}

export const DELETE: APIRoute = async ({ request }) => {
  const {userId} = await request.json()
  return validateReferer(request, async () => {
    console.log(userId)
    const deletedUserId = await db.delete(Users).where(eq(Users.user_id, userId)).returning({userId: Users.user_id})
    await db.delete(Posts).where(eq(Posts.user_id, userId))
    await db.delete(Follows).where(and(eq(Follows.follower_id, userId), eq(Follows.followed_id, userId)))
    await db.delete(Likes).where(eq(Users.user_id, userId))

    return new Response(JSON.stringify({
      message: "User deleted successfully",
      deletedUserId: deletedUserId[0].userId
    }), { status: 204 })
  })

  

}