import { useLoginSignup } from "./use-login-signup";

import {
  PageLogin,
  PageLoginContent,
  CenteredCard,
  InputField,
  ErrorMessage,
  LinkOptions,
} from "../../components";

export const LoginSignupPage = () => {
  const { state, handleChange, handleLoginClick, error } = useLoginSignup();

  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Signup">
          <div className="flex flex-col gap-4">
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
              <button type="submit">Signup</button>
              <ErrorMessage error={error} />
            </form>
            <div className="border-t border-gray-300"></div>
            <LinkOptions
              options={[{ text: "Already have an account?", to: "/login" }]}
            />
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
