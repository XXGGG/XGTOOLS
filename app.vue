<template>
  <div>
    <div class="top">
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

</style>