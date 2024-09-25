import Cookies from "js-cookie"
import type { UserInfo } from "../../layouts/HomePage.astro"
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import FormInput from "../Inputs/FormInput.astro"
import EditProfileForm from "../Forms/EditProfileForm"

interface Props {
  userInfo: UserInfo
}

export default function ProfileFollowButton({ userInfo }: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null)
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const [editProfileGui, setEditProfileGui] = useState<boolean>(false)



  function alternateFollow() {
    setDisableButton(true)
    if (isFollowing) {
      // unfollow
      fetch("/api/follows/deleteFollow", {
        method: "DELETE",
        body: JSON.stringify({
          followed_id: userInfo.user_id,
          follower_id: parseInt(Cookies.get("accountId") as string)
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.follow_id) {
            setIsFollowing(false)
          }
          //TODO: ERROR DELETE FOLLOW
        })
        .catch(error => console.error(error))
        .finally(() => setDisableButton(false))
    } else {
      fetch("/api/follows/addFollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower_id: Cookies.get("accountId"), followed_id: userInfo.user_id })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setIsFollowing(false)
            console.error(data.error)
            //TODO: ERROR
          } else {
            setIsFollowing(true)
            console.log(data.follow_id)
          }
        })
        .catch(err => console.error(err))
        .finally(() => setDisableButton(false))
    }
  }

  useEffect(() => {
    if (parseInt(Cookies.get("accountId") as string) != userInfo.user_id) {
      fetch("/api/follows/verifyFollow", {
        method: "POST",
        body: JSON.stringify({
          followed_id: userInfo.user_id,
          follower_id: parseInt(Cookies.get("accountId") as string)
        })
      })
        .then(res => res.json())
        .then(data => setIsFollowing(data.isFollow))
        .catch(err => console.error(err))
    } else {
      setIsFollowing(true)
    }
  }, [])



  return (
    <>
      {isFollowing != null ?
        (parseInt(Cookies.get("accountId") as string) != userInfo.user_id ? <div className="flex gap-2 h-max items-center">
          <button onClick={alternateFollow} disabled={disableButton} className={`rounded-md transition-colors h-[34px] py-1 px-3 font-medium ${isFollowing ? "text-white border-white border border-solid bg-transparent" : "bg-white text-black"}`}>
            {isFollowing ? "Seguido" : "Seguir"}
          </button>
        </div>
          : <div className="flex gap-2 h-max items-center">
            <button className="rounded-md bg-transparent border-white text-white border h-max py-1 px-3 font-medium" onClick={() => setEditProfileGui(true)}>Editar</button>
          </div>

        ) : <div className="h-[34px]"></div>
      }

      <EditProfileForm editProfileGui={editProfileGui} setEditProfileGui={setEditProfileGui} userInfo={userInfo} />
    </>
  )
}