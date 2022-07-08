<script setup lang="ts">
import {
    ElForm, ElInput, ElFormItem, ElConfigProvider, ElDropdown,
    ElDropdownMenu, ElSelect, ElOption,
    ElDropdownItem, ElSwitch, ElDatePicker, ElTimePicker
} from "element-plus";
import { ID_INJECTION_KEY } from 'element-plus'
import { OnClickOutside, vOnClickOutside } from '@vueuse/components'

const target = ref(null);
provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
});

// Props
const props = defineProps({
    data: { type: Object, default: { name: '', email: '' } },
})
</script>

<template>
    <Transition name="slide">
        <div>
            <form>
                <div class="mb-6">
                    <label for="default-input"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                    <input type="text" v-model="data.name" id="default-input"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <label for="input-group-1"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                <div class="relative mb-6">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>
                    <input type="text" v-model="data.email" id="input-group-1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com">
                </div>
                <div class="relative mb-6">
                    <label for="level_diver"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Niveau de
                        plongée</label>
                    <select id="level_diver" v-model="data.diver.level_diver"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choisir un niveau</option>
                        <option value="1">Niveau 1</option>
                        <option value="2">Niveau 2</option>
                        <option value="3">Niveau 3</option>
                        <option value="4">Niveau 4</option>
                    </select>
                </div>
                <label for="level_apnea" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Niveau
                    d'apnée</label>
                <select id="level_apnea" v-model="data.diver.level_apnea"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choisir un niveau</option>
                    <option value="1">Niveau 1</option>
                    <option value="2">Niveau 2</option>
                    <option value="3">Niveau 3</option>
                    <option value="4">Niveau 4</option>
                </select>
            </form>
        </div>
    </Transition>
</template>
<style lang="scss" scoped>
.slidein {
    .card {
        border-radius: 11px;
        padding: 2px;
    }

    .card_img {
        &:hover {
            opacity: 0.3;
        }
    }
}

.upload-button {
    @apply bg-admin-sidebar m-auto mt-7;
    width: 253px;
    padding: 15px;
}

.file-preview {
    max-width: 650px;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #F2F4F5;
    padding: 14px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    overflow: scroll;
    min-height: 361px;
    overflow: unset;
    overflow-y: scroll;
    margin-top: 30px;
}

li.file-preview_row:not(:last-child) {
    margin-bottom: 10px;
}


.inputfile {
    @apply overflow-hidden absolute w-px h-px opacity-0;
}

.inputfile+label {
    @apply bg-admin-button;
    width: 235px;
    height: 35px;
    font-size: 0.9375rem;
    line-height: 2.1rem;
    cursor: pointer;
    text-align: center;
    color: black;
    font-weight: bold;
    display: inline-block;
    border-radius: 11px;
}

/*
    .inputfile:focus + label,
    .inputfile + label:hover {
        background-color: red;
    } */

.drop-area {
    @apply h-24 bg-[#17277D];
    opacity: 0.85;
    border-radius: 11px;
}

/*
      Enter and leave animations can use different
      durations and timing functions.
    */
.slide-enter-active {
    transition: all 0.6s ease-in-out;
}

.slide-leave-active {
    transition: all 0.4s ease-in-out;

}

.slide-enter-from {
    transform: translateX(120%);

}

.slide-leave-to {
    transform: translateX(120%);
}

.card {
    @apply list-none h-44 w-1/5;
}

.card_img {
    @apply rounded-lg h-full object-cover bg-[#B4B4B4] w-full;
}

.lazyload,
.lazyloading {
    opacity: 0;
}

.lazyloaded {
    opacity: 1;
    transition: opacity 300ms;
}



.file-preview::-webkit-scrollbar-thumb {
    height: 1em;
    border: 0.5em solid rgba(0, 0, 0, 0);
    /* Transparent border together with `background-clip: padding-box` does the trick */
    background-clip: padding-box;
    -webkit-border-radius: 1em;
    background-color: #fbbf24;
    -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
}

.file-preview::-webkit-scrollbar {
    width: 1.5em;
    /* Total width including `border-width` of scrollbar thumb */
    height: 0;
}

.file-preview::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
}

.file-preview::-webkit-scrollbar-corner {
    background-color: transparent;
}

/*
    ** card
    */
</style>
