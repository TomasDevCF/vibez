import type { APIRoute } from "astro"
import { Images, Likes, Posts, db, eq } from "astro:db";
import { validateReferer } from "../../users/post";

export const DELETE: APIRoute = async ({ request, params }) => {
  const {post_id} = params
  return validateReferer(request, async () => {
      
      const likes = await db.delete(Likes)
      .where(
        eq(Likes.post_id, parseInt(post_id as string))
      )
      .returning({post_id: Likes.post_id})
  
      const images = await db.delete(Images)
      .where(
        eq(Images.post_id, parseInt(post_id as string))
      )
      .returning({post_id: Images.post_id})

      const post = await db.delete(Posts)
      .where(
        eq(Posts.post_id, parseInt(post_id as string))
      )
      .returning({post_id: Posts.post_id})

      if (post && likes && images) {
        return new Response(JSON.stringify({
          success: true,
        }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        }) 
      } else {
        return new Response(JSON.stringify({
          error: 'Error al eliminar el post',
          }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
    
  })
}