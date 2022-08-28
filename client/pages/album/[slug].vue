<script setup lang="ts">

import { useAsyncState } from "@vueuse/core";


export interface Gallery {
  name: string;
  data: Object;
}

definePageMeta({
  pageTransition: {
    appear: true,
    name: 'page',
    duration: 400,
    type: 'transition'
  }
})

/**
* Define variable
*/
const { $api }  = useNuxtApp();

const route   = useRoute();
const config  = useRuntimeConfig();

const { state, ready } = useAsyncState(
  async () => {
    const { data } = await $api.get<Gallery[]>(
      "/api/admin/gallery/album/" + route.params.slug
    );
  return { data };
});

const galleryTop = computed(() =>
  state.value?.data?.album?.pictures?.slice(0,6)
)
const gallery = computed(() => state.value?.data?.album.pictures);

</script>

<template>
  <div>
    <div class="bg-gallery-banner h-[720px] w-full relative">
    </div>
     <div class="bg-black h-[150px] w-full flex flex-col">
        <p>
          Lundi 16 Oct 
          Mercredi 19 Oct
          Durée : 3 Jours
          6 Plongée
        </p>
      </div>
    <div class="flex flex-row items-center justify-center mt-8 w-[1280px] m-auto">
      <li class="flex list-none h-72 p-3" v-for="(items, index) in galleryTop" :key="items.id">
        <img class="rounded-xl" :src="items.thumbnail" alt="">
        
      </li>
    </div>
    <div class="border-solid m-auto border-b-[1px] border-[#999] mt-12 tracking-wider pb-20 text-[#333] leading-[29px] w-[1280px]">
      <p>Snorkel or dive in some of the most pristine marine ecosystems in the world. Discover coral gardens teeming with tropical fish, waters harboring sea lions or whale sharks, brilliant blue holes, and much more. A number of our small-ship voyages are equipped for scuba diving—in waters as rich as the Belize Barrier Reef and the far-flung atolls of Polynesia. Delve into vibrant undersea realms while snorkeling or diving (at additional cost) on the voyages below.</p>
    </div>
    <ul class="flex flex-wrap mt-12 transition-all w-[1280px] m-auto">
      <VuePictureSwipe :items="gallery"></VuePictureSwipe>
    </ul>
  </div>
</template>
<style>
.gallery-thumbnail {
  height: 20vh;
  flex-grow: 1;
  padding: 0.5rem;
  transition: all 0.4s ease-out;
}

.gallery-thumbnail:last-child {
  flex-grow: 10;
}

.gallery-thumbnail img {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transition: all 0.4s ease-out;
}

.gallery-thumbnail img {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transition: all 0.4s ease-out;
}

/* .page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.85)
} */
</style>
