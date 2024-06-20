<template>
    <!-- <div class="test_mouse" @mousemove="draw" @mouseenter="setupCanvas" @mouseleave="clearCanvas" font-mono> -->
    <div class="test_mouse" @mousemove="draw" font-mono>
        <canvas ref="canvas" style="width: 100%; height: 100%;"></canvas>
        <!-- <p class="xy" :style="{ position: 'absolute', left: mouseX + 'px', top: mouseY + 'px' }">
            {{ mouseX }},{{ mouseY }}
        </p> -->
        <div class="controls">
            <p> {{ mouseX }},{{ mouseY }}</p>
            <div class="su" id="su" @click="changeColor">changeColor</div>
            <div class="su" @click="clearCanvas">clearCanvas</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 鼠标位置的响应式变量
// 鼠标位置的响应式变量
const mouseX = ref(0);
const mouseY = ref(0);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const btcolor = ref("#888")

onMounted(() => {
    if (canvas.value) {
        canvas.value.width = canvas.value.offsetWidth;
        canvas.value.height = canvas.value.offsetHeight;
        ctx.value = canvas.value.getContext('2d');
    }
});

const setupCanvas = () => {
    if (canvas.value) {
        canvas.value.width = canvas.value.offsetWidth;
        canvas.value.height = canvas.value.offsetHeight;
    }
};

const clearCanvas = () => {
    if (ctx.value && canvas.value) {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    }
};

// 鼠标跟随函数
const draw = (event: MouseEvent) => {
    mouseX.value = event.clientX + 5;
    mouseY.value = event.clientY + 5;
    if (ctx.value) {
        ctx.value.fillStyle = btcolor.value;
        ctx.value.beginPath();
        ctx.value.arc(event.offsetX, event.offsetY, 5, 0, Math.PI * 2);
        ctx.value.fill();
    }
};

const changeColor = () => {
    btcolor.value = "#" + Math.floor(Math.random() * 16777215).toString(16);
};

</script>

<style lang="scss" scoped>
.test_mouse {
    width: 100%;
    height: calc(100vh - 80px);
    /* 使用自定义的光标图像 */
    position: relative;
    top:80px;
    overflow: hidden;
    // cursor: url('./cursor.svg'), auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
}


.su {
    padding: 10px 20px;
    border-radius: 10px;
    color: v-bind(btcolor);
    font-weight: bold;
    border: 3px solid v-bind(btcolor);
    transition: all .3s;
    user-select: none;
}

.su:hover {
    transform: scale(1.05);
}

.controls {
    position: absolute;
    bottom: 10px;
    left: transform(50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.xy{
    position: absolute;
    top: v-bind(mouseX) + 'px';
    left: v-bind(mouseY) + 'px';
}
</style>