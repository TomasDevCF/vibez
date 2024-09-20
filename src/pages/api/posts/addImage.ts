import type { APIRoute } from 'astro'
import { Images, Posts, db } from 'astro:db';
import { validateReferer } from '../users/post';

export const POST: APIRoute = async ({ request }) => {
  return validateReferer(request, async () => {
    const {post_id, image_url} = await request.json()
  
    if (!image_url || !post_id) {
      return new Response(JSON.stringify({
        message: 'Todos los campos son requeridos',
        error: 400
      }), {
        status: 400,
      })
    } else {
      const image = await db.insert(Images).values([
        {
          image_url,
          post_id
        }
      ]).returning()

      return new Response(JSON.stringify({
        message: 'Imagen creada con éxito',
        image: image[0],
        }), {
          status: 201
        })
  
    }
  })

  

}