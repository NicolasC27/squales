<template>
    <Transition name="slide">
        <div
            class="bg-admin-white h-full rounded-tl-3xl rounded-bl-3xl p-14 top-0 right-0 w-2/5 z-10 slidein absolute overflow-auto"
        >
            <div class="w-lg">Gallery Modal {{ data }}</div>
            <div>Add images</div>
            <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
                <label for="file-input">
                    <span v-if="dropZoneActive">
                        <span>Drop Them Here</span>
                        <span class="smaller">to add them</span>
                    </span>
                    <span v-else>
                        <span>Drag Your Files Here</span>
                        <span class="smaller">
                            or
                            <strong>
                                <em>click here</em>
                            </strong> to select files
                        </span>
                    </span>

                    <input type="file" id="file-input" multiple @change="onInputChange" />
                </label>
            </DropZone>
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
const files = ref([])

function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId)
}

function addFiles(newFiles) {
    let newUploadableFiles = [...newFiles]
        .map((file) => new UploadableFile(file))
        .filter((file) => !fileExists(file.id))
    files.value = files.value.concat(newUploadableFiles)
    console.log(files.value)
}

class UploadableFile {
    constructor(file) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
    }
}
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

