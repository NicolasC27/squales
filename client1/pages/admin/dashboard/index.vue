<script setup lang="ts">
import { OnClickOutside, vOnClickOutside } from '@vueuse/components'
import { onClickOutside } from '@vueuse/core'

/*
** Define interface
*/
export interface Gallery {
    name: string
}

/*
** Define page meta
*/
definePageMeta({
    layout: 'admin',
})

/*
** Define variable
*/
const { $api }          = useNuxtApp()
const emit              = defineEmits(["data"]);

const galleries         = ref<Gallery[]>()
const data              = ref(undefined)
const showModal         = ref(false)
const showModalCreate   = ref(false)
const target            = ref(null)
const targetAlbum       = ref(null)

const obj               = reactive({ albumcreated: false })

/*
** END DEFINE VARAIBLE
*/

watch(  ()              => obj.albumcreated, 
        (albumcreated)  => { showModalCreate.value = false; }
)

const   getGallery  = async () => galleries.value
                    = (await $api.get<Gallery[]>('/api/admin/gallery')).data


/*
** Define function
*/
function    openModal(gallery): void {
    this.data = gallery;
    showModal.value = !showModal.value;
}

function    openModalCreateAlbum(): void {
    showModalCreate.value = !showModalCreate.value;
}

function    checkCreation(check): void {
    obj.albumcreated = check;
    if (obj.albumcreated)
        getGallery();
}

onClickOutside(target, (event): void => {
    showModal.value = false;
})

onClickOutside(targetAlbum, (event): void => {
    showModalCreate.value = false;
})

getGallery();
</script>
<template>
    <div class="flex flex-col h-[90vh] w-full relative">
        <div>
            <div
                class="bg-admin-sidebarTop flex m-auto rounded-br-2xl rounded-bl-2xl h-16 w-80 self-center justify-center">
                <p class="font-medium text-white text-center self-center">{{ $route.name }}</p>
            </div>
        </div>
        <div class="flex flex-row flex-start pt-32 gap-24 justify-center">
            <div class="bg-admingalleryAddAlbum bg-cover rounded-2xl h-56 w-528 relative">
                <button @click="openModalCreateAlbum()"
                    class="bg-admin-white rounded-lg h-11 right-6 bottom-6 w-44 absolute">
                    <p class="font-medium">Créer un album</p>
                </button>
            </div>
            <div class="bg-admingalleryAddAlbum bg-cover rounded-2xl h-56 w-528 relative">
                <button class="bg-admin-white rounded-lg h-11 right-6 bottom-6 w-44 absolute">
                    <p class="font-medium">Créer un album</p>
                </button>
            </div>
        </div>
        <div class="pt-12 pb-12">
            <div class="m-auto bg-yellow-300 rounded-2xl h-1 w-3/4"></div>
        </div>
        <div class="flex flex-row flex-wrap m-auto w-4/5 gallery justify-center overflow-auto">
            <div v-for="(album, index) in galleries" :key="index" class="p-3">
                <div class="bg-cover rounded-2xl h-56 w-[460px] relative ">
                    <img v-if="album.pictures.length <= 0 " class="rounded-2xl"
                        src="/images/front/normandie_epave.png" />
                    <img v-else class="rounded-2xl" :src="album.pictures[0]?.crop_url" />

                    <button @click="openModal(album)"
                        class="bg-admin-white rounded-lg h-11 right-6 bottom-6 w-44 absolute ">
                        <p class="font-medium">{{ album.name }}</p>
                    </button>
                </div>
            </div>
        </div>
        <GalleryModal
            class="bg-admin-white h-full border-l-[7px] border-yellow-300 rounded-tr-3xl rounded-br-3xl p-8 w-[42%] slidein absolute overflow-auto "
            v-show="showModal" :data="data" ref="target"></GalleryModal>
        <AlbumModal
            class="bg-admin-white h-full border-l-[7px] border-yellow-400 rounded-tr-3xl rounded-br-3xl p-8  w-[42%] slidein absolute overflow-auto "
            @albumcreated="checkCreation" v-show="showModalCreate" ref="targetAlbum"></AlbumModal>

    </div>
</template>
<style scoped>
.slidein {
    right: 0;
    top: 0;
}

.slidein::-webkit-scrollbar {
    width: 1.5em;
    /* Total width including `border-width` of scrollbar thumb */
    height: 0;
}

.slidein::-webkit-scrollbar-thumb {
    height: 1em;
    border: 0.5em solid rgba(0, 0, 0, 0);
    /* Transparent border together with `background-clip: padding-box` does the trick */
    background-clip: padding-box;
    -webkit-border-radius: 1em;
    background-color: #17277D;
    -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
}

.slidein::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
}

.slidein::-webkit-scrollbar-corner {
    background-color: transparent;
}

.gallery::-webkit-scrollbar {
    width: 0 !important
}
</style>
