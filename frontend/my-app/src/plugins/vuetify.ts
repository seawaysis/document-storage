/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
import { VDateInput } from 'vuetify/labs/VDateInput';
export default createVuetify({
  components: {
    VDateInput
  },
  theme: {
    defaultTheme: 'dark',
  },
})
