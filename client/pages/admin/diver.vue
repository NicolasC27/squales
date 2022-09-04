<script setup lang="ts">
import EmailLinkVue from '~~/client/components/cells/EmailLink.vue';
import GenderBadgeVue from '~~/client/components/cells/GenderBadge.vue';
import { OnClickOutside, vOnClickOutside } from '@vueuse/components'
import Diver from '~~/client/components/modals/diver.vue';

const config = useRuntimeConfig()

definePageMeta({
    layout: 'admin'
})

const showModal = ref(false);
const target = ref(null);

const columns = ref([
    {
        label: "Identité",
        prop: "name",
        maxWidth: 220,
        sortable: true
    },
    {
        label: "Email",
        prop: "email",
        component: EmailLinkVue,
        maxWidth: 240,
        sortable: true
    },
    {
        label: "Plongeur",
        prop: "diver.level_diver",
        maxWidth: 80,
        sortable: true
    },
    {
        label: "Apneiste",
        prop: "diver.level_apnea",
        maxWidth: 80,
        sortable: true
    },
    {
        label: "Enseignent",
        prop: "diver.level_instruction",
        maxWidth: 80,
        sortable: true
    }
]);

/*
** Declaration
*/
const row = ref();
const dataModal = ref(null);
const component = reactive({
    name: null,
    show: false,
}); 

/*
** Function
*/
function swipeModal(value) {
    if (component.show != true) {
        console.log(value);
        dataModal.value = value.row;
        component.show = !component.show;
        component.name = Diver;
    }
}

function urlData() {
    return config.apiURL + 'api/user';
}

</script>
<template>
    <div class="flex flex-col h-[90vh] w-full relative p-10">
        <div class="">
            <button type="button"
                class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                Inscrire un membre
            </button>
        </div>
        <div>
            <DataTable :columns="columns" @show-modal="swipeModal" actions="view,edit,delete,search,refresh"
                title="Users from API" url="/api/user">
                <!-- Each column has an available slot via the prop attribute. You can always tap into it to fully customize the cells with your own content -->
                <!-- <template v-slot:customSlot="{row}">
                <BaseButton variant="white" @click="actionClick(row)">Action</BaseButton> 
                </template> -->

            </DataTable>
        </div>
        <Modal :data="dataModal" v-model:component="component">
        </Modal>
    </div>
</template>
<style scoped>
/*
for modal right
*/
.slidein {
    right: 0;
    top: 0;
}

.slidein::-webkit-scrollbar {
    width: 1.5em;
    /* Total width including `border-width` of scrollbar thumb */
    height: 0;
}

.slidein::-webkit-scrollbar-thumb {
    height: 1em;
    border: 0.5em solid rgba(0, 0, 0, 0);
    /* Transparent border together with `background-clip: padding-box` does the trick */
    background-clip: padding-box;
    -webkit-border-radius: 1em;
    background-color: #17277D;
    -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
}

.slidein::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
}

.slidein::-webkit-scrollbar-corner {
    background-color: transparent;
}

.slidein::-webkit-scrollbar-corner {
    background-color: transparent;
}
</style>
