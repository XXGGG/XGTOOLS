<template>
    <div class="top">
              <RouterLink to="/" class="logo" p-4 i-tabler-tools></RouterLink>
              <div>XGTools</div>
              <div p-4 i-line-md-moon-filled-alt-loop dark:i-line-md-moon-filled-alt-to-sunny-filled-loop-transition
                  @click="toggleDark" class="toggleBtn" />
          </div>
    <NuxtPage />
</template>
<script setup lang='ts'>
import { toggleDark } from '~/logics'
import { useDark, useToggle } from '@vueuse/core'


const go_router = (url: string) => {
  navigateTo(url)
}
// 使用 Vueuse的两个函数来实现切换【暗黑模式】
const isDark = useDark()
  // const toggleDark = useToggle(isDark)
</script>
<style>

body {  
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  background-image: url('/bg.svg');
  background-size: 40px 40px;
}
.dark body{
  color: rgba(255, 255, 255, 0.8);
  background-image: url('/bg-dark.svg');
}

.top {
    width: calc(100vw - 20px);
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
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