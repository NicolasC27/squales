<script setup lang="ts">
// import get from "lodash/get";
import {
    ElIcon,
    ElButton,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElConfigProvider,
    ElDatePicker,
    ElMessage,
    ElPagination,
    ElSelect,
    ElOption,
} from "element-plus";
import { Grape, IceCream, IceDrink, ArrowDown } from "@element-plus/icons-vue";
import { ID_INJECTION_KEY } from 'element-plus'
import GenderBadge from "./cells/GenderBadge.vue";
import BaseButton from "./BaseButton.vue";
import get from "lodash/get";
import editDiverVue from "./modals/editDiver.vue";

// import cloneDeep from "lodash/cloneDeep";

provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
});


const props = defineProps({
    columns: { type: Array, required: true },
    url: { type: String },
    actions: { type: String },
});
const { $api } = useNuxtApp()

const datatable = ref({});
const data = ref({});

const pagination = reactive({
    current_page: 1,
    per_page: 10,
    total: 5,
})
const params = reactive({
    page: pagination.current_page,
    per_page: pagination.per_page,
});

const filters = reactive({
    search: "",
    sort: ""
});

const loading = ref(false);

const perPageOptions = ref([5, 10, 15, 20, 25, 50]);

const getDatatable = async () => {
    datatable.value = await $api.get(props.url, params);
    pagination.total = datatable.value.total;
    data.value = datatable.value.data;
    console.log('getDatatable');
}


const actionsArray = computed((actions) => {
    return actions.split(",").map(action => action.trim().toLowerCase());
})

function perPageChange(value) {

    console.log(value);
    pagination.per_page = value;
    params.per_page = value;
    refresh();

    // refresh();
};

const handleCurrentChange = (val: number) => {
    console.log(val);
    pagination.current_page = val;
    params.page = pagination.current_page;
    console.log('loading');
    refresh();
}

const refresh = async () => {
    try {
        loading.value = true;
        await getDatatable();
    } catch (err) {
        alert("Could not fetch the table data");
    } finally {
        loading.value = false;

    }
}

function showAction(action) {
    console.log(action);
    return actionsArray;
};

refresh();

</script>
<template>
        <div class="data-table w-full p-10">
            <BaseTable :data="data" :local-sort="url === ''" :loading="loading" v-bind="$attrs">

                <BaseTableColumn v-for="(column, index) in columns" :key="column.prop || index" v-bind="column">
                    <template v-slot="{ row }">
                        <slot :name="column.prop" :row="row">
                            <template v-if="column.component">
                                <component :is="column.component" :column="column" :row="row">
                                </component>
                            </template>
                            <div v-else class="truncate">
                                {{ get(row, column.prop) || '- -' }}
                            </div>
                        </slot>
                    </template>
                </BaseTableColumn>

                <BaseTableColumn align="left" v-slot="{ row, index }">
                    <BaseButton size="sm" variant="gray-link" @click="$emit('view', row, index)">View</BaseButton>
                    <BaseButton v-if="showAction('edit')" variant="primary-link" size="sm"
                        @click="$emit('showModal', { showModal: true, row: row, component: editDiverVue })">
                        Edit</BaseButton>
                    <!-- <BaseButton v-if="showAction('delete')" variant="danger-link" size="sm"
                        @click="onDelete(row, index)">Delete</BaseButton> -->
                    <slot name="extra-actions"></slot>
                </BaseTableColumn>
            </BaseTable>


            <!-- <div class="w-full flex justify-end mt-4 table-pagination">
                <el-pagination v-show="data.length > 0 && url" @size-change="perPageChange"
                    @current-change="handleCurrentChange" :currentPage="pagination.current_page"
                    :page-sizes="perPageOptions" :page-size="pagination.per_page" :pager-count="5"
                    layout="total, slot, prev, pager, next, jumper" :total="pagination.total">
                    <el-select class="select-default" size="mini" @change="perPageChange" v-model="pagination.per_page">
                        <el-option v-for="value in perPageOptions" class="select-default" :key="value" :label="value"
                            :value="value"></el-option>
                    </el-select>
                </el-pagination>
            </div> -->
        </div>

</template>
