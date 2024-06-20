<template>
     <div class="stopwatch" font-mono>

        <div class="stopwatch_box">

          <div class="mid">
            <div class="time">
              {{ formatted(timestamp - startTime) }}
            </div>
          </div>
        </div>

        <!-- 控制区域 -->
        <div class="control">
          <i p-18px box-border cursor-pointer i-line-md-chevron-left @click="back()">
          </i>
          <TransitionGroup name="controller">
            <div p-18px box-border cursor-pointer i-material-symbols-play-arrow-rounded v-show="state == 'ready'"
              @click="timekeeping_btn()" key="ready"></div>
            <i p-18px box-border cursor-pointer i-material-symbols-pause-outline-rounded v-show="state == 'start'" bg-red
              @click="timekeeping_btn()" key="start"></i>
            <i p-18px box-border cursor-pointer i-material-symbols-downloading-rounded bg="green/80" v-show="state == 'stop'"
              @click="timekeeping_btn()" key="stop"></i>
            <!-- <i p-18px box-border cursor-pointer i-mdi-progress-close bg-red v-show="state == 'stop'" @click="DNForPOP()"
          key="stop"></i> -->
          </TransitionGroup>
          <i p-16px box-border cursor-pointer i-vscode-icons-file-type-excel @click="ShareExcel()" title="复制成绩（csv格式）"></i>
          <i p-18px box-border cursor-pointer i-material-symbols-view-sidebar-outline-rounded @click="switchTimeListBox()">
          </i>
        </div>
        <Transition name="animation_slide">
          <div class="TimeListBox_right" v-if="showTimeListBox_right">
            <div class="TimeListItem" title="最快">
              <i p-10px box-border i-mdi-rabbit bg-green></i>
              <div text-green>{{ Time_Min() }}</div>
              <div text-green>最快</div>
            </div>
            <div class="TimeListItem" title="平均值">
              <i p-10px box-border i-mdi-duck bg-yellow></i>
              <div text-yellow>{{ Time_Average() }}</div>
              <div text-yellow>平均</div>

            </div>
            <div class="TimeListItem" title="最慢">
              <i p-10px box-border i-mdi-tortoise bg-red></i>
              <div text-red>{{ Time_Max() }}</div>
              <div text-red>最慢</div>
            </div>
            <TransitionGroup name="list">
              <div class="TimeListItem" v-for="(item, index) in TimeList" :key="index">
                <div>{{ index + 1 }}</div>
                <div>{{ item }}</div>
                <div p-4px text-red i-mdi-sticker-remove-outline @click="clearLast()"></div>
              </div>
            </TransitionGroup>
          </div>
        </Transition>
      </div>
</template>


<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter } from "vue-router"
import {
    useDateFormat,
    useTimestamp,
    onKeyStroke,
    useWindowSize,
    useNow,
} from "@vueuse/core";
import { useAverage, useMax, useMin } from "@vueuse/math";

//
const router = useRouter()

function back() {
    router.go(-1)
}

// 秒表状态
let state = ref<"stop" | "start" | "ready">("ready");

//右边列表状态
const { width, height } = useWindowSize(); //窗口大小
let showTimeListBox_right = ref<boolean>();
if (width.value < 720) {
    showTimeListBox_right.value = false;
} else {
    showTimeListBox_right.value = true;
}
watch(width, (v) => {
    if (v < 720) {
        showTimeListBox_right.value = false;
    }
});

//切换右边时间列表的状态
function switchTimeListBox() {
    showTimeListBox_right.value = !showTimeListBox_right.value;
}

//利用另一个vueuse函数 来监听 空格键抬起开始计时 //开始计时
onKeyStroke(
    [" "],
    (e) => {
        if (state.value == "ready" || state.value == "stop") {
            timekeeping();
        } else if (state.value == "start") {
            state.value = "stop";
        }
    },
    { eventName: "keyup" }
);
onKeyStroke(
    [" "],
    (e) => {
        if (state.value == "start") {
            timekeeping();
        }
    },
    { eventName: "keydown" }
);

//时间戳 - timestamp （pause是暂停）（resume是继续）
const { timestamp, pause, resume } = useTimestamp({ controls: true });
//开始时的时间戳
let startTime = ref<number>(0);

function timekeeping() {
    if (!showTimeListBox_right.value || width.value > 720) {
        if (state.value === "ready") {
            // console.log("开始计时");
            startTime.value = Date.now(); //当前时间的时间戳
            resume(); //开始启动时间戳
            state.value = "start";
        } else if (state.value === "start") {
            // console.log("暂停计时");
            pause(); //暂停时间戳
            // state.value = "stop";
        } else if (state.value === "stop") {
            ListPush(); //归入表
            state.value = "ready";
        }
    }
}
function timekeeping_btn() {
    if (state.value === "ready") {
        startTime.value = Date.now();
        resume(); //开始启动时间戳
        state.value = "start";
    } else if (state.value === "start") {
        pause(); //暂停时间戳
        state.value = "stop";
    } else if (state.value === "stop") {
        ListPush(); //归入表
        state.value = "ready";
    }
}

