import { defineConfig } from "vitepress";

import markdownItReferences from "markdown-it-references";
import markdownItFigureReference from "markdown-it-figure-references";

export default defineConfig({
  lang: "en-US",
  title: "Arduino Nano RP2040 Connect",
  titleTemplate: "Edge Computing",
  description: "Arduino Nano RP2040 Connect examples with C and MicroPython.",

  base: "/rp2040/",

  lastUpdated: true,

  head: [["meta", { name: "theme-color", content: "#3c8772" }]],

  markdown: markdown(),

  themeConfig: {
    // algolia: {
    //   appId: '2HWG3F9Q0X',
    //   apiKey: '8a0075d717792b877e53c2bfee9871b7',
    //   indexName: 'rp2040',
    //   disableUserPersonalization: true
    // },
    logo: "/img/fhtw-logo.svg",
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

function markdown() {
  return {
    // lineNumbers: true
    config: (md) => {
      md.use(markdownItFigureReference, { anchor: { enable: false}, list: { enable: false } });
      md.use(markdownItReferences);
    }
  }
}

function nav() {
  return [
    {
      text: "Guide",
      link: "/guide/overview",
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
      text: "Guide",
      collapsible: true,
      items: [
        { text: "Overview", link: "/guide/overview" },
        { text: "Features", link: "/guide/features" },
        { text: "Pinout", link: "/guide/pinout" },
        { text: "Resources", link: "/guide/resources" },
        // { text: "Tutorials", link: "/guide/tutorials" }
      ],
    },
    {
      text: "About Us",
      collapsible: true,
      collapsed: false,
      items: [
        { text: "Team", link: "/team" }
      ],
    },
  ];
}

function sidebarC() {
  return [
    {
      text: "Introduction",
      collapsible: true,
      items: [
        { text: "Installation", link: "/c/installation" },
        { text: "Hello World", link: "/c/hello-world" }
      ],
    },
  ];
}

function sidebarMicroPython() {
  return [
    {
      text: "Introduction",
      collapsible: true,
      items: [
        { text: "Installation", link: "/micropython/installation" },
        { text: "Hello World", link: "/micropython/hello-world" }
      ],
    },
    {
      text: "Networking",
      collapsible: true,
      items: [
        { text: "Wi-Fi", link: "/micropython/wifi" },
        { text: "Socket", link: "/micropython/socket" },
        { text: "WebSocket", link: "/micropython/websocket" },
        { text: "HTTP", link: "/micropython/http" }
      ],
    },
    {
      text: "Sensors",
      collapsible: true,
      items: [
        { text: "IMU", link: "/micropython/imu" },
        { text: "Microphone", link: "/micropython/microphone" }
      ],
    },
    {
      text: "Actuator",
      collapsible: true,
      items: [
        { text: "RGB", link: "/micropython/rgb" }
      ],
    }
  ];
}
