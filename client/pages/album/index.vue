<script setup lang="ts">

export interface Album {
  name: string;
  folder: string;
}

definePageMeta({
  layout: "default",

});

/*
** Define variable
*/
const { $api } = useNuxtApp();
const albums = ref<Album[]>();

onMounted(async () => (albums.value = (await $api.get<Album[]>("/api/album")).data));

/**
* Function
 */

</script>

<template>
  <div class="flex flex-col">
    <div class="bg-center bg-dive-banner bg-cover bg-no-repeat h-96 w-full banner-gallery">
      <h1>Album</h1>
    </div>
    <div class="h-48"></div>
    <div class="m-auto w-[1280px]">
      <div class="flex flex-wrap flex-row justify-start">
        <div class="h-full w-full p-2 basis-1/4" v-for="(album, index) in albums" :key="index">
          <NuxtLink :to="'/album/' + album.folder">
            <img v-if="album.pictures?.length === 0" class="rounded-2xl" src="/images/front/normandie_epave.png" />
            <img v-else="album.pictures?.length > 0" class="rounded-2xl" :src="album.pictures[0]?.crop_url" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
