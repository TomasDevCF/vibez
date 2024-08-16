import type { APIRoute } from "astro"
import { Users, db, eq } from "astro:db";
import { validateReferer } from "../post";

export const GET: APIRoute = async ({ params, request }) => {
  const email = params.email
  return validateReferer(request, async () => {
    try {
      if (email) {
        console.log("A")
        const userInfo = await db.select().from(Users).where(
          eq(Users.email, email as string)
        );
        console.log("B")
      
        console.log(userInfo, "HOLAHOLA")
      
        return new Response(JSON.stringify({
          isSessionExist: userInfo.length != 0,
          userId: userInfo.length == 0 ? -1 : userInfo[0].user_id
        }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        return new Response(JSON.stringify({
          error: "Session is empty"
          }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              },
              })
      }
    } catch (err) {
      return new Response(JSON.stringify(err), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            },
            })
      
    }
  })
  
}