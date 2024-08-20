import Cookies from "js-cookie";

interface Props {
  children: React.ReactNode;
  className: string;
}

export default function Logout({ children, className }: Props) {
  function handleClick() {
    Cookies.remove("accountId")
    window.location.href = "/register"
  }

  return (
    <button onClick={handleClick} className={className} >
      {children}
    </button>
  )
}