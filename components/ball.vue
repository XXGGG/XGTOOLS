<template>
    <div class="Controls">

    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

// 判断是否是桌面端
const isDesktop = computed(() => width.value >= 1024);
</script>

<style scoped>
.Controls {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.109) 0%, rgba(16, 16, 16, 0.216) 100%);
    animation: rotate 10s linear infinite;
    position: fixed;
    bottom: 20px;
    right: 20px;
    shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.desktop {
    border-radius: 20px;
    width: 200px;
    height: 40px;
}
</style>
