import Cookies from "js-cookie";

interface Props {
  children: React.ReactNode;
}

export default function Logout({ children }: Props) {
  function handleClick() {
    Cookies.remove("accountId")
    window.location.href = "/register"
  }

  return (
    <button onClick={handleClick} >
      {children}
    </button>
  )
}