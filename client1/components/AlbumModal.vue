<template>
    <Transition name="slide">
        <div class="flex flex-col items-center">

            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="album_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom de
                            l'album</label>
                        <input type="text" id="album_name" v-model="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John" required>
                    </div>
                </div>
                <button type="submit" @click.prevent="createAlbum()"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer
                    l'album</button>
            </form>
        </div>
    </Transition>
</template>
<script setup>

const props = defineProps(['albumcreated'])
const emit = defineEmits(['albumcreated'])

const { $api } = useNuxtApp()
const config = useRuntimeConfig()

const name = ref('');

async function createAlbum() {
    let formData = new FormData()

    formData.append('name', name.value)


    const get = await $api.store('/api/admin/gallery/create', formData);

    emit('albumcreated', true)

    console.log(get);
}

</script>
<style>
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
</style>
