<template>
  <div class="XGTools">
    <div class="top_nav">
        <RouterLink to="/" class="logo" p-4 i-tabler-tools></RouterLink>
        <div>XGTools</div>
        <div p-4 i-line-md-moon-filled-alt-loop dark:i-line-md-moon-filled-alt-to-sunny-filled-loop-transition
            @click="toggleDark" class="toggleBtn" ></div>
    </div>
    <NuxtPage />
  </div>
</template>
<script setup lang='ts'>
import { toggleDark } from '~/logics'

useHead({
  title: 'XGTools',
  meta: [
    { name: 'description', content: 'A XGTools.' },
    { name: 'charset', content: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'}
  ],
})
useSeoMeta({
  title: 'XGTools',
  ogTitle: 'XGTools',
  description: 'A Collection of Web Tools.',
  ogDescription: 'A Collection of Web Tools.',
  ogImage: 'OG-XGTools.png',
  twitterCard: 'summary_large_image',
})
</script>


<style>
.XGTools{
  /* height: calc(100vh + 2000px); */
}
.top_nav {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    font-family: "Caveat";
    font-weight: 700;
    font-size: 24px;

    position: fixed;
    top: 0;
    z-index: 999;
}
.toggleBtn {
    cursor: pointer;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>