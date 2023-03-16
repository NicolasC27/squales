import { authStore } from "~/store/auth";

const auth = authStore();

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $config } = useNuxtApp();
  const loggedIn = ref(false);

  const data = ref(null);

  const log = ref(null);
  // if (!auth.loggedIn) return "/admin/login";
  if (process.server) {
    auth.token;
    if (!auth.token) {
      return "/admin/login";
    }
  }
  if (process.client) {
    auth.token;
    try {
      await $fetch("http://localhost/api/auth/token", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((response) => {
        auth.token;
        return;
      });
    } catch ($e) {
      return "/admin/login";
    }
  }
});
