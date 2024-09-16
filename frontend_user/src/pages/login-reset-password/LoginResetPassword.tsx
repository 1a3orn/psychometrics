import {
  InputField,
  PageLogin,
  CenteredCard,
  PageLoginContent,
  ErrorMessage,
  SuccessMessage,
  GreyLink,
} from "../../components";
import { useLoginResetPassword } from "./use-login-reset-password";

export const LoginResetPasswordPage = () => {
  const { handleSubmit, username, state, handleChange, stringError, stringSuccess } = useLoginResetPassword();
  return (
    <PageLogin>
      <PageLoginContent>
        <CenteredCard title="Use Reset Password Link">
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <InputField name="username" value={username || ""} onChange={() => {}} readonly={true} />
              <InputField name="password1" value={state.password1} onChange={handleChange} />
              <InputField name="password2" value={state.password2} onChange={handleChange} />
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4">
                Reset Password
              </button>
              <ErrorMessage error={stringError} />
              <SuccessMessage success={stringSuccess} />
              <div className="flex flex-col gap-2 h-20">
                {stringSuccess && <GreyLink text="Go back to login" to="/login" />}
              </div>
            </form>
          </div>
        </CenteredCard>
      </PageLoginContent>
    </PageLogin>
  );
};
