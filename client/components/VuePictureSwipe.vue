<template>
    <div>
        <div class="my-gallery flex flex-wrap mt-12 pl-32 pr-32" itemscope>
            <figure v-for="(item, index) in items" v-show="index === 0 || !singleThumbnail" :key="index"
                class="gallery-thumbnail" itemprop="associatedMedia" itemscope :src="item.src">
                <a v-show="nbThumbnailsDisplayed === -1 || index < nbThumbnailsDisplayed" :href="item.src"
                    itemprop="contentUrl" :data-size="`${item.w}x${item.h}`" :title="item.title">
                    <img :src="item.thumbnail" :alt="item.alt" itemprop="thumbnail" />
                </a>
            </figure>
        </div>

        <PhotoSwipeComponent v-if="defaultStructure" :items="[]" @open="$emit('open')" @close="$emit('close')" />
    </div>
</template>
<script setup>

import PhotoSwipeComponent from 'vue3-picture-swipe';
import RenderHtml from 'vue3-picture-swipe';


console.log(PhotoSwipeComponent);
const props = defineProps({
    items: { type: Array, required: true, default: [] }
})
const options = ref({});
const singleThumbnail = ref(false);
const nbThumbnailsDisplayed = ref(-1);
const defaultStructure = ref(true);

</script>