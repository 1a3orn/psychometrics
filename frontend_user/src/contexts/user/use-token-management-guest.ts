const USER_TOKEN_KEY = "is_logged_in_guest";

const getTokenGuest = () => localStorage.getItem(USER_TOKEN_KEY);
const setTokenGuest = () => localStorage.setItem(USER_TOKEN_KEY, "true");
const removeTokenGuest = () => localStorage.removeItem(USER_TOKEN_KEY);

export const useTokenManagementGuest = () => {
  return { getTokenGuest, setTokenGuest, removeTokenGuest };
};
