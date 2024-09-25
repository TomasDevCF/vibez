import { useState, type MouseEvent } from "react"
import Cookies from "js-cookie"

interface Props {
  userId: number,
  followButton?: boolean
}

export default function FollowCardButton({ userId, followButton = true }: Props) {
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  function handleClick(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()

    fetch("/api/follows/addFollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follower_id: Cookies.get("accountId"), followed_id: userId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setIsFollowed(false)
          console.error(data.error)
          //TODO: ERROR
        } else {
          setIsFollowed(true)
          console.log(data.follow_id)
        }
      })
  }

  return (
    <>
      {followButton && !isFollowed && <div className="flex-shrink-0">
        <button onClick={handleClick} className="text-white bg-blue-500 hover:bg-blue-600/90 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 text-center items-center w-full">
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

        </button>
      </div>}
    </>
  )
}