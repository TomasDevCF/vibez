import bcrypt from 'bcrypt';
import type { APIRoute } from "astro"
import { Users, db, eq } from "astro:db";
import { validateReferer } from "../post";

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const password = params.password as string
    const encryptedPassword = bcrypt.hashSync(password, 10)
  
    return new Response(JSON.stringify({
      encryptedPassword
    }))
  })
}