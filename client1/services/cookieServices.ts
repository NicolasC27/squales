// @ts-ignore
import Cookies from "js-cookie";

export default {
  getAccessCookie(key: any, value: string | number) {
    return Cookies.get(key) ? JSON.parse(Cookies.get(key))?.[value] : "";
  },
};
