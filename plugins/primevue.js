import { defineNuxtPlugin } from "#app"
import PrimeVue from "primevue/config"
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Calendar from "primevue/calendar"
import Checkbox from "primevue/checkbox"
import Fieldset from "primevue/fieldset"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component("InputText", InputText)
  nuxtApp.vueApp.component("InputNumber", InputNumber)
  nuxtApp.vueApp.component("Calendar", Calendar)
  nuxtApp.vueApp.component("Checkbox", Checkbox)
  nuxtApp.vueApp.component("Fieldset", Fieldset)
})