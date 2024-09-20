import type { APIRoute } from 'astro'
import { Users, db, eq } from 'astro:db';

export function validateReferer(request: Request, next: () => Promise<Response>) {
  const referer = request.headers.get('referer');

  if (referer && referer.startsWith('http://localhost:4321')) {
    return next();
  } else {
    return new Response(null, { status: 403 });
  }
}

export const PUT: APIRoute = async ({ request, params }) => {
  const data = await request.json()
  const {user_id} = params
  return validateReferer(request, async () => {
      const id = await db.update(Users).set(data).where(eq(Users.user_id, parseInt(user_id as string))).returning({id: Users.user_id})

        return new Response(JSON.stringify({
          userEdited: id[0].id === parseInt(user_id as string)
        }))
    })

}