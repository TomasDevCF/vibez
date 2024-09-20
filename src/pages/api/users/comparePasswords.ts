import bcrypt from 'bcrypt';
import type { APIRoute } from 'astro'
import { Users, db, eq } from 'astro:db';
import { validateReferer } from './post';

export const POST: APIRoute = async ({ request }) => {
  const passwords = await request.json()
  return validateReferer(request, async () => {
    const isSamePassword = bcrypt.compareSync(passwords.password, passwords.hashPassword)
    return new Response(JSON.stringify({
      isSamePassword
    }), {
      status: 200,
    })
  })
  
}