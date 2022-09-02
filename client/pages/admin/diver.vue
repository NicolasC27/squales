<script setup lang="ts">
import EmailLinkVue from '~~/client/components/cells/EmailLink.vue';
import GenderBadgeVue from '~~/client/components/cells/GenderBadge.vue';
import { OnClickOutside, vOnClickOutside } from '@vueuse/components'
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

const row = ref();
const dataModal = ref(null);

onClickOutside(target, (event) => {

    showModal.value = false;

});

function swipeModal(value) {
    if (showModal.value != true) {
        console.log(value);
        dataModal.value = value.row;
        showModal.value = !showModal.value;
    }
}

function addTarget(value) {
    target.value = value;
}
function urlData() {
    return config.apiURL + 'api/user';
}

</script>
<template>
    <div class="flex flex-col h-[90vh] w-full relative">
        <div>
            <DataTable :columns="columns" @show-modal="swipeModal" actions="view,edit,delete,search,refresh"
                title="Users from API" url="/api/user">
                <!-- Each column has an available slot via the prop attribute. You can always tap into it to fully customize the cells with your own content -->
                <!-- <template v-slot:customSlot="{row}">
                <BaseButton variant="white" @click="actionClick(row)">Action</BaseButton> 
                </template> -->

            </DataTable>
        </div>
        <ModalRight
            class="bg-admin-white h-full border-l-[7px] border-yellow-300 rounded-tr-3xl rounded-br-3xl p-8 w-[42%] slidein absolute overflow-auto "
             v-show="showModal" ref="target" :data="dataModal" @target="addTarget"></ModalRight>
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
