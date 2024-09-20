import type { APIRoute } from 'astro'
import { Users, db, eq } from 'astro:db';
import { validateReferer } from '../post';

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const usernameOrEmail = params.usernameOrEmail as string
    const usersInfo = await db.select().from(Users).where(
      eq(usernameOrEmail.includes('@') ? Users.email : Users.username, usernameOrEmail)
    );

    if (usersInfo.length > 0 && usersInfo[0].password) {
      return new Response(JSON.stringify({
        hashPassword: usersInfo[0].password
      }))
    } else if (usersInfo.length > 0 && !usersInfo[0].password) {
      return new Response(JSON.stringify({
        hashPassword: null
      }))
    } else {
      return new Response(JSON.stringify({
        message: 'Usuario o email incorrecto.'
        }), {
          status: 404
        })
    }
  
    
  })
}