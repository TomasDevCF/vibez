import { useEffect, useState } from "react"
import type { UserInfo } from "../../layouts/HomePage.astro"

interface FollowsInfo {
  followers: number
  following: number
}

interface Props {
  userInfo: UserInfo
}

export default function FollowsInfo({ userInfo }: Props) {
  const [followsInfo, setFollowsInfo] = useState<FollowsInfo | null>(null)

  useEffect(() => {
    fetch(`/api/users/getFollows/${userInfo.user_id}`)
      .then(res => res.json())
      .then(data => {
        setFollowsInfo(data)
      })
  }, [])

  return (
    <div className="pt-2 flex gap-2 text-sm">
      <p className="font-normal"><strong className="font-medium">{followsInfo?.followers}</strong> Seguidores</p>
      <p className="font-normal"><strong className="font-medium">{followsInfo?.following}</strong> Seguidos</p>
    </div>
  )
}