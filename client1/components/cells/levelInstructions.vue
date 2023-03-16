<template>
    <div class="truncate">
      {{getValue}}
    </div>
</template>
<script setup>
// import get from "lodash/get";

const props = defineProps({
    column: { type: Object, default: () => ({}) },
    row: { type: Object, default: () => ({}) }
})

const getValue = computed(() => {
    // let value = get(props.row, props.column.prop);
		//
    // if (value === 1)
    //     return 'E1';
    // else if (value === 2)
    //     return 'E2';
    // else if (value === 3)
    //     return 'MF1';
    // else if (value === 4)
    //     return 'MF2';
});
</script>

