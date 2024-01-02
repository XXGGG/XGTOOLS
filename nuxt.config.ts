// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  }, 
  css: ["@/assets/css/main.css"],
  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    text: "XGTools",
    families: {
      Roboto: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
      Inter: "200..700",
      "Crimson Pro": {
        wght: "200..900",
        ital: "200..700",
      },
      Caveat: {
        wght: "400..700",
      },
    },
    display: "swap",
  },
  ui: {
    global: true,
    icons: "all",
  },
});