<template>
    <Transition name="slide">
        <div class="flex flex-col items-center">

            <DropZone
                class="min-h-[92px] w-full bg-admin-sidebar rounded-[11px] bg-opacity-85 hover:bg-admin-sidebarTop"
                @files-dropped="addFiles" #default="{ dropZoneActive }">
                <label for="file-input" class="flex h-full items-center justify-content text-center">
                    <span v-if="dropZoneActive">
                        <span>Drop Them Here</span>
                    </span>
                    <span class="m-auto " v-else>
                        <span class="text-white text-xl" v-if="files.length == 0">Dépose tes images ici</span>
                        <span class="text-white text-xl" v-else>
                            {{ files.length }} images déposé<br>
                            <span class="text-xs italic">(Vous pouvez encore en déplacé)</span>
                        </span>
                    </span>
                </label>
            </DropZone>
            <span>ou</span>
            <input type="file" name="file" id="file-input" class="inputfile" multiple @change="onInputChange" />
            <label for="file-input">Sélectionner des images</label>
            <div v-if="files.length > 0" class="file-preview">
                <span>Prévisualisation</span>
                <br>
                <FilePreview v-for="file of files" :key="file.id" :file="file" tag="li" class="file-preview_row"
                    @remove="removeFile">
                </FilePreview>
            </div>



            <button v-if="files.length > 0" @click.prevent="uploadFiles(files)" class="upload-button btn">Mettre en
                ligne</button>

            <div class="flex flex-wrap mt-12">
                <li class="card" v-for="(image, index) in test2" :key="index" loading="lazy">
                    <img class="card_img lazyload" data-sizes="auto"
                        :data-src="config.apiURL + 'storage/thumbnail/' + image.path" />
                    <div></div>
                </li>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const files = ref([])

const test2 = computed(() => {
    return gallery.value;
})

async function uploadFile(file) {
    let formData = new FormData()


    formData.append('file', file.file)
    formData.append('folder', props.data.folder)
    formData.append('folder_id', props.data.id)

    file.status = 'loading';

    const get = await $api.store('/api/admin/gallery/upload', formData);

    file.status = 'success';
}

function uploadFiles(files) {
    files.status = 'loading';
    files.map((file) => uploadFile(file));
    files.status = 'success';

    this.files = [];
}

function onInputChange(e) {
    addFiles(e.target.files)
    e.target.value = null
}

function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId)
}
function removeFile(file) {
    const index = files.value.indexOf(file)

    if (index > -1) files.value.splice(index, 1)
}
function addFiles(newFiles) {
    console.log(addFiles);
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
export interface Gallery {
    name: string
}


const test = ref(props.data)
const images = ref([])
const gallery = ref<Gallery[]>()
watch(() => props.data, (first, newData) => {

    const get = async () => gallery.value = (await $api.get<Gallery[]>('/api/admin/gallery/album/' + props.data.id)).data;

    setTimeout(_ => get(), 500);



    // const assets = ref(import.meta.glob('/assets/images/becon/**'));
    // for (let image in assets.value)
    //     images.value.push({ pathShort: image })
})

</script>
<style lang="scss" scoped>
.slidein {
    .card {
        border-radius: 11px;
        padding: 2px;
    }

    .card_img {
        &:hover {
            opacity: 0.3;
        }
    }
}

.upload-button {
    @apply bg-admin-sidebar m-auto mt-7;
    width: 253px;
    padding: 15px;
}

.file-preview {
    max-width: 650px;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #F2F4F5;
    padding: 14px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    overflow: scroll;
    min-height: 361px;
    overflow: unset;
    overflow-y: scroll;
    margin-top: 30px;
}

li.file-preview_row:not(:last-child) {
    margin-bottom: 10px;
}


.inputfile {
    @apply overflow-hidden absolute w-px h-px opacity-0;
}

.inputfile+label {
    @apply bg-admin-button;
    width: 235px;
    height: 35px;
    font-size: 0.9375rem;
    line-height: 2.1rem;
    cursor: pointer;
    text-align: center;
    color: black;
    font-weight: bold;
    display: inline-block;
    border-radius: 11px;
}

/*
.inputfile:focus + label,
.inputfile + label:hover {
    background-color: red;
} */

.drop-area {
    @apply h-[92px] bg-[#17277D];
    opacity: 0.85;
    border-radius: 11px;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-enter-active {
    transition: all 0.6s ease-in-out;
}

.slide-leave-active {
    transition: all 0.4s ease-in-out;
}

.slide-enter-from {
    transform: translateX(100%);

}

.slide-leave-to {
    transform: translateX(100%);

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



.file-preview::-webkit-scrollbar-thumb {
    height: 1em;
    border: 0.5em solid rgba(0, 0, 0, 0);
    /* Transparent border together with `background-clip: padding-box` does the trick */
    background-clip: padding-box;
    -webkit-border-radius: 1em;
    background-color: #fbbf24;
    -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
}

.file-preview::-webkit-scrollbar {
    width: 1.5em;
    /* Total width including `border-width` of scrollbar thumb */
    height: 0;
}

.file-preview::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
}

.file-preview::-webkit-scrollbar-corner {
    background-color: transparent;
}

/*
** card
*/
</style>

