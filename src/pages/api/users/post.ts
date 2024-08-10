import type { APIRoute } from "astro"
import { Users, db } from "astro:db";


function validateDate(date: Date): boolean {
  const nowDate = new Date();
  const limitDate = new Date();

  limitDate.setFullYear(nowDate.getFullYear() - 14);

  return date <= limitDate;
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const email = data.get("email") as string
  const name = data.get("name") as string
  const image = data.get("image") as string
  const birth = new Date(data.get("birth") as string)
  const username = data.get("username") as string
  

  // Validando si el usuario es mayor a 14 años.
  const isValid = validateDate(birth)
  if (!isValid) {
    return new Response(JSON.stringify({
      message: "Debes ser mayor a 14 años para usar Vibez.",
      error: 400
    }), {
      status: 400,
    })
  }

  // Validar si existen todos los datos.
  if (!email || !name || !image || !username) {
    console.log(email, name, image, username)
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
        image
      }
    ])
    return new Response(JSON.stringify({
      message: "Usuario creado con éxito",
      username,
      }), {
        status: 201
      })

  }

}