<template>
    <div>
        <div class="SwitchFont">
            <div class="select_box_1">
                <USelect class="USelect" v-model="from_type" :options="countries" option-attribute="name"
                    @change="Change_select('from')" />
                <div @click="Change_select('swop')" p-3.6 i-solar-square-transfer-horizontal-line-duotone />
                <USelect class="USelect" v-model="to_type" :options="countries" option-attribute="name"
                    @change="Change_select('to')" />
            </div>
            <div class="select_box_2">
                <UTextarea h-200px class="UTextarea" v-model="originalText" @update:model-value="Change_select('from')" />
                <UTextarea h-200px class="UTextarea" v-model="convertedText" @update:model-value="Change_select('to')" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { Converter } from 'opencc-js';

const originalText = ref('');  // 假设这是简体字
const convertedText = ref('');


let from_type: any = ref('cn')
let to_type: any = ref('tw')
let old_from_type: any = ref('cn')
let old_to_type: any = ref('tw')

const countries = [{
    name: '简体中文',
    value: 'cn',
}, {
    name: '台湾繁体',
    value: 'tw',
}, {
    name: '香港繁体',
    value: 'hk',
}]


const Change_select = (who: any) => {
    if (who == 'swop') {
        console.log(0)
        from_type.value = old_to_type.value
        to_type.value = old_from_type.value
    } else if (who == 'from' && to_type.value == from_type.value) {
        console.log(1)
        to_type.value = old_from_type.value
        old_to_type.value = old_from_type.value
    } else if (who == 'to' && to_type.value == from_type.value) {
        console.log(2)
        from_type.value = old_to_type.value
        old_from_type.value = old_to_type.value
    }


    if (who == 'from') {
        convertText()
        txeTrevnoc()
    } else {
        txeTrevnoc()
        convertText()
    }
    old_to_type.value = to_type.value
    old_from_type.value = from_type.value
}

const convertText = async () => {
    console.log(from_type.value, to_type.value)
    const converter = await Converter({ from: from_type.value, to: to_type.value });
    convertedText.value = converter(originalText.value);
};

const txeTrevnoc = async () => {
    console.log(from_type.value, to_type.value)
    const converter = await Converter({ from: to_type.value, to: from_type.value });
    originalText.value = converter(convertedText.value);
};

</script>

<style scoped>
.SwitchFont {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* gap: 10px; */
}

.USelect {
    width: 70%;
    margin: 10px;
}

.select_box_1 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px
}

.UTextarea {
    width: 90vw;
}

.select_box_2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px
}

/* 当屏幕大于1200px */
@media (min-width: 720px) {
    .select_box_2 {
        display: flex;
        flex-direction: row;
        gap: 48px
    }

    .UTextarea {
        width: 300px;
    }
    .select_box_1 {
        gap: 0px
    }
    .USelect {
        width: 300px;
    }
}
</style>