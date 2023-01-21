<script setup lang="ts">
import { authStore } from "~/store/auth";
import { formApi } from "~/lib/lib"


export interface Register {
    firstname?: String,
    lastname?: String,
    email?: String,
    password?: String,
    number?: String,
    birthday?: null,
}

// Props
const props = defineProps({
    data: { type: Object},
})

const auth = authStore();
const register: Register = reactive({});

const onRegister = async () => {
    let formData = new FormData();
    // let birth = moment(register.birthday[0]);
    // console.log(birth);

    const data = await auth.proceedRegister(
        formApi(register)
    );
}

/*
** Litepie Datepicker
*/
const LitepieDatepicker = defineAsyncComponent(() =>
    import('litepie-datepicker')
)

const optionsDatepicker = ref({ 
    footer: {
        apply: 'Appliquer',
        cancel: 'Annuler'
    }
})

const formatterDatepicker = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM'
})

</script>
<template>
    <div>
        <div class="flex flex-col">
            <div class="mb-6">
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Prénom</label>
                <input v-model="register.firstname" type="text" id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Prénom" required>
            </div>
            <div class="mb-6">
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom de
                    famille</label>
                <input v-model="register.lastname" type="text" id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nom de famille" required>
            </div>
            <div class="mb-6">
                <label for="phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Téléphone</label>
                <input v-model="register.number" type="tel" id="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="06 00 00 00 00" required>
            </div>
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                    address</label>
                <input v-model="register.email" type="email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="plongueur@squales.club" required>
            </div>
            <div class="mb-6">
                <label for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input v-model="register.password" type="password" id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••" required>
            </div>
            <div class="relative w-full mb-6">
                <litepie-datepicker :auto-apply="false" i18n="fr" as-single v-model="register.birthday"
                    :options="optionsDatepicker" :formatter="formatterDatepicker">
                </litepie-datepicker>
            </div>
            <button @click="onRegister"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Inscrire
                le membre</button>

        </div>
    </div>
</template>