// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";
import { onMounted, watch, nextTick } from "vue";
import { inBrowser, useRoute } from "vitepress";
import mediumZoom from "medium-zoom";

import "./custom.scss";

export default {
  ...DefaultTheme,
  Layout: Layout,
  setup() {
    const initZoom = () => {
      if (inBrowser) mediumZoom(".VPDoc img", { background: "var(--vp-c-bg)", margin: 100 });
    };
    const handler = () => nextTick(initZoom);
    const route = useRoute();
    onMounted(initZoom);
    watch(() => route.path, handler);
  },
};
