import { signOut } from "auth-astro/client";
import { useEffect } from "react";
import Cookies from "js-cookie"
import { verifySession } from "../../pages/oauth.astro";
import type { Session } from "../../layouts/SignForm";

interface Props {
  session?: Session
}

export default function SessionLoader({ session }: Props) {
  useEffect(() => {
    verifySession(session).then(sessionData => {
      console.log(session)
      console.log(sessionData)
      if (sessionData) {
        if (sessionData.isSessionExist) {
          Cookies.set("accountId", sessionData.userId);
          signOut({
            callbackUrl: "/",
          });
        } else {
          window.location.href = "/register/oauth"
        }
      } else {
        window.location.href = "/register"
      }
    })
  }, [])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        role="status"
        className="flex flex-col justify-center items-center gap-y-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="inline w-12 h-12 animate-spin text-white"
        >
          <path
            fill="currentColor"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          >
          </path>
        </svg>
        <span className="text-lg font-bold text-white">Cargando tu sesion...</span>
      </div>
    </div >
  )
}
