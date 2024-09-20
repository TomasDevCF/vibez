import { useRef, useState, type Dispatch, type FormEvent, type KeyboardEvent, type SetStateAction } from "react"
import type { UserInfo } from "../layouts/HomePage.astro"
import FormInput from "./FormInput"

interface Props {
  editProfileGui: boolean
  setEditProfileGui: Dispatch<SetStateAction<boolean>>
  userInfo: UserInfo
}

export default function EditProfileForm({ editProfileGui, setEditProfileGui, userInfo }: Props) {
  const textareaRef = useRef(null)

  function postData(formData: FormData) {
    const dataToSend: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      if (typeof value === "string" && value.trim() !== "") {
        if (key != "description") {
          dataToSend[key] = value.trim();
        } else {
          dataToSend[key] = value
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
          setEditProfileGui(false)
          return window.location.reload()
        }
      })
  }

  function handleInput(e: FormEvent<HTMLTextAreaElement>) {
    console.log(e)
    if (textareaRef.current) {
      textareaRef.current.style.height = "42px" // eslint
      textareaRef.current.style.height = `${e.target.scrollHeight}px` // eslint-disable-line
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    postData(formData)
  }

  return (
    <>
      {editProfileGui && <div className="fixed flex z-40 justify-center items-center w-full h-full bg-transparent top-0 right-0">
        <form onSubmit={handleSubmit} className="edit-profile w-96 border border-zinc-800 rounded-md shadow-black bg-zinc-900 text-start flex flex-col items-start gap-y-2 p-4">
          <div className="flex justify-between w-full">
            <h2 className="font-medium text-2xl">Editar perfil</h2>
            <svg onClick={() => setEditProfileGui(false)} className="w-6 h-6 text-white hover:text-red-400 cursor-pointer transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </div>
          <FormInput required={true} value={userInfo.name} type="text" id="name" placeholder="Nombre">
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
          <FormInput required={false} disabled={true} value={userInfo.username} type="text" id="username" placeholder="Nombre de usuario">
            <svg
              className="w-[20px] h-[20px] text-gray-800 dark:text-white"
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
          <div className="relative w-full">
            <div
              className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
            >
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd" />
              </svg>

            </div>
            <textarea onLoadedData={handleInput} defaultValue={userInfo.description || ""} onInput={handleInput} ref={textareaRef} wrap="soft" cols={30} rows={1} id="description" name="description" className="resize-none h-full pe-24 outline-none border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 focus:bg-white/10 bg-white/10 border-white/20 placeholder-gray-400 text-gray-200 focus:outline-none disabled:bg-white/20 disabled:text-gray-400 disabled:placeholder-gray-400 read-only:bg-white/20 read-only:text-gray-400 read-only:placeholder-gray-400 autofill:bg-white/10 max-h-[120px]" placeholder="Biografia/Descripcion" required style={{ scrollbarWidth: "none" }} maxLength={90} />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center focus:ring-blue-600/55 w-full"
          >Editar</button>
        </form>
      </div>}
    </>
  )
}