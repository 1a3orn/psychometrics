import { useCallback } from "react"
import { useNavigate } from "react-router"

import { useUser } from "../../contexts/user"

import { useBasicForm } from "../../hooks"
import {
  PageLogin,
  PageLoginContent,
  CenteredCard,
  InputField,
} from "../../components"

export const LoginSignupPage = () => {
  const { state, handleChange } = useBasicForm([
    "username",
    "password",
    "email",
  ])

  const nav = useNavigate()
  const { signup } = useUser()

  const handleLoginClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      signup(state.username, state.password, state.email).then((result) => {
        console.log(result)
        if (result.success) {
          nav("/main")
        } else {
          console.log(result)
        }
      })
    },
    [signup, state, nav]
  )

  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Signup">
          <h1>Signup Page</h1>
          <form onSubmit={handleLoginClick}>
            <InputField
              name="username"
              value={state.username}
              onChange={handleChange}
            />
            <InputField
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <InputField
              name="password"
              value={state.password}
              onChange={handleChange}
              type="password"
            />
            <button type="submit">Login</button>
          </form>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  )
}
