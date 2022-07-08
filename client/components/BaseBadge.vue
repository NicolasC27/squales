<template>
    <div class="px-6 h-6 rounded-full text-xs font-semibold inline-flex justify-center items-center cursor-pointer"
        :class="`bg-${props.color}-100 text-${props.color}-700 hover:bg-${props.color}-500 hover:text-white`">
        <slot></slot>
    </div>
</template>
<script setup>

const props = defineProps({
    color: { type: String, default: 'teal' },
})
</script>
