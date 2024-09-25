import { useEffect, useState } from "react"
import type { UserInfo } from "../../layouts/HomePage.astro"
import queryString from "query-string"

interface Props {
  userInfo: UserInfo
}

export default function QueryType({userInfo}: Props) {
  const [showQuery, setShowQuery] = useState<string>("")

  useEffect(() => {
    const query = queryString.parseUrl(window.location.href)
    if (query.query.show) {
      setShowQuery(query.query.show as string)
    }
  }, [])

  return (
    <nav className="pt-3 flex justify-around">
        <a href={`/user/${userInfo.user_id}?show=posts`} className={`text-sm font-medium ${showQuery == "posts" || showQuery != "likes" ? "text-blue-500" : "text-white"}`}>Posts</a>
        <a href={`/user/${userInfo.user_id}?show=likes`} className={`text-sm font-medium ${showQuery == "likes" ? "text-blue-500" : "text-white"}`}>Likes</a>
      </nav>
  )
}