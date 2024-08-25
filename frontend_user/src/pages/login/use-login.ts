import { useCallback } from "react"
import { useNavigate } from "react-router"

import { useUser } from "../../contexts/user"
import { useBasicForm } from "../../hooks"

export const useLogin = () => {
  const { state, handleChange } = useBasicForm(["username", "password"])
  const { login } = useUser()

  const nav = useNavigate()
  const handleLoginClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      login(state.username, state.password).then(() => {
        nav("/dashboard")
      })
    },
    [login, state, nav]
  )

  return { state, handleChange, handleLoginClick }
}
