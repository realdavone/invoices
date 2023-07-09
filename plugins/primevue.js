import { defineNuxtPlugin } from "#app"
import PrimeVue from "primevue/config"
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Calendar from "primevue/calendar"
import Checkbox from "primevue/checkbox"
import Fieldset from "primevue/fieldset"
import InputSwitch from "primevue/inputswitch"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true, locale: {
    dayNames: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"],
    dayNamesShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
    dayNamesMin: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
    firstDayOfWeek: 1,
    monthNames: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
  } })
  nuxtApp.vueApp.component("InputText", InputText)
  nuxtApp.vueApp.component("InputNumber", InputNumber)
  nuxtApp.vueApp.component("Calendar", Calendar)
  nuxtApp.vueApp.component("Checkbox", Checkbox)
  nuxtApp.vueApp.component("Fieldset", Fieldset)
  nuxtApp.vueApp.component("InputSwitch", InputSwitch)
})