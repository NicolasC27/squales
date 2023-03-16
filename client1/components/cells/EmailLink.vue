<template>
    <div class="truncate">
        <a v-if="value" :href="`mailto:${value}`"
            class="text-blue-500 hover:text-blue-900 hover:underline cursor-pointer">{{ value }}</a>
        <span v-else>- -</span>
    </div>
</template>
<script setup>
// import get from "lodash/get";

const props = defineProps({
    column: { type: Object, default: () => ({}) },
    row: { type: Object, default: () => ({}) }
})

const value = computed(() => {
    // return get(props.row, props.column.prop);
});

console.log("bonjour");
console.log(props.column.prop);
</script>