//时间戳列表
let timestampList: any = ref([]);
//时间列表
let TimeList: any = ref([]);
//归入表
function ListPush() {
    let time = timestamp.value - startTime.value;
    TimeList.value.push(useDateFormat(time, "mm:ss.SSS").value.slice(0, -1));
    timestampList.value.push(time);
}
//时间格式
function formatted(Now: number) {
    if (state.value == "ready") {
        return "00:00.00";
    } else {
        let xxg = useDateFormat(Now, "mm:ss.SSS");
        return xxg.value.slice(0, -1);
    }
}

//清除本次
function DNForPOP() {
    state.value = "ready";
}
//清除上一次
function clearLast() {
    TimeList.value.pop();
    timestampList.value.pop();
}
//清除所有记录
function clearAll() {
    TimeList.value = [];
    timestampList.value = [];
}

//平均时间
function Time_Average() {
    if (TimeList.value.length == 0) {
        return "00:00.00";
    } else {
        const averageValue = useAverage(timestampList.value);
        return useDateFormat(averageValue, "mm:ss.SSS").value.slice(0, -1);
    }
}
//最大时间
function Time_Max() {
    if (TimeList.value.length == 0) {
        return "00:00.00";
    } else {
        const sum = useMax(timestampList.value);
        return useDateFormat(sum, "mm:ss.SSS").value.slice(0, -1);
    }
}
//最小时间
function Time_Min() {
    if (TimeList.value.length == 0) {
        return "00:00.00";
    } else {
        const sum = useMin(timestampList.value);
        return useDateFormat(sum, "mm:ss.SSS").value.slice(0, -1);
    }
}

//复制 出 csv格式数据👇
function ShareExcel() {
    const formatter = ref("YYYY年M月D日");
    const formatted = useDateFormat(useNow(), formatter.value);
    let Excel_Date = formatted.value;
    let Excel_Min = Time_Min();
    let Excel_Average = Time_Average();
    let Excel_Max = Time_Max();
    let Excel_Data =
        Excel_Date +
        "\t" +
        Excel_Min +
        "\t" +
        Excel_Average +
        "\t" +
        Excel_Max +
        "\t";
    function JSONtoCSV(arrData: any) {
        let csv = Excel_Data;
        for (let i = 0; i < arrData.length; i++) {
            let rows = "";
            let arrValue = arrData[i] == null ? "" : "" + arrData[i];
            rows = arrValue + ",";
            rows = rows.slice(0, rows.length - 1);
            csv += rows + "\t";
        }
        // console.log(csv);
        return csv;
    }
    const csv = JSONtoCSV(TimeList.value);

    var oInput = document.createElement("textarea");
    oInput.value = csv;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = "oInput";
    oInput.style.display = "none";
    
}
</script>

<style lang="scss" scoped>
*::-webkit-scrollbar{
    display: none;
}
.stopwatch {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;

    .stopwatch_box {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .mid {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .time {
            width: 100%;
            // box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14vw;
            overflow: hidden;
        }
    }

    .control {
        position: fixed;
        z-index: 100;
        bottom: 10px;
        left: 0px;
        right: 0px;
        margin: auto;
        width: calc(96% - 40px);
        max-width: 800px;
        height: 60px;
        border-radius: 5px;
        padding: 0 20px;
        background-color: var(--xg-bg-box1-color);
        display: flex;
        align-items: center;
        justify-content: space-between;

        a {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all .3s;

            &:hover {
                opacity: 0.5;
            }
        }
    }
}

.TimeListBox_right {
    width: 300px;
    height: calc(100% - 180px);
    flex-shrink: 0;
    background-color: var(--xg-bg-color);
    margin: 80px 10px;
    padding: 10px 0;
    border-radius: 5px;
    overflow: auto;

    .TimeListItem {
        width: 94%;
        height: 50px;
        margin: 0px auto 10px;
        border-radius: 6px;
        background-color: rgba(217, 217, 217, 0.1);
        box-shadow: 0px 2px 16px -4px rgba(51, 51, 51, .3);
        box-sizing: border-box;
        padding: 0px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
    }
}

.animation_slide-enter-active {
    transition: width .2s ease-in-out, opacity .2s;
}

.animation_slide-leave-active {
    transition: width .2s, opacity .2s;
}

.animation_slide-enter-from {
    width: 0px;
    opacity: 0;
}

.animation_slide-leave-to {
    width: 0px;
    opacity: 0;
}

//控制器动画
.controller-enter-active {
    transition: all 0.2s ease-in-out;
}


.controller-enter-from {
    position: absolute;
    transform: scale(0.8);
    opacity: 0;
}

.controller-leave-to {
    position: absolute;
    transform: scale(0.8);
    opacity: 0;
}

//
.list-enter-active {
    transition: all 0.5s ease;
}

.list-leave-active {
    transition: all 0.5s ease-out;
}

.list-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

//适配移动端👇
@media screen and (max-width: 720px) {
    .stopwatch {
        .TimeListBox_right {
            position: fixed;
            width: calc(100% - 20px);
            z-index: 200;
        }
    }
}
</style>