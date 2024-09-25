import { useEffect, useState } from "react"
import type { UserInfo } from "../../layouts/HomePage.astro";
import UserCard from "../Users/UserCard.astro"

interface RecommendedUser {
  user_id: number,
  username: string,
  image: string | null,
  name: string,
  follower_count: number
}

interface Props {
  userInfo: UserInfo | null
}

export default function RecommendedUsers({ userInfo }: Props) {
  const [recommendedUsers, setRecommendedUsers] = useState<null | RecommendedUser[]>()

  //TODO: SEARCH

  useEffect(() => {
    if (userInfo) {
      fetch(`/api/users/getRecommendedUsers/${userInfo.user_id}`)
        .then(res => res.json())
        .then(data => {
          setRecommendedUsers(data)
        })
    }
  }, [userInfo])

  //TODO: LOADER
  return (
    <>
      {recommendedUsers && <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <h2 className="text-lg text-white font-medium">Cuentas mas seguidas</h2>
        <div className="flex flex-col">
          {recommendedUsers.map(user =>
            <UserCard key={user.user_id} image={user.image} name={user.name} username={user.username} userId={user.user_id} />
          )}
        </div>
      </div>}
    </>
  )
}