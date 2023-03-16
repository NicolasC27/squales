<template>
    <Transition name="slide">
        <div
            class="bg-admin-white h-full rounded-tl-3xl rounded-bl-3xl p-14 top-0 right-0 w-2/5 z-10 slidein absolute overflow-auto"
        >
            <div class="w-lg">Gallery Modal {{ data }}</div>
            <div>Add images</div>
            <div id="file-drag-drop">
                <form ref="fileform">
                    <span class="drop-files">Drop the files here!</span>
                </form>
            </div>
            <div class="flex flex-wrap">
                <li class="card" v-for="(image, index) in images" :key="index" loading="lazy">
                    <img class="card_img lazyload" data-sizes="auto" :data-src="image.pathShort" />
                    <div></div>
                </li>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})

const test = ref(props.data)
const images = ref([]);

watch(() => props.data, (first, newData) => {
    const assets = ref(import.meta.glob('/assets/images/becon/**'));
    for (let image in assets.value)
        images.value.push({ pathShort: image })
})

</script>
<style  scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-enter-active {
    transition: all 0.4s ease-in-out;
}

.slide-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
.slidein {
    position: fixed;
}

.card {
    @apply list-none h-44 w-1/5;
}

.card_img {
    @apply rounded-lg h-full object-cover bg-[#B4B4B4] w-full;
}

.lazyload,
.lazyloading {
    opacity: 0;
}
.lazyloaded {
    opacity: 1;
    transition: opacity 300ms;
}

/*
** card
*/
</style>

