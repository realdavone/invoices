import { defineNuxtPlugin } from "#app"
import PrimeVue from "primevue/config"
import InputText from "primevue/inputtext"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component("InputText", InputText)
})