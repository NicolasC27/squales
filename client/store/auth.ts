import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    loggedIn: false,
    token: null,
  }),

  actions: {
    setAuthenticated(authenticated) {
      this.isAuthenticated = authenticated;
    },

    async proceedSignIn(credentials) {
      return await this.$nuxt.$api
        .store("/api/auth/login", credentials)
        .then((response) => {
          this.token = response.user;
          this.loggedIn = true;

          return response;
        });
    },

    authToken(token = null) {
      return this.$nuxt.$api.get("/api/auth/token").then((response) => {
        console.log(response);
        if (response && response.success) return true;
        else {
          return false;
        }
      });
    },

    signOut() {
      this.setUser(null);
      this.setAuthenticated(false);
    },
  },
});
