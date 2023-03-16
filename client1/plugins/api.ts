import { authStore } from "~/store/auth";
import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from "#app";
import Api from "~/lib/api";
import Service from "~~/client/services/cookieServices";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.provide(
    "api",
    new Api({
      req: nuxtApp.ssrContext?.req,
      fetchOptions: {
        baseURL: config.apiURL,
      },
      token: (key, value) => {
        return Service.getAccessCookie(key, value);
      },
    })
  );
});

declare module "#app" {
  interface NuxtApp {
    $api: Api;
  }
}
