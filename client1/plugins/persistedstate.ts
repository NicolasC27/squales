import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import Cookies from "js-cookie";
import cookie from "cookie";

export default function ({ $pinia, ssrContext }) {
  $pinia.use(
    createPersistedStatePlugin({
      storage: {
        getItem: (key) => {
          // See https://nuxtjs.org/guide/plugins/#using-process-flags
          if (process.server) {
            if (ssrContext.req.headers.cookie) {
              const parsedCookies = cookie.parse(ssrContext.req.headers.cookie);
              return parsedCookies ? parsedCookies[key] : null;
            } else {
              return null;
            }
          } else {
            return Cookies.get(key);
          }
        }, // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 365, secure: false }),
        removeItem: (key) => Cookies.remove(key),
      },
    })
  );
}
