<template>
    <div class="Home">
        <div class="main">
            <div class="box" v-for="i in app_list" @click="go_router(i.url)">
                <div class="box_box" >
                    <div class="box_ico">
                        <div p-4 m-1 :class="i.icon"></div>
                    </div>
                    <div class="box_fav" @click="i.favorite = !i.favorite">
                        <div p-3 m-1 :class="i.favorite? 'i-solar-star-bold-duotone' : 'i-solar-star-broken' " 
                        hover:i-solar-star-bold-duotone hover:text-yellow></div>
                    </div>
                </div>
                <div class="title">{{ i.title }}</div>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>

const go_router = (url: string) => {
    navigateTo(url)
}

let app_list = [
    {
        'icon': 'i-solar-notes-bold-duotone',
        'title': '译字',
        'url': '/switch-font',
        'favorite': false,
    },
    {
        'icon': 'i-solar-stopwatch-bold-duotone',
        'title': '秒表',
        'url': '/stopwatch',
        'favorite': false,
    },
    {
        'icon': 'i-solar-map-bold-duotone',
        'title': 'Sitemap',
        'url': '/sitemap',
        'favorite': false,
    },
    {
        'icon': 'i-solar-map-point-wave-bold-duotone',
        'title': 'IP地址',
        'url': '/get-ip',
        'favorite': false,
    },
    {
        'icon': 'i-solar-tag-bold-duotone',
        'title': 'Ai绘图-Tag',
        'url': '/ai-tag',
        'favorite': false,
    },
]
</script>

<style scoped>


.main {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
}

.box {
    width: 200px;
    padding: 20px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
    user-select: none;
    cursor: pointer;
}
.box_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.box_ico {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
