import { Link } from "react-router-dom";
import { InputField, PageLogin, CenteredCard, PageLoginContent, ErrorMessage } from "../../components";

import { useLogin } from "./use-login";

export const LoginPage = () => {
  const { state, handleChange, handleLoginClick, error } = useLogin();
  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Login">
          <form onSubmit={handleLoginClick}>
            <InputField name="username" value={state.username} onChange={handleChange} />
            <InputField name="password" value={state.password} onChange={handleChange} type="password" />
            <button type="submit">Login</button>
            <ErrorMessage error={error} />
          </form>
          <div className="mt-4">
            <p>Don't have an account?</p>
            <Link to="/signup">Signup</Link>
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
