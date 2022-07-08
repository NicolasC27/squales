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
        showModal.value = value.showModal;
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
    <div class="pl-32 h-full relative overflow-auto">
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
            class="slidein bg-admin-white h-[85vh] rounded-tr-3xl rounded-br-3xl p-8 w-2/5 absolute overflow-auto border-l-[5px] border-[#FFD600]"
            v-if="dataModal" v-show="showModal" ref="target" :data="dataModal" @target="addTarget"></ModalRight>

    </div>
</template>
<style scoped>
/*
for modal right
*/
body {
    overflow: hidden;
}

.slidein {
    @apply top-12 fixed z-10 right-0 mr-12;
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
</style>
