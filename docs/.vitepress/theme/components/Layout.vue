<template>
  <Layout>
    <template #nav-bar-content-after>
      <Presenter />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import Presenter from "./Presenter.vue";
const { Layout } = DefaultTheme;
</script>
