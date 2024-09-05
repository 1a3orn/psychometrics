import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts";
import { VisualElement } from "./VisualElement";

import { useRedirectIfNotLoggedIn } from "../../hooks";
import { LoginState } from "../../contexts/user/types";

type NavbarProps = {
  title: string;
};

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Analytics",
    href: "/analytics",
  },
];

const getUsername: (state: LoginState) => string = (state) => {
  if (state.type === "LOGGED_IN") {
    return state.username;
  }
  if (state.type === "GUEST") {
    return "Guest";
  }
  return "";
};

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { logout, state } = useUser();
  const nav = useNavigate();

  useRedirectIfNotLoggedIn();

  const onClickSignOut = () => {
    logout().then(() => {
      nav("/login");
    });
  };

  const onClickSettings = () => nav("/settings");

  const onClickAccount = () => nav("/account");

  const onClickSignupFromGuest = () => nav("/signup");

  return (
    <VisualElement
      username={getUsername(state)}
      isGuest={state.type === "GUEST"}
      title={title}
      links={NAV_LINKS}
      onClickSignupFromGuest={onClickSignupFromGuest}
      onClickSignOut={onClickSignOut}
      onClickSettings={onClickSettings}
      onClickAccount={onClickAccount}
    />
  );
};
