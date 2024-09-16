import { InputField, PageLogin, CenteredCard, PageLoginContent, ErrorMessage, LinkOptions } from "../../components";

import { useLogin } from "./use-login";

export const LoginPage = () => {
  const { state, handleChange, handleLoginClick, handleLoginAsGuest, error } = useLogin();
  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Login">
          <div className="flex flex-col gap-4">
            <form onSubmit={handleLoginClick} className="flex flex-col gap-4">
              <InputField name="username" value={state.username} onChange={handleChange} />
              <InputField name="password" value={state.password} onChange={handleChange} type="password" />
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4">
                Login
              </button>
              <ErrorMessage error={error} />
            </form>
            {/* Insert a line to separate the login button from the rest of the content */}
            <div className="border-t border-gray-300"></div>
            <LinkOptions
              options={[
                { text: "Login as Guest", handleClick: handleLoginAsGuest },
                { text: "Signup", to: "/signup" },
                { text: "Forgot Password?", to: "/reset-password-link" },
              ]}
            />
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
