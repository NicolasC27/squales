<template>
    <Transition name="slide">
        <div class="flex flex-col">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900">
                    Nom de l'album</label>
                <input type="text" id="small-input" v-model="folderName"
                    class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
            </div>
            <DropZone class=" flex w-full justify-center" @files-dropped="addFiles"
                :class="{ 'cursor-not-allowed opacity-50': loadingFiles.finished }" #default="{ dropZoneActive }">
                <label for="file-input" class="
                    border-dashed rounded-lg flex flex-col bg-gray-50 border-2 border-gray-300 h-48 w-full justify-center items-center
                    dark:bg-gray-700 
                    hover:bg-gray-100"
                    :class="{ 'cursor-not-allowed': loadingFiles.finished, 'cursor-pointer': !loadingFiles.finished }">
                    <!-- <div v-if=" dropZoneActive">
                    <span>Drop Them Here</span>
                    </div> -->
                    <div class="text-center items-center" :class="{ 'cursor-not-allowed': loadingFiles.finished }">
                        <div v-if="files.length == 0" class="items-center">
                            <svg aria-hidden="true" class="m-auto h-10 mb-3 text-gray-400 w-10" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                </path>
                            </svg>
                            <p class="text-sm mb-2 text-gray-500 dark:text-gray-400">
                                <span class="font-semibold">
                                    Clique ici pour mettre des photos
                                </span>
                                ou glisse les ici
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG autorisé </p>
                        </div>
                        <div v-else-if="!loadingFiles.finished">
                            <p class="text-sm mb-2 dark:text-gray-400">
                                <span class="font-semibold">
                                    {{ files.length }}
                                </span>
                                images déposé
                            </p>
                            <p class="text-xs  dark:text-gray-400">
                                (Vous pouvez encore en déplacé)
                            </p>
                        </div>
                        <div v-else>
                            <p class="text-sm mb-2 dark:text-gray-400">
                                <span class="font-semibold">
                                    Pour remettre des images en ligne
                                </span>
                                vous devez appuyez sur le bouton <span class="font-semibold">FINIT</span> ci-dessous
                            </p>

                        </div>
                    </div>
                </label>
            </DropZone>

            <input type="file" name="file" id="file-input" class="inputfile" multiple @change="onInputChange"
                :disabled="loadingFiles.finished" />

            <div v-if="files.length > 0"
                class="bg-white border rounded-lg border-gray-200 shadow-md mt-12 text-center mb-6 w-full max-w-[650px] pt-6 pl-6 self-center file-preview dark:bg-gray-800 dark:border-gray-700">

                <h5 class="font-bold mb-2 pr-6 text-3xl text-gray-900 dark:text-white ">
                    Prévisualisation
                </h5>

                <p class="text-base mb-5 pr-6 text-gray-500 sm:text-lg dark:text-gray-400">
                    Voici un rapide aperçu des photos prêt à être envoyé, vous pouvez encore retirer des photos</p>

                <br>

                <div class="h-full max-h-96 file-preview overflow-auto">
                    <FilePreview v-for="file of files" :key="file.id" :file="file" tag="li"
                        class="file-preview_row last:pb-6" @remove="removeFile" :finished="loadingFiles.finished">
                    </FilePreview>
                </div>

            </div>



            <button :disabled="loadingFiles.status" v-if="files.length > 0" @click.prevent="!loadingFiles.finished && uploadFiles(files);
            loadingFiles.finished && removePreview()" type="button"
                class="rounded-lg font-sans font-medium bg-blue-800 text-white  text-sm text-center self-center"
                :class="{ 'cursor-not-allowed bg-blue-400': loadingFiles.status, 'hover:bg-blue-900 cursor-pointer': !loadingFiles.status }">

                <span v-if="!loadingFiles.status && !loadingFiles.finished" class=" uploadButton">
                    <svg class="h-6 mr-3 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                        </path>
                    </svg>
                    Mettre en ligne
                </span>

                <span class="uploadButton" v-else>
                    <svg v-if="!loadingFiles.finished" aria-hidden="true" role="status"
                        class="h-4 mr-3 text-white animate-spin w-4 inline" viewBox="0 0 100 101" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor" />
                    </svg>
                    {{ !loadingFiles.finished ? "Chargement..." : "Finit !" }}
                    {{ !loadingFiles.finished ? "" : "Tu peux enlever la prévisualisation en me cliquant!" }}

                </span>
            </button>

            <div class="mt-12 w-full">
                <label for="red-toggle" class="cursor-pointer mr-5 inline-flex relative items-center">
                    <input type="checkbox" v-model="deleteMode" id="red-toggle" class="sr-only peer">
                    <div
                        class="rounded-full bg-gray-200 h-6 w-11 peer  peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700 ''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600">
                    </div>
                    <span class="font-medium text-sm ml-3 text-gray-900 dark:text-gray-300">Mode suppression</span>
                </label>
            </div>

            <div class="flex flex-wrap mt-3 pb-14 " :class="{ 'items-center h-full self-center': loading }">

                <svg v-if="loading" role="status"
                    class="h-28 mr-2 animate-spin fill-blue-600 text-gray-200 w-28 inline dark:text-gray-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>

                <li class="card" :class="{ 'hover:bg-red-600 cursor-deleteMode': deleteMode }"
                    v-for="(image, index) in test2" :key="image.id" loading="lazy">
                    <img class="card_img lazyload" data-sizes="auto"
                        :data-src="config.apiURL + 'storage/thumbnail/' + image.path"
                        @click="deleteMode && removePicture(index, image.id)" />
                    <!-- <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                    </svg> -->

                    <div></div>
                </li>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>


