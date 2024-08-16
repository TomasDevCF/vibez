import type { APIRoute } from "astro"
import { Users, db } from "astro:db";
import type { AuthData } from "../../../layouts/SignForm";
import bcrypt from "bcrypt"
import { validateReferer } from "./post";

export const POST: APIRoute = async ({ request }) => {
  const data: AuthData = await request.json()
  const email = data.email
  const name = data.name
  const password = data.password
  const username = data.username
  return validateReferer(request, async () => {
    if (!email || !name || !password || !username) {
      console.log(email, name, password, username)
      return new Response(JSON.stringify({
        message: "Todos los campos son requeridos",
        error: 400
      }), {
        status: 400,
      })
    } else {
      // Crear un nuevo usuario.
      await db.insert(Users).values([
        {
          name,
          email,
          username,
          created_at: new Date(),
          password: bcrypt.hashSync(password, 10),
        }
      ])
      return new Response(JSON.stringify({
        message: "Usuario creado con éxito",
        username,
        }), {
          status: 201
        })
  
    }
  })
  

}