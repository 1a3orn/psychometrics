import { useNavigate } from "react-router-dom"

import { useUser } from "../../contexts"
import { VisualElement } from "./VisualElement"

import { useRedirectIfNotLoggedIn } from "../../hooks"

type NavbarProps = {
  title: string
}

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Analytics",
    href: "/analytics",
  },
]

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { logout, state } = useUser()
  const nav = useNavigate()

  useRedirectIfNotLoggedIn()

  const onClickSignOut = () => {
    logout().then(() => {
      nav("/login")
    })
  }

  const onClickSettings = () => nav("/settings")

  const onClickAccount = () => nav("/account")

  return (
    <VisualElement
      username={state.type === "LOGGED_IN" ? state.username : ""}
      title={title}
      links={NAV_LINKS}
      onClickSignOut={onClickSignOut}
      onClickSettings={onClickSettings}
      onClickAccount={onClickAccount}
    />
  )
}