export interface Gallery {
    name: string
}
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const files = ref([])
const folderName = ref(null);
const loadingFiles = reactive({
    status: false,
    finished: false,
    number: 0,
});
const loading = ref(false);

const test2 = computed(() => {
    return gallery.value;
})

const deleteMode = ref(false);

function activeDeleteMode() {
    deleteMode.value = !deleteMode.value;
}

async function removePicture(index, imageid) {

    console.log(index);
    console.log(imageid);
    if (deleteMode) {
        await $api.delete('/api/admin/gallery/picture/' + imageid);
    }
    gallery.value.splice(index, 1);
}

async function uploadFile(file) {
    let formData = new FormData()


    formData.append('file', file.file)
    formData.append('folder', props.data.folder)
    formData.append('folder_id', props.data.id)

    file.status = 'loading';

    try {
        await $api.store('/api/admin/gallery/upload', formData);
        file.status = 'success';
        getPictures();
        return true;
    } catch ($e) {
        file.status = 'failed';

    }

    return true;
}

async function uploadFiles(files) {
    loadingFiles.status = true;

    const result = files.map(async (file) => {
        return await uploadFile(file);
    });

    await Promise.all(result)

    loadingFiles.status = false;
    loadingFiles.finished = true;

    // this.files = [];
}

function onInputChange(e) {
    if (!loadingFiles.finished) {
        addFiles(e.target.files)
        e.target.value = null
    }
}

function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId)
}
function removeFile(file) {
    if (!loadingFiles.finished) {
        const index = files.value.indexOf(file)

        if (index > -1) files.value.splice(index, 1)
    }
}

function addFiles(newFiles) {
    let newUploadableFiles = [...newFiles]
        .map((file) => new UploadableFile(file))
        .filter((file) => !fileExists(file.id))
    files.value = files.value.concat(newUploadableFiles)
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
    },
})

const gallery = ref<Gallery[]>()

const getPictures = async () => gallery.value = (await $api.get<Gallery[]>('/api/admin/gallery/album/' + props.data.id)).data;
watch(() => props.data, (first, newData) => {

    reset();
    folderName.value = props.data.folder;
    setTimeout(_ => getPictures().then((response) => {
        loading.value = false;
    }), 500);


})

function removePreview() {
    loadingFiles.status = false;
    loadingFiles.finished = false;
    this.files = [];
}

const reset = () => {
    loadingFiles.status = false;
    loadingFiles.finished = false;
    loading.value = true;
    gallery.value = null;
    files.value = [];
}

</script>
<style lang="scss" scoped>
/*
**
* Upload Button
*/
.uploadButton {
    @apply mr-2 py-2.5 px-5 inline-flex items-center;
}

/*
**
* slideIn
*/
.slidein {
    .card {
        @apply list-none rounded-[11px] h-44 m-[3px] p-0 w-[19%];
    }

    .card_img {
        @apply rounded-lg h-full object-cover bg-[#B4B4B4] w-full;
    }

    .card {
        opacity: 1;
        transition: background-color 300ms ease-out;
    }

    .card_img {
        &:hover {
            opacity: 0.4;
        }
    }
}

.upload-button {
    @apply bg-admin-sidebar m-auto mt-7;
    width: 253px;
    padding: 15px;
}

li.file-preview_row:not(:last-child) {
    margin-bottom: 10px;
}


.inputfile {
    @apply h-px w-px opacity-0 overflow-hidden absolute;
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
    @apply bg-[#17277D] h-[92px];
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
