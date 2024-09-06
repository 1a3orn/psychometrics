import {
  InputField,
  PageLogin,
  CenteredCard,
  PageLoginContent,
  ErrorMessage,
  Button,
  ButtonLink,
} from "../../components";

import { useLogin } from "./use-login";

export const LoginPage = () => {
  const { state, handleChange, handleLoginClick, handleLoginAsGuest, error } = useLogin();
  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Login">
          <form onSubmit={handleLoginClick} className="flex flex-col gap-4">
            <InputField name="username" value={state.username} onChange={handleChange} />
            <InputField name="password" value={state.password} onChange={handleChange} type="password" />
            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4">
              Login
            </button>
            <ErrorMessage error={error} />
          </form>
          {/* Insert a line to separate the login button from the rest of the content */}
          <div className="border-t border-gray-300 my-1"></div>
          <div className="mt-4 text-center w-full">
            <Button onClick={handleLoginAsGuest} className="w-full">
              Login as Guest
            </Button>
            {/* Insert a line to separate the login button from the rest of the content */}
            <div className="border-t border-gray-300 my-3"></div>
            <p className="text-gray-700 dark:text-gray-300">Don't have an account?</p>
            <ButtonLink outline to="/signup" className="w-full">
              Signup
            </ButtonLink>
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
