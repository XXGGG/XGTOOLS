<template>
    <div class="Home">
        <div p-20 i-line-md-moon-filled-alt-loop dark:i-line-md-moon-filled-alt-to-sunny-filled-loop-transition
            @click="toggleDark" class="toggleBtn" />
    </div>
</template>

<script setup lang='ts'>
import { toggleDark } from '~/logics'
import { useDark, useToggle } from '@vueuse/core'

// 使用 Vueuse的两个函数来实现切换【暗黑模式】
const isDark = useDark()
// const toggleDark = useToggle(isDark)
</script>

<style scoped>
.Home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.toggleBtn {
    cursor: pointer;
}
</style>
