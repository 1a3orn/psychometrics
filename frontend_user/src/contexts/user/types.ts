import { AuthResponse } from "../../api/req-auth";

export type LoggedInUser = {
  type: "LOGGED_IN";
  username: string;
  token: string;
};

export type NotLogged = {
  type: "NOT_LOGGED_IN";
};

export type LoadingUser = {
  type: "LOADING";
};

export type GuestUser = {
  type: "GUEST";
};

export type LoginState = LoggedInUser | NotLogged | LoadingUser | GuestUser;

export type UserContextType = {
  state: LoginState;
  signup: (username: string, password: string, email: string, type?: string) => Promise<AuthResponse>;
  login: (username: string, password: string) => Promise<AuthResponse>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
};
