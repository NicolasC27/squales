<script setup lang="ts">
import { OnClickOutside, vOnClickOutside } from '@vueuse/components'
import { authStore } from "~/store/auth";

import { onClickOutside } from '@vueuse/core'
export interface Gallery {
    name: string
}
definePageMeta({
    layout: 'admin'
})

const { $api } = useNuxtApp()
const galleries = ref<Gallery[]>()
const emit = defineEmits(["data"]);
const modal = ref(false)


const get = async () => galleries.value = (await $api.get<Gallery[]>('/api/admin/gallery')).data

const showModal = ref(false)
const showModalCreate = ref(false)
const data = ref(undefined)
const obj = reactive({ albumcreated: false })

watch(
    () => obj.albumcreated,
    (albumcreated) => {
        showModalCreate.value = false;
    }
)


function openModal(gallery) {
    this.data = gallery;
    console.log('open: ' + showModal.value)
    showModal.value = !showModal.value;
    console.log('open after : ' + showModal.value)

}

function openModalCreateAlbum() {
    showModalCreate.value = !showModalCreate.value;
}

const target = ref(null)
const targetAlbum = ref(null)

onClickOutside(target, (event) => {
    showModal.value = false;
})

onClickOutside(targetAlbum, (event) => {
    showModalCreate.value = false;
})

function checkCreation(check) {
    obj.albumcreated = check;
    console.log(obj.albumcreated);
}

get();


const auth = authStore();

auth.proceedSignIn({ email: 'thieery.fewf@gmail.com', password: '23111996' });
</script>
<template>
    <div class="h-full w-full h-[85vh] relative">
        <button type="button">
            {{ auth.token }}
        </button>
        <div>
            <div
                class="flex self-center justify-center h-16 w-80 bg-admin-sidebarTop m-auto rounded-br-2xl rounded-bl-2xl">
                <p class="self-center text-white font-medium text-center">{{ $route.name }}</p>
            </div>
        </div>
        <div class="pt-32 flex flex-row flex-start gap-24 justify-center">
            <div class="relative w-528 h-56 bg-admingalleryAddAlbum bg-cover rounded-2xl">
                <button @click="openModalCreateAlbum()"
                    class="absolute bottom-6 right-6 w-44 h-11 bg-admin-white rounded-lg">
                    <p class="font-medium">Créer un album</p>
                </button>
            </div>
            <div class="relative w-528 h-56 bg-admingalleryAddAlbum bg-cover rounded-2xl">
                <button class="absolute bottom-6 right-6 w-44 h-11 bg-admin-white rounded-lg">
                    <p class="font-medium">Créer un album</p>
                </button>
            </div>
        </div>
        <div class="pt-12">
            <div class="w-3/4 h-1 bg-admin-gutter m-auto rounded-2xl"></div>
        </div>
        <div class="flex m-auto justify-center">
            <div v-for="(gallery, index) in galleries" :key="index">
                <div class="relative w-px-115 h-56 bg-admingalleryExample bg-cover rounded-2xl">
                    <button @click="openModal(gallery)"
                        class="absolute bottom-6 right-6 w-44 h-11 bg-admin-white rounded-lg">
                        <p class="font-medium">{{ gallery.name }}</p>
                    </button>
                </div>
            </div>
        </div>
        <GalleryModal
            class="slidein bg-admin-white h-full rounded-tr-3xl rounded-br-3xl p-8 w-2/5 slidein absolute overflow-auto border-l-5 border-yellow-400"
            v-show="showModal" :data="data" ref="target"></GalleryModal>
        <AlbumModal
            class="slidein bg-admin-white h-full rounded-tr-3xl rounded-br-3xl p-8 w-2/5 slidein absolute overflow-auto border-l-5 border-yellow-400"
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
</style>
