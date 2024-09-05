import { Link } from "react-router-dom";
import { InputField, PageLogin, CenteredCard, PageLoginContent, ErrorMessage } from "../../components";

import { useLogin } from "./use-login";

export const LoginPage = () => {
  const { state, handleChange, handleLoginClick, handleLoginAsGuest, error } = useLogin();
  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Login">
          <form onSubmit={handleLoginClick} className="space-y-4">
            <InputField name="username" value={state.username} onChange={handleChange} />
            <InputField name="password" value={state.password} onChange={handleChange} type="password" />
            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4">
              Login
            </button>
            <ErrorMessage error={error} />
          </form>
          <div className="mt-4 text-center">
            <button onClick={handleLoginAsGuest}>Login as Guest</button>
            <p className="text-gray-700 dark:text-gray-300">Don't have an account?</p>
            <Link to="/signup" className="text-teal-500 hover:text-teal-600 font-bold">
              Signup
            </Link>
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
