import { useEffect, useState } from "react";
import type { UserInfo } from "../layouts/HomePage";
import UserCard from "./UserCard";

interface Props {
  userInfo: null | UserInfo
}

interface RecommendedUser {
  user_id: number,
  username: string,
  image: string | null,
  name: string,
  follower_count: number
}

export function SearchAside({ userInfo }: Props) {
  const [recommendedUsers, setRecommendedUsers] = useState<null | RecommendedUser[]>(null)

  //TODO: SEARCH, FOLLOW BUTTON

  useEffect(() => {
    if (userInfo) {
      fetch(`/api/users/getRecommendedUsers/${userInfo.user_id}`)
        .then(res => res.json())
        .then(data => {
          setRecommendedUsers(data)
        })
    }
  }, [userInfo])

  return (
    <aside className="p-3 border-l border-white/20 border-solid flex flex-col w-full h-screen">
      {userInfo &&
        <>
          <form className="pb-6" action="">
            <div className="relative w-full">
              <div
                className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
              >
                <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>

              </div>
              <input
                required
                type="search"
                id="search"
                name="search"
                className="border text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-white/10 bg-white/10 border-white/20 placeholder-gray-400 text-gray-200 focus:outline-none disabled:bg-white/20 disabled:text-gray-400 disabled:placeholder-gray-400 read-only:bg-white/20 read-only:text-gray-400 read-only:placeholder-gray-400 autofill:bg-white/10"
                placeholder="Buscar"
              />
            </div>
          </form>
          <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <h2 className="text-lg text-white font-medium">Cuentas mas seguidas</h2>
            <div className="flex flex-col">
              {recommendedUsers && recommendedUsers.map(user =>
                <UserCard key={user.user_id} image={user.image} name={user.name} username={user.username} userId={user.user_id} />
              )}
            </div>
          </div>
        </>
      }
    </aside>
  )
}