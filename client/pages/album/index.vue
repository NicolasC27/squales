<script setup lang="ts">

export interface Album {
  name: string;
  folder: string;
}
definePageMeta({
  layout: "default",
});

const { $api } = useNuxtApp();
const album = ref<Album[]>();

const get = async () => (album.value = (await $api.get<Album[]>("/api/album")).data);

get();

</script>

<template>
  <div class="w-full m-auto">
    <div class="banner-gallery flex h-96 bg-center bg-dive-banner bg-cover bg-no-repeat">
      <h1>Album</h1>
    </div>
    <div class="h-48"></div>
    <div class="flex w-[1280px] m-auto">
      <div class="h-full m-auto" v-for="(album, index) in album" :key="index">
        <NuxtLink :to="'/album/' + album.folder">
          <img src="/images/front/normandie_epave.png" class="rounded-2xl" />
          <div class="">
            <span class="absolute left-6 top-3.5 text-2xl font-medium tracking-wide">{{
                album.name
            }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script></script>
<style>
</style>
