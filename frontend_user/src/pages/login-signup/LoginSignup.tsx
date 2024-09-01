import { Link } from "react-router-dom";

import { useLoginSignup } from "./use-login-signup";

import { PageLogin, PageLoginContent, CenteredCard, InputField, ErrorMessage } from "../../components";

export const LoginSignupPage = () => {
  const { state, handleChange, handleLoginClick, error } = useLoginSignup();

  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Signup">
          <h1>Signup Page</h1>
          <form onSubmit={handleLoginClick}>
            <InputField name="username" value={state.username} onChange={handleChange} />
            <InputField name="email" value={state.email} onChange={handleChange} />
            <InputField name="password" value={state.password} onChange={handleChange} type="password" />
            <button type="submit">Signup</button>
            <ErrorMessage error={error} />
          </form>
          <div className="mt-4">
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
