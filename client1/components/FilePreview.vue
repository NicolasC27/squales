<template>
    <component :is="tag">
        <img :src="file.url" :alt="file.file.name" :title="file.file.name" />
        <p>{{ shortFileName(file.file.name) }}</p>
        <button @click="$emit('remove', file)" aria-label="Remove" class="block group relative focus:outline-none"
            :class="{ 'cursor-auto	': finished || file.status === 'loading' }">
            <div class="flex flex-row h-full justify-center items-center">
                <div class=" h-12  w-12    group-hover:opacity-100 group-hover:scale-100 group-focus:opacity-100 group-focus:scale-100"
                    :class="{ 'bg-transparent rounded-full bg-yellow-200 bg-opacity-12.5 opacity-0 transform transition ease-out scale-0 duration-300': !finished }">
                </div>
            </div>
            <div class="inset-0 absolute">
                <div class="flex flex-row h-full justify-center items-center">
                    <svg v-if="file.status === 'loading'" aria-hidden="true"
                        class="mr-2 w-8 h-8 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span v-if="file.status === 'success'"
                        class="bg-green-500 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full ">
                        <svg class="w-3.5 h-3.5" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <svg v-if="file.status !== 'success' && file.status !== 'loading'" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" id="x-circle"
                        class="h-[1.75rem] text-cool-gray-800 w-[1.75rem]  group-hover:text-dark-800 group-focus:text-dark-800">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>

                </div>
            </div>
        </button>
    </component>
</template>

<script setup>
defineProps({
    file: { type: Object, required: true },
    tag: { type: String, default: 'li' },
    finished: { type: Boolean, default: false },
})
defineEmits(['remove'])

function shortFileName(file) {
    if (file.length < 25)
        return file;
    let split = file.split('.');
    let filename = split[0];
    let extension = split[1];

    let beginFilename = filename.substring(0, 10);
    let lastFilename = filename.substring(filename.length - 5, filename.length);

    return (beginFilename + '...' + lastFilename + '.' + extension);
}
</script>
<style lang="scss">
// li {
//     display: flex;
//     flex-direction: row;
//     list-style-type: none;
//     background-color: white;
//     width: 100%;
//     height: auto;

//     img {
//         width: 38px;
//         height: 50px;
//         object-fit: cover;
//     }

//     p {
//         flex-grow: 2;
//         padding-left: 25px;
//         line-height: 50px;
//         font-weight: bold;
//     }

//     button {
//         flex-grow: 1;
//     }
// }
</style>
