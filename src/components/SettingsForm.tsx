import { useEffect, useRef, useState, type FormEvent } from "react"
import type { UserInfo } from "../layouts/HomePage.astro"
import FormInput from "./FormInput"

interface Props {
  userInfo: UserInfo
}

export default function SettingsForm({ userInfo }: Props) {
  const textareaRef = useRef(null)
  const [userDataMessage, setUserDataMessage] = useState<string>("")
  const [passwordMessage, setPasswordMessage] = useState<string>("")

  function handleInput(e: FormEvent<HTMLTextAreaElement>) {
    console.log(e)
    if (textareaRef.current) {
      textareaRef.current.style.height = "42px" // eslint
      textareaRef.current.style.height = `${e.target.scrollHeight}px` // eslint-disable-line
    }
  }

  function postData(formData: FormData) {
    const dataToSend: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      if (typeof value === 'string' && value.trim() !== '') { // Verifica que el valor sea string y no esté vacío
        if (value != userInfo[key as keyof UserInfo]) {
          if (key != "description") {
            dataToSend[key] = value.trim();
          } else {
            dataToSend[key] = value
          }
        }
      }
    });

    fetch(`/api/users/editUser/${userInfo.user_id}`, {
      body: JSON.stringify(dataToSend),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.userEdited) {
          return window.location.reload()
        }
      })
  }

  function handleFormUserData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    if (formData.get("username") !== userInfo.username) {
      fetch(`/api/users/isUsernameExist/${formData.get("username")}`)
        .then(res => res.json())
        .then(data => {
          if (!data.usernameExist) {
            postData(formData)
          } else {
            setUserDataMessage("El nombre de usuario ya esta en uso.")
          }
        })
    } else {
      postData(formData)
    }
  }

  function handleFormPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const oldPassword = formData.get("oldPassword")
    const newPassword = formData.get("newPassword")
    if (typeof oldPassword === "string" && typeof newPassword === "string" && newPassword.trim() !== "" && oldPassword.trim() !== "" && oldPassword && newPassword) {
      fetch(`/api/users/getPassword/${userInfo.username}`)
        .then(res => res.json())
        .then(data => {
          if (!data.hashPassword) {
            fetch(`/api/users/encryptPassword/${newPassword}`)
              .then(res => res.json())
              .then(data => {
                const hashPassword = data.encryptedPassword
                formData.delete("oldPassword")
                formData.delete("newPassword")
                formData.set("password", hashPassword)
                postData(formData)
              })
          } else {
            fetch(`/api/users/comparePasswords`, {
              method: "POST",
              body: JSON.stringify({
                password: oldPassword,
                hashPassword: data.hashPassword
              })
            })
              .then(res => res.json())
              .then(data => {
                if (!data.isSamePassword) {
                  return setPasswordMessage("Contraseña incorrecta")
                } else {
                  fetch(`/api/users/encryptPassword/${encodeURIComponent(newPassword)}`)
                    .then(res => res.json())
                    .then(data => {
                      const hashPassword = data.encryptedPassword
                      formData.delete("oldPassword")
                      formData.delete("newPassword")
                      formData.set("password", hashPassword)
                      postData(formData)
                    })
                }
              })
          }
        })
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "42px" // eslint
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // eslint-disable-line
    }
  })

  return (
    <main className="settings-form w-full overflow-y-auto pt-3 px-6 h-full" style={{ scrollbarWidth: "none" }}>
      <h1 className="text-2xl font-medium">Configuracion del perfil</h1>
      <form onSubmit={handleFormUserData} className="flex flex-col pt-4 w-1/2">
        <h2 className="text-xl font-medium pb-2">Datos de usuario</h2>
        <div className="change-image flex gap-2">
          <img src={userInfo.image ? userInfo.image : `https://ui-avatars.com/api/?name=${userInfo.name.charAt(0)}&background=random&bold=true`} className="size-32 rounded-full border-4 border-solid border-black bg-black object-contain" alt={userInfo.name} aria-disabled />
          <div className="flex flex-col justify-around">
            <p className="text-md font-medium">Foto de perfil</p>
            <p className="text-md font-medium text-white/30">JPEG, PNG, etc..</p>
            <button className="rounded-md transition-colors h-[34px] py-1 px-3 font-medium bg-white/30  text-black" disabled>Proximamente</button>
          </div>
        </div>
        <label htmlFor="name" className="pt-2 m-0 pb-1 block text-sm font-medium text-wihte">Nombre</label>
        <FormInput
          value={userInfo.name}
          type="text"
          id="name"
          placeholder="Nombre"
        >
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
            ></path>
          </svg>
        </FormInput>
        <label htmlFor="username" className="pt-2 m-0 pb-1 block text-sm font-medium text-wihte">Nombre de usuario</label>
        <FormInput value={userInfo.username} type="text" id="username" placeholder="Nombre de usuario">
          <svg
            className="w-[20px] h-[20px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M10 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clip-rule="evenodd"></path>
          </svg>
        </FormInput>
        <label htmlFor="email" className="pt-2 m-0 pb-1 block text-sm font-medium text-wihte">Email</label>
        <FormInput
          disabled={true}
          value={userInfo.email}
          type="email"
          id="email"
          placeholder="Correo electrónico"
        >
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path
              d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
            ></path>
            <path
              d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
            ></path>
          </svg>
        </FormInput>
        <label htmlFor="description" className="pt-2 m-0 pb-1 block text-sm font-medium text-wihte">Biografia</label>
        <div className="relative w-full">
          <div
            className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
          >
            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd" />
            </svg>

          </div>
          <textarea defaultValue={userInfo.description || ""} onInput={handleInput} ref={textareaRef} wrap="soft" cols={30} rows={1} id="description" name="description" className="resize-none h-full pe-24 outline-none border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 focus:bg-white/10 bg-white/10 border-white/20 placeholder-gray-400 text-gray-200 focus:outline-none disabled:bg-white/20 disabled:text-gray-400 disabled:placeholder-gray-400 read-only:bg-white/20 read-only:text-gray-400 read-only:placeholder-gray-400 autofill:bg-white/10 max-h-[120px]" placeholder="Biografia/Descripcion" required style={{ scrollbarWidth: "none" }} maxLength={90} />
        </div>
        <p className="font-medium text-red-600">{userDataMessage}</p>
        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center focus:ring-blue-600/55 w-1/2 mb-1 mt-2">Editar perfil</button>
      </form>
      <form onSubmit={handleFormPassword} className="flex flex-col pt-4 w-1/2">
        <h2 className="text-xl font-medium pb-2">Cambiar contraseña</h2>
        <label htmlFor="oldPassword" className=" m-0 pb-1 block text-sm font-medium text-wihte">Contraseña actual</label>
        <FormInput
          type="password"
          id="oldPassword"
          placeholder="Contraseña actual"
        >
          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
          </svg>

        </FormInput>
        <label htmlFor="newPassword" className="pt-2 m-0 pb-1 block text-sm font-medium text-wihte">Contraseña nueva</label>
        <FormInput
          type="password"
          id="newPassword"
          placeholder="Contraseña nueva"
        >
          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
          </svg>

        </FormInput>
        <p className="font-medium text-red-600">{passwordMessage}</p>
        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center focus:ring-blue-600/55 w-1/2 mb-1 mt-2">Cambiar contraseña</button>
      </form>
      <div className="flex flex-col pt-4 w-1/2">
        <h2 className="text-xl font-medium pb-2">Acciones de cuenta</h2>
        <div className="flex w-full">
          <button type="button" className="border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900 w-1/2">Eliminar cuenta</button>
          <button type="button" className="border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-white text-white hover:text-black hover:bg-white focus:ring-zinc-300 w-1/2">Cerrar sesion</button>
        </div>
      </div>
    </main>
  )
}