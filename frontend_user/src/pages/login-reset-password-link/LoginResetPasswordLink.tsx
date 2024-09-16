import {
  InputField,
  PageLogin,
  CenteredCard,
  PageLoginContent,
  ErrorMessage,
  SuccessMessage,
  GreyLink,
} from "../../components";

import { useLoginResetPasswordLink } from "./use-login-reset-password-link";

export const LoginResetPasswordLinkPage = () => {
  const { handleSubmit, state, handleChange, stringError, stringSuccess } = useLoginResetPasswordLink();
  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Request Reset Password Email">
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <InputField name="username" value={state.username} onChange={handleChange} />
              <InputField name="email" value={state.email} onChange={handleChange} />
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4">
                Reset Password
              </button>
              <ErrorMessage error={stringError} />
              <SuccessMessage success={stringSuccess} />
            </form>
            <GreyLink text="Go back to login" to="/login" />
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
