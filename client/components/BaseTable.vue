<template>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-4 sm:px-4 lg:-mx-4 lg:px-4">
        <div
            class="align-middle inline-block min-w-full box-shadow-datatable overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full" v-loading="props.loading">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.prop || index"
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            <div class="flex items-center th-cell">

                                <ColumnHeaderRenderer :column="column" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <slot></slot>

                <tbody class="bg-admin-white">
                    <tr v-for="(row, index) in data" :key="row[rowKey] || index">
                        <td v-for="column in columns" :key="column.prop"
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-700 td-cell" :class="{
                                'text-right': column.align === 'right',
                                'text-left': column.align === 'left',
                                'text-center': column.align === 'center',
                            }">

                            <ColumnRenderer :row="row" :index="index" :column="column" />
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import { vLoading } from "element-plus";


const props = defineProps({
    data: { type: Array, default: [] },
    rowKey: {
        type: String,
        default: "id"
    },
    loading: { type: Boolean, default: true }
})


const columns = ref([]);
const scope = ref([]);

function getColumnData(row, prop) {

    return get(row, `${prop}`, "");
}

function addColumn(step) {
    const index = columns.value.length;
    columns.value.splice(index, 0, step);

};


function addScope(step) {
    const index = scope.value.length;
    scope.value.splice(index, 0, step)
};

const removeColumn = function (step) {
    const columns = this.columns;
    const index = columns.indexOf(step);

    if (index > -1) {
        columns.splice(index, 1);
    }
};


const ColumnRenderer = (props) => {
    console.log(props.row);
    const renderedScopedSlot = props.column.default({
        row: props.row,
        index: props.index
    });
    return h("div", { attrs: { class: "cell" } }, [renderedScopedSlot]);
}
const ColumnHeaderRenderer = (props) => {
    return h('div', props.column.label);
}

provide('addColumn', { addColumn, addScope });
provide('removeColumn', removeColumn);

</script>
<style>
.el-loading-mask .el-loading-spinner {
    display: flex;
    justify-content: center;
}
</style>
