import queryString from 'query-string';
import type { APIRoute } from 'astro'
import { Users, db } from 'astro:db';
import {validateDate} from '../../../layouts/Layout.astro'

export function validateReferer(request: Request, next: () => Promise<Response>) {
  const referer = request.headers.get('referer');

  if (referer && referer.startsWith('http://localhost:4321')) {
    return next();
  } else {
    return new Response(null, { status: 403 });
  }
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const email = data.get('email') as string
  const name = data.get('name') as string
  const image = data.get('image') as string
  const birth = new Date(data.get('birth') as string)
  const username = data.get('username') as string
  return validateReferer(request, async () => {
    const isValid = validateDate(birth)
    if (!isValid) {
      return new Response(JSON.stringify({
        message: 'Debes ser mayor a 14 años para usar Vibez.',
        error: 400
      }), {
        status: 400,
      })
    }
  
    // Validar si existen todos los datos.
    if (!email || !name || !image || !username) {
      console.log(email, name, image, username)
      return new Response(JSON.stringify({
        message: 'Todos los campos son requeridos',
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
        message: 'Usuario creado con éxito',
        username,
        }), {
          status: 201
        })
  
    }
  })

  

}