<template>
  <div class="presenter" @click="onClick" v-show="hasContent">
    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <title>Open Presentation</title>
      <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path :d="icon" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from "vue";
import { useRouter } from "vitepress";
const router = useRouter();

let hasContent = ref(true);
const icon =
  "M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z";

function onClick() {
  if (window && document && document.fullscreenEnabled) {
    const content = getContent();
    if (content) {
      content.addEventListener("fullscreenchange", () => {
        document.fullscreenElement == content
          ? content.classList.add("presentation")
          : content.classList.remove("presentation");
      });
      content.requestFullscreen();
    }
  }
}

function getContent() {
  return document.querySelector(".VPContent > .VPDoc > .container > .content");
}

function checkContent() {
  return typeof router.route.data.frontmatter.layout === "undefined" || router.route.data.frontmatter.layout == ""
    ? true
    : false;
}

watch(
  () => router.route.data.relativePath,
  () => (hasContent.value = checkContent()),
  { immediate: true }
);

onMounted(() => (hasContent.value = checkContent()));
</script>

<style scoped>
.presenter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  cursor: pointer;
}

.presenter:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.presenter > :deep(svg) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
