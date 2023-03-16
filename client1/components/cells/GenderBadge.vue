<template>
    <base-badge :color="badgeColor">{{ value }}</base-badge>
</template>
<script setup>
// import get from "lodash/get";
import BaseBadge from "../BaseBadge";

const props = defineProps({
    column: { type: Object, default: () => ({}) },
    row: { type: Object, default: () => ({}) }
})

const value = computed(() => {
    // const value = get(props.row, props.column.prop);
    // if (value === undefined) {
    //     return "N/A";
    // }
    // return value;
});

const badgeColor = computed(() => {
    if (value === "F") {
        return "purple";
    }
    return "teal";
})
</script>

