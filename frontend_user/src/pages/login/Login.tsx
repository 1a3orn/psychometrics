import { Link } from "react-router-dom"
import {
  InputField,
  PageLogin,
  CenteredCard,
  PageLoginContent,
} from "../../components"

import { useLogin } from "./use-login"

export const LoginPage = () => {
  const { state, handleChange, handleLoginClick } = useLogin()
  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Login">
          <form onSubmit={handleLoginClick}>
            <InputField
              name="username"
              value={state.username}
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
          <Link to="/signup">Signup</Link>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  )
}
