import { AuthResponse } from "../../api/req-auth";
import { Result } from "../../shared-automatic";

export interface DecodedToken {
  username: string;
  exp: number;
}

export type LoadingState = { type: "LOADING" };
export type NotLogged = { type: "NOT_LOGGED_IN" };
export type GuestUser = { type: "GUEST" };

export type LoggedInUser = {
  type: "LOGGED_IN";
  username: string;
  token: string;
};

/* State Transition Diagram
 *
 * LOADING -> [NOT_LOGGED_IN, LOGGED_IN]
 * NOT_LOGGED_IN -> [GUEST, LOGGED_IN]
 * LOGGED_IN -> [NOT_LOGGED_IN]
 * GUEST -> [NOT_LOGGED_IN]
 */
export type LoginState = LoggedInUser | NotLogged | GuestUser | LoadingState;

export type UserContextType = {
  state: LoginState;
  signup: (username: string, password: string, email: string, type?: string) => Promise<AuthResponse>;
  login: (username: string, password: string) => Promise<AuthResponse>;
  loginAsGuest: () => Result<undefined>;
  logout: () => Promise<void>;
};
