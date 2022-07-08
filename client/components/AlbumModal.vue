<template>
    <Transition name="slide">
        <div class="flex flex-col items-center">

            <form>
            <h1>Create Album</h1>


            <label for="">Nom de l'album</label>
            <input type="text" v-model="name" placeholder="Nom de l'album"/>

            <label for=""></label>

            <button type="submit" @click.prevent="createAlbum()">Créer</button>
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
    transition:  all 0.4s ease-in-out;
}

.slide-enter-from{
    transform: translateX(100%);

}
.slide-leave-to {
    transform: translateX(100%);

}

</style>
