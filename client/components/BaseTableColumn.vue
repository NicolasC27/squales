<script setup lang="ts">

const props = defineProps({
    prop: { type: String },
    sortable: { type: Boolean },
    label: { type: String },
    align: { type: String },
    minWidth: { type: [String, Number] },
    maxWidth: { type: [String, Number] },
    row: { type: String, default: 'test' },
    index: { type: Number, default: 2 }
})

const slots = useSlots();


const { addColumn, addScope } = inject('addColumn');
addColumn(Object.assign({}, props, slots));
addScope(slots);
</script>
