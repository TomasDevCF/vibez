import { useState } from "react"
import type { UserInfo } from "../../layouts/HomePage.astro"
import { checkIfLink } from "../Posts/Post"

interface Props {
  userInfo: UserInfo
}

export default function UserDescription({ userInfo }: Props) {
  const [showAllText, setShowAllText] = useState<boolean>(false)

  return (
    <pre onClick={() => setShowAllText(!showAllText)} className={`${!showAllText && "ellipsis-vertical"} text-white text-xs pt-2 text-wrap w-1/2 overflow-ellipsis overflow-hidden font-sans`}>
      {userInfo.description && checkIfLink(userInfo.description).map((text, index) => {
        return text.isLink ? (
          <a key={index} href={text.word} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">{text.word + `${text.word.includes("\n") ? "" : " "}`}</a>
        ) : (
          <span key={index}>{text.word + `${text.word.includes("\n") ? "" : " "}`}</span>
        )
      })}
    </pre>
  )
}