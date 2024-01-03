// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
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
  css: ['~/assets/css/main.css']
});