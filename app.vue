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
</script>


<style>
.top_nav {
    width: 100vw;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    font-family: "Caveat";
    font-weight: 700;
    font-size: 24px;
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