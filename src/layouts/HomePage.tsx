import { useEffect, useState } from "react";
import { AsideNav } from "../components/AsideNav";
import Cookies from "js-cookie"
import { SearchAside } from "../components/SearchAside";

interface Props {
  children: React.ReactNode;
}

export interface UserInfo {
  user_id: number;
  name: string;
  username: string;
  image: string | null;
  email: string;
  password: string | null;
  created_at: Date;
}

export interface Post {
  post_id: number,
  user_id: number,
  image: string | null,
  username: string,
  name: string,
  body: string,
  created_at: Date,
  followers?: number
}

export function HomePage({ children }: Props) {
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)

  useEffect(() => {
    fetch(`/api/users/getUser/${Cookies.get("accountId")}`)
      .then(res => res.json())
      .then(data => {
        setUserInfo(data)
        if (data.error) {
          Cookies.remove("accountId")
          window.location.href = "/register"
        }
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <AsideNav userInfo={userInfo} />
      <main className="w-full h-full overflow-y-hidden">
        <div className="page-select flex w-full border-b border-solid border-white/20">
          <button className="w-1/2 h-16 border-r hover:bg-white/10 transition-colors border-white/20 border-solid text-blue-500 font-medium text-md">Para ti</button>
          <button className="w-1/2 h-16 border-l hover:bg-white/10 transition-colors border-white/20 border-solid text-white font-medium text-md">Siguiendo</button>
        </div>
        {children}
      </main>
      <SearchAside userInfo={userInfo} />
    </>
  )
}