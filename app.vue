<template>
  <div class="Home">
    <NuxtPage />
     <div p-20 i-line-md-moon-filled-alt-loop dark:i-line-md-moon-filled-alt-to-sunny-filled-loop-transition 
      @click="toggleDark" class="toggleBtn"/>
  </div>
</template>
<script setup lang="ts">
import { toggleDark } from '~/logics'
</script>
<style>
.Home{
  display: flex;
  justify-content: center;
  align-items: center;  
  height: 100vh;
  width: 100vw; 
}
.toggleBtn{
  cursor: pointer;
}
body {  
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  background-image: url('bg.svg');
  background-size: 40px 40px;
}
.dark body{
  color: rgba(255, 255, 255, 0.8);
  background-image: url('bg-dark.svg');
}
</style>