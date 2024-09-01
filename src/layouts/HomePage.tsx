import { useEffect, useState, type CSSProperties } from "react";
import { AsideNav } from "../components/AsideNav";
import Cookies from "js-cookie"
import { SearchAside } from "../components/SearchAside";

interface Props {
  children: React.ReactNode;
  style?: CSSProperties;
}

export interface UserInfo {
  user_id: number;
  name: string;
  username: string;
  image: string | null;
  email: string;
  password: string | null;
  created_at: Date;
  description: string | null
}

export interface Post {
  post_id: number,
  user_id: number,
  image: string | null,
  username: string,
  name: string,
  body: string,
  created_at: Date,
  followers?: number,
  likes_count: number,
  comments_count: number,
  is_comment?: boolean,
  commented_post_id?: number
}

export function HomePage({ children, style }: Props) {
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
      <main className="w-full h-full overflow-y-hidden" style={style}>

        {children}
      </main>
      <SearchAside userInfo={userInfo} />
    </>
  )
}