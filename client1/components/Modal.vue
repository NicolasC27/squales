<script setup lang="ts">
import { OnClickOutside, vOnClickOutside } from '@vueuse/components'



// Props
const props = defineProps({
    data: { type: Object, default: { name: '', email: '' } },
    component: {type: Object, default: ''},
    key: {type: Number},
})

const emit = defineEmits(['update:key', 'update:component.show'])

const showModal = ref(true);
const target = ref(null);

/*
** Function
*/
function addTarget(value) {
    target.value = value;
}

onClickOutside(target, (event) => {
    props.component.show = false;
});

</script>

<template>
    <Transition 
        v-show="component.show"
        class="bg-admin-white h-full border-l-[7px] border-yellow-300 rounded-tr-3xl rounded-br-3xl p-8 w-[42%] slidein absolute overflow-auto"
        name="slide">
        <div v-if="data" class="flex flex-col" ref="target" @target="addTarget">
            <component :is="component.name" :data="props.data"></component>
        </div>
    </Transition>
</template>
<style lang="scss" scoped>
.slidein {
    .card {
        border-radius: 11px;
        padding: 2px;
    }

    .card_img {
        &:hover {
            opacity: 0.3;
        }
    }
}


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


.lazyload,
.lazyloading {
    opacity: 0;
}

.lazyloaded {
    opacity: 1;
    transition: opacity 300ms;
}


/*
    ** card
    */
</style>
