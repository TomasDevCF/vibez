import type { APIRoute } from 'astro'
import { Posts, db } from 'astro:db';
import { validateReferer } from '../users/post';

export const POST: APIRoute = async ({ request }) => {
  return validateReferer(request, async () => {
    const {body, user_id, commented_post_id} = await request.json()
  
    if (!body || !user_id) {
      return new Response(JSON.stringify({
        message: 'Todos los campos son requeridos',
        error: 400
      }), {
        status: 400,
      })
    } else {
      const post = await db.insert(Posts).values([
        {
          body,
          created_at: new Date(),
          user_id,
          commented_post_id: commented_post_id ? commented_post_id : null,
          is_comment: commented_post_id ? true : false
        }
      ]).returning()
      console.log(post)
      return new Response(JSON.stringify({
        message: 'Post creado con éxito',
        post,
        }), {
          status: 201
        })
  
    }
  })

  

}