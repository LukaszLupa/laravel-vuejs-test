import { createApp } from "vue";
import { TroisJSVuePlugin } from "troisjs";

import App from "@/App.vue";
import VButton from "@/components/button.vue";

/**
 * App instance.
 */
const app = createApp(App);

/**
 * Register Trois.
 */
app.use(TroisJSVuePlugin);

/**
 * Register components.
 */
app.component("v-button", VButton);

/**
 * Mount app.
 */
app.mount("#app");
