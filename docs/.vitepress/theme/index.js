// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";
import { onMounted } from "vue";
import mediumZoom from "medium-zoom";

import "./custom.css";

export default {
  ...DefaultTheme,
  Layout: Layout,
  setup() {
    onMounted(() => {
      mediumZoom(".VPDoc img", { background: "var(--vp-c-bg)" });
    });
  },
};
