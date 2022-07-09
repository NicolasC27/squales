import Cookies from "js-cookie";

export default {
  getAccessCookie(key, value) {
    return Cookies.get(key) ? JSON.parse(Cookies.get(key))?.[value] : "";
  },
};
