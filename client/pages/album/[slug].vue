<script setup lang="ts">
export interface Gallery {
    name: string;
    data: Object;
}

import { useAsyncState } from "@vueuse/core";

const { $api } = useNuxtApp();

const route = useRoute();
//const gallery = ref();
const config = useRuntimeConfig();

const { state, ready  } = useAsyncState(async () => {
  const { data } = await $api.get<Gallery[]>(
    "/api/admin/gallery/album/" + route.params.slug
  );
  return { data };
});

const gallery = computed(() => state.value?.data);
</script>

<template>
<div>
  <div class="w-full m-auto">
    <h1>{{ $route.params.slug }}</h1>
  </div>

  <ul class="flex flex-wrap mt-12">
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
</style>
