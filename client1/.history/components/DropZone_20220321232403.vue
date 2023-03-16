<template>
    <div
        :data-active="active"
        @dragenter.prevent="setActive"
        @dragover.prevent="setActive"
        @dragleave.prevent="setInactive"
        @drop.prevent="onDrop"
    >
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active"></slot>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue';
const emit = defineEmits(['files-dropped'])

function onDrop(e) {
    emit('files-dropped', [...e.dataTransfer.files])
}

function preventDefault(e) {
    e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefault)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})

</script>