import "./bootstrap";
import "../css/app.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";
import PrimeVue from "primevue/config";
// import ConfirmationService from "primevue/confirmationservice";
// import ToastService from "primevue/toastservice";
// import Lara from '@/presets/lara';

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob("./Pages/**/*.vue")
    ),
  setup({ el, App, props, plugin }) {
    return (
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .use(ZiggyVue)
        .use(PrimeVue, {
          ripple: true,
        })
        // .use(ConfirmationService)
        // .use(ToastService)
        .mount(el)
    );
  },
  progress: {
    color: "#4B5563",
  },
});
