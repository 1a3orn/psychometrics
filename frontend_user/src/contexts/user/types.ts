import { AuthResponse } from "../../api/req-auth";

export type LoggedInUser = {
  type: "LOGGED_IN";
  username: string;
  token: string;
};

export type NotLoggedInUser = {
  type: "NOT_LOGGED_IN";
};

export type LoadingUser = {
  type: "LOADING";
};

export type LoginState = LoggedInUser | NotLoggedInUser | LoadingUser;

export type LoginResults =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export type UserContextType = {
  state: LoginState;
  signup: (username: string, password: string, email: string, type?: string) => Promise<AuthResponse>;
  login: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
};
