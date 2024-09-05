import { useEffect, useState } from "react"
import type { UserInfo } from "../layouts/HomePage.astro"
import queryString from "query-string";

interface Props {
  userInfo: UserInfo
}

export function dateToMonth(date: Date): string {
  const months: string[] = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();

  return `Unido/a en ${month} de ${year}`;
}

interface FollowsInfo {
  followers: number
  following: number
}

export default function ProfileInfo({ userInfo }: Props) {
  const [followsInfo, setFollowsInfo] = useState<FollowsInfo | null>(null)
  const [showQuery, setShowQuery] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [showAllText, setShowAllText] = useState<boolean>(false)

  useEffect(() => {
    function changeUrl() {
      setUrl(window.location.href)
    }

    setUrl(window.location.href)

    window.addEventListener('popstate', changeUrl)
    window.addEventListener('pushState', changeUrl)
    window.addEventListener('replaceState', changeUrl)
  }, [])

  useEffect(() => {
    const query = queryString.parseUrl(url)
    if (query.query.show) {
      setShowQuery(query.query.show as string)
    }
    fetch(`/api/users/getFollows/${userInfo.user_id}`)
      .then(res => res.json())
      .then(data => {
        setFollowsInfo(data)
      })
  }, [url])

  return (
    <div className="profile-info pt-5">
      <p className="text-sm font-medium text-white">{userInfo.name}</p>
      <p className="text-sm  text-gray-400">@{userInfo.username}</p>
      <pre onClick={() => setShowAllText(!showAllText)} className={`${!showAllText && "ellipsis-vertical"} text-white text-xs pt-2 text-wrap w-1/2 overflow-ellipsis overflow-hidden`}>{userInfo.description}</pre>
      <p className="text-white text-xs pt-2 text-wrap flex gap-1">
        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
        </svg>
        {dateToMonth(userInfo.created_at)}
      </p>
      <div className="pt-2 flex gap-2 text-sm">
        <p><strong>{followsInfo?.followers}</strong> Seguidores</p>
        <p><strong>{followsInfo?.following}</strong> Seguidos</p>
      </div>
      <nav className="pt-3 flex justify-around">
        <a href={`/user/${userInfo.user_id}?show=posts`} className={`text-md font-medium ${showQuery == "posts" || showQuery != "likes" ? "text-blue-500" : "text-white"}`}>Posts</a>
        <a href={`/user/${userInfo.user_id}?show=likes`} className={`text-md font-medium ${showQuery == "likes" ? "text-blue-500" : "text-white"}`}>Likes</a>
      </nav>
    </div>
  )
}