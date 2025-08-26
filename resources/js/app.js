import "./bootstrap";
import "../css/app.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Tooltip from "primevue/tooltip";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob("./Pages/**/*.vue")),
  setup({ el, App, props, plugin }) {
    const vueApp = createApp({ render: () => h(App, props) });
    vueApp.component("Toast", Toast);
    return vueApp
      .use(plugin)
      .use(ZiggyVue)
      .use(PrimeVue, { ripple: true })
      .use(ToastService)
      .directive("tooltip", Tooltip)
      .mount(el);
  },
  progress: {
    color: "#4B5563",
  },
});
