import React, { useEffect, useState } from "react"
import { signOut } from "auth-astro/client";
import Cookies from "js-cookie"
import queryString from 'query-string'

interface Session {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: string
}

interface Props {
  action?: string
  formType: "oauth" | "register" | "login"
  session?: Session
  children: React.ReactNode
}

export default function SignForm({ action, formType, session, children }: Props) {
  const [message, setMessage] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (action) {
      fetch(action, {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message)
          if (data.error) {
            setMessage(data.message)
          } else if (data.message === "Usuario creado con éxito") {
            console.log("Hola")
            fetch(`/api/users/getUserId/${data.username}`)
              .then(res => res.json())
              .then(data => Cookies.set("accountId", data.userId));
            signOut()
          } else {
            setMessage(null)
          }
        })
    }
  }

  useEffect(() => {
    if (formType === "oauth") {
      fetch(`/api/users/verifyEmailDuplicate/${session?.user?.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.alreadyExistEmail) {
            signOut({
              callbackUrl: "/register?errorMessage=emailInUse"
            })
          }
        })
    }

    if (formType === "register") {
      const params = queryString.parse(location.search)
      if (params.errorMessage === "emailInUse") {
        setMessage("El correo electrónico ya está en uso. Intente iniciar sesión")
      }
    }
  }, [])

  return (
    <main className="flex justify-center items-center min-h-dvh">
      <form
        onSubmit={handleSubmit}
        className="h-max w-[500px] mx-auto my-0 rounded-lg bg-white/10 py-4"
      >
        <div className="flex justify-between px-4 items-center">
          <img
            src="/images/cutlogo.png"
            alt="logo de vibez"
            className="w-[50px] h-[50px] rounded-full"
          />
          <h1 className="text-2xl text-white font-bold">Registrate en Vibez</h1>
        </div>
        <div
          className="flex flex-col gap-2 px-[80px] justify-center items-center pt-4"
        >
          {children}
          <span
            className="text-red-600 text-sm text-start m-0 p-0 text-medium"
          >{message && message}</span>
        </div>
      </form>
    </main>
  )
}