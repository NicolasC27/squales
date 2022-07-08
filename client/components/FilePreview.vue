<template>
    <component :is="tag">
        <img :src="file.url" :alt="file.file.name" :title="file.file.name" />
        <p>{{file.file.name}}</p>
        <button v-if="file.status !== 'loading' && file.status !== 'success'" @click="$emit('remove', file)" class="close-icon" aria-label="Remove">×</button>
        <div class="leading-12" v-if="file.status === 'loading'">chargement...</div>
        <div class="leading-12" v-if="file.status === 'success'">Terminé</div>
    </component>
</template>

<script setup>

defineProps({
    file: { type: Object, required: true },
    tag: { type: String, default: 'li' },
})
defineEmits(['remove'])

</script>
<style lang="scss">
    li {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        background-color: white;
        width: 100%;
        height: auto;

        img {
            width: 38px;
            height: 50px;
            object-fit: cover;
        }
        p {
            flex-grow: 2;
            padding-left: 25px;
            line-height: 50px;
            font-weight: bold;
        }
        button {
            flex-grow: 1;
        }
    }


</style>
