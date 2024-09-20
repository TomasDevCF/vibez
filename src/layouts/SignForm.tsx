import React, { useEffect, useState } from "react"
import { signOut } from "auth-astro/client";
import Cookies from "js-cookie"
import queryString from "query-string"
import { validateDate, validateEmail } from "./Layout.astro";
import CommonAuthForm from "../components/CommonAuthForm";
import { verifySession } from "../pages/oauth.astro";

export interface Session {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: string
}

export interface AuthData {
  name: string
  username: string
  email: string
  password: string
}

interface Props {
  action?: string
  formType: "oauth" | "register" | "login"
  session?: Session
  children: React.ReactNode
}


export async function verifyUsername(username: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/users/isUsernameExist/${username.toLocaleLowerCase()}`)
    const data = await res.json()

    return data.usernameExist
  } catch (err) {
    console.log(err)
    return false
  }
}

export default function SignForm({ action, formType, session, children }: Props) {
  const [message, setMessage] = useState<string | null>(null)
  const [authData, setAuthData] = useState<AuthData>({ name: "", email: "", password: "", username: "" })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage("")

    if (action) {
      if (formType === "oauth") {
        const body = new FormData(e.target as HTMLFormElement)
        if (!(await verifyUsername(body.get("username") as string))) {
          fetch(action + ``, {
            method: "POST",
            body: new FormData(e.target as HTMLFormElement)
          })
            .then(res => res.json())
            .then(data => {
              if (data.error) {
                setMessage(data.message)
              } else if (data.message === "Usuario creado con éxito") {
                fetch(`/api/users/getUserId/${data.username}`)
                  .then(res => res.json())
                  .then(data => {
                    Cookies.set("accountId", data.userId)
                    signOut()
                  });

              } else {
                setMessage(null)
              }
            })
        } else {
          setMessage("El nombre de usuario ya esta en uso.")
        }

      }
    }

    if (formType === "register") {
      const data = new FormData(e.target as HTMLFormElement)
      const isValidEmail = await validateEmail(data.get("email") as string)

      fetch(`/api/users/isEmailExist/${data.get("email") as string}`)
        .then(res => res.json())
        .then(data => {
          if (data.alreadyExistEmail) {
            return window.location.href = "/register?errorMessage=emailInUse"
          }
        });

      if (data.get("birth") && !validateDate(new Date(data.get("birth") as string))) {
        return setMessage("Debes ser mayor a 14 años para usar Vibez.")
      } else if (!isValidEmail) {
        return setMessage("Correo electronico no válido")
      } else if (data.get("password") == data.get("confirm-password")) {
        setAuthData({
          name: data.get("name") as string,
          email: data.get("email") as string,
          password: data.get("password") as string,
          username: (data.get("username") as string).toLocaleLowerCase()
        })
      } else {
        return setMessage("Las contraseñas deben ser iguales")
      }
    }

    if (formType === "login") {
      const data = new FormData(e.target as HTMLFormElement)
      const emailOrUsername = (data.get("email_or_username") as string).toLocaleLowerCase()
      const password = data.get("password") as string
      const isValidEmail = await validateEmail(emailOrUsername)
      if (!isValidEmail && emailOrUsername.includes("@")) {
        return setMessage("Correo electronico no válido")
      }

      fetch(`/api/users/isEmailExist/${emailOrUsername}`)
        .then(res => res.json())
        .then(data => {
          if (data.alreadyExistEmail) {
            fetch(`/api/users/getPassword/${emailOrUsername}`)
              .then(res => res.json())
              .then(data => {
                if (!data.hashPassword) {
                  setMessage("Contraseña incorrecta")
                } else {
                  fetch(`/api/users/comparePasswords`, {
                    method: "POST",
                    body: JSON.stringify({
                      password: password,
                      hashPassword: data.hashPassword
                    })
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (!data.isSamePassword) {
                        return setMessage("Contraseña incorrecta")
                      } else {
                        fetch(`/api/users/getUserId/${emailOrUsername}`)
                          .then(res => res.json())
                          .then(data => {
                            Cookies.set("accountId", data.userId)
                            window.location.href = "/"
                          })
                      }
                    })
                }
              })
          } else {
            return setMessage("Correo electronico no registrado")
          }
        })
    }
  }

  useEffect(() => {
    if (formType === "oauth") {
      fetch(`/api/users/isEmailExist/${session?.user?.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.alreadyExistEmail) {
            signOut({
              callbackUrl: "/register?errorMessage=emailInUse"
            })
          }
        })

      if (session) {
        verifySession(session)
          .then((sessionData) => {
            if (sessionData) {
              if (sessionData.isSessionExist) {
                Cookies.set("accountId", sessionData.userId);
                signOut({
                  callbackUrl: "/",
                });
              }
            }
          })
          .catch((err) => console.error(err));
      }
    }

    if (formType === "register") {
      const params = queryString.parse(location.search)
      if (params.errorMessage === "emailInUse") {
        setMessage("El correo electrónico ya está en uso. Intente iniciar sesión")
      }
    }
  }, [])

  useEffect(() => {
    if (authData.password) {
      console.log("Entro")
      fetch(`/api/users/postWithPassword`, {
        method: "POST",
        body: JSON.stringify(authData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setMessage(data.message)
          } else if (data.message === "Usuario creado con éxito") {
            fetch(`/api/users/getUserId/${data.username}`)
              .then(res => res.json())
              .then(data => {
                Cookies.set("accountId", data.userId)
                window.location.href = "/"
              });

          } else {
            setMessage(null)
          }
        })

    }
  }, [authData])

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="h-max w-[500px] mx-auto my-0 rounded-lg bg-white/10 py-4"
      >
        <div className="flex justify-between px-4 items-center">
          <img
            src="/images/cutlogo.png"
            alt="logo de vibez"
            className="w-[50px] h-[50px] object-cover"
          />
          <h1 className="text-2xl text-white font-bold">Ingresa en Vibez</h1>
        </div>
        <div
          className="flex flex-col gap-2 px-[80px] justify-center items-center pt-4"
        >
          {authData.email ? <CommonAuthForm authData={authData} /> : children}
          <span
            className="text-red-600 text-sm text-start m-0 p-0 text-medium"
          >{message && message}</span>
        </div>
      </form>
    </main>
  )
}