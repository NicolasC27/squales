import { defineStore } from "pinia";
import { StorageSerializers, useStorage } from "@vueuse/core";

export const authStore = defineStore("auth", {
  state: () => ({
    loggedIn: false,
    token: null,
  }),

  // state: () => ({
  //   loggedIn: useLocalStorage("count", 0),
  //   user: null,
  //   isAuthenticated: false,
  // }),
  // persist: true,
  // getters: {
  //   authentification: (state) => {
  //     if (process.client) return localStorage.getItem("users");
  //   },
  //   isAuthenticated: (state) => {
  //     if (!state.loggedIn) {
  //       if (process.client) return localStorage.getItem("users");
  //     }
  //     return state.loggedIn;
  //   },
  // },
  actions: {
    setUser() {
      //   return this.loggedIn;
      //   this.user = user;
      //   if (user) {
      //     localStorage.setItem("user", JSON.stringify(user))
      //   } else {
      //     localStorage.removeItem("user");
      //   }
    },

    setAuthenticated(authenticated) {
      this.isAuthenticated = authenticated;
    },

    async proceedSignIn(credentials) {
      const authResult = await this.$nuxt.$api
        .store("/api/auth/login", credentials)
        .then((response) => {
          this.token = response.user;
        });

      //   if (authResult && authResult.success) {
      //     this.setUser({ token: authResult.token, roles: authResult.roles, user: authResult.user });
      //     this.setAuthenticated(true);
      //     console.log(this.user);
      //     return true;
      //   }
      // console.log("test");
      // return false;
    },

    getUser() {
      //   if (this.user) {
      //     return this.user;
      //   }
      //   try {
      //     const user = JSON.parse(localStorage.getItem("user"));
      //     this.user = user.user;
      //     return user;
      //   } catch (err) {
      //     console.log(err);
      //   }
    },

    signOut() {
      this.setUser(null);
      this.setAuthenticated(false);
    },
  },
});
