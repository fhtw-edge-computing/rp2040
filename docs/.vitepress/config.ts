import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Arduino Nano RP2040 Connect",
  titleTemplate: "Edge Computing",
  description: "Arduino Nano RP2040 Connect examples with C and MicroPython.",

  base: "/rp2040/",

  lastUpdated: true,

  head: [["meta", { name: "theme-color", content: "#3c8772" }]],

  themeConfig: {
    logo: "/img/fhtw-logo.svg",
    // siteTitle: "FH Technikum Wien: Edge Computing - Arduino Nano RP2040 Connect",
    // siteTitle: "FH Technikum Wien: Edge Computing",
    siteTitle: "Arduino RP2040",
    nav: nav(),
    sidebar: {
      "/guide/": sidebarGuide(),
      "/c/": sidebarC(),
      "/micropython/": sidebarMicroPython(),
    },
    outline: 2,
    socialLinks: [{ icon: "github", link: "https://github.com/fhtw-edge-computing/rp2040" }],
    footer: {
      message: "Released under the GPL-3.0 License.",
      copyright: "Copyright © 2022-present FHTW Technikum Wien",
    },
    editLink: {
      pattern: "https://github.com/fhtw-edge-computing/rp2040/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});

function nav() {
  return [
    {
      text: "Guide",
      link: "/guide/introduction",
    },
    {
      text: "C/C++",
      link: "/c/installation",
    },
    {
      text: "MicroPython",
      link: "/micropython/installation",
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "Introduction",
      collapsable: true,
      items: [{ text: "Introduction", link: "/c/introduction" }],
    },
  ];
}

function sidebarC() {
  return [
    {
      text: "Introduction",
      collapsable: true,
      items: [{ text: "Installation", link: "/micropython/installation" }],
    },
  ];
}

function sidebarMicroPython() {
  return [
    {
      text: "Introduction",
      collapsable: true,
      items: [{ text: "Installation", link: "/micropython/installation" }],
    },
  ];
}
