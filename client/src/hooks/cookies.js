import Cookie from "js-cookie";

export const SetCookie = (cookieName, cookie) => {
  Cookie.set(cookieName, cookie, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export const GetCookie = (cookieName) => {
  return Cookie.get(cookieName);
};

export const RemoveCookie = (cookieName) => {
  Cookie.remove(cookieName);
};
