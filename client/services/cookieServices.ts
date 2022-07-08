import Cookies from "js-cookie";

export default {
  getAccessCookie(key, value) {
    return JSON.parse(Cookies.get(key))?.[value];
  },
};
