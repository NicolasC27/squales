<script setup lang="ts">
import { OnClickOutside, vOnClickOutside } from '@vueuse/components'

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


const get = async () => galleries.value = (await $api.get<Gallery[]>('/example')).data

const showModal = ref(false)
const data = ref(undefined)

function openModal(gallery) {
    this.data = gallery;
    console.log('open: ' + showModal.value)

    showModal.value = !showModal.value;

    console.log('open after : ' + showModal.value)

}

const target = ref(null)

onClickOutside(target, (event) => {
    showModal.value = false;

})

get()

</script>
<template>
    <div class="pl-32">
        <div>
            <div
                class="flex self-center justify-center h-16 w-80 bg-admin-white m-auto rounded-br-2xl rounded-bl-2xl"
            >
                <p class="self-center text-grey font-medium text-center">{{ $route.name }}</p>
            </div>
        </div>
        <div class="pt-32 flex flex-row flex-start gap-24 justify-center">
            <div class="relative w-528 h-56 bg-admingalleryAddAlbum bg-cover rounded-2xl">
                <button class="absolute bottom-6 right-6 w-44 h-11 bg-admin-white rounded-lg">
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
                    <button
                        @click="openModal(gallery)"
                        class="absolute bottom-6 right-6 w-44 h-11 bg--white rounded-lg"
                    >
                        <p class="font-medium">{{ gallery.name }}</p>
                    </button>
                </div>
            </div>
        </div>
        <GalleryModal v-show="showModal" :data="data" ref="target"></GalleryModal>
    </div>
</template>

