<template>
    <div class="test_scroll" font-mono>
        <div class="fixed">
            <div class="item"><span>页面滚动一步的像素：</span> {{ oneStepPixel }} px</div>
            <div class="item"><span>页面滚动一步的时间：</span> {{ oneStepTime }} ms</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

// 捕获页面滚动的像素
let oneStepPixel = ref<number>(0);
let StepPixel_1 = 0;
let StepPixel_2 = 0;
let oneStepTime = ref<number>(0);
let StepTime_1 = 0;
let StepTime_2 = 0;

const handleScroll = () => {
    // 当前时间戳
    StepTime_1 = Date.now();
    oneStepTime.value = Math.abs(StepTime_1 - StepTime_2); // 使用 Math.abs 来获取绝对值

    // 获取当前页面滚动的像素值
    StepPixel_1 = window.scrollY;
    oneStepPixel.value = Math.abs(StepPixel_1 - StepPixel_2); // 使用 Math.abs 来获取绝对值
    StepPixel_2 = StepPixel_1;

    if (StepTime_2 != 0) {
        console.log(`页面滚动一步的像素: ${oneStepPixel.value} px, 时间: ${oneStepTime.value} ms`);
    }

    StepTime_2 = StepTime_1;
};

window.addEventListener('scroll', handleScroll);

// 在组件卸载前移除事件监听
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<style lang="scss" scoped>
.test_scroll {
    width: 100%;
    height: calc(100vh + 2000px);
    // background-color: aqua;
}

.fixed {
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .item {
        width: 100%;
        max-width: 300px;
        // background-color: black;
        display: flex;
        justify-content: space-between;
        
    }
}
</style>