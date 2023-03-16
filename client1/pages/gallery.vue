<script setup>

definePageMeta({
    layout: 'default'
})
</script>

<template>
    <div>
        <div class="banner-gallery flex h-96 bg-center bg-dive-banner bg-cover bg-no-repeat">
            <h1>Bécon-les-Granits</h1>
        </div>
        <div class="h-48"></div>
        <ul class="gallery">
            <li v-for="(image, index) in images">

                <img :src="image.pathShort" />
                <!-- <img v-preview:scope-a :src="image.pathLong.default" :alt="image.pathShort" /> -->
            </li>
        </ul>
    </div>
</template>

<script>

export default {

    data() {
        return {
            images: [],
        }
    },

    mounted() {
        console.log('mounted');
        this.importAll(import.meta.glob('/assets/images/becon/**'));
    },

    methods: {
        importAll(assets) {
            for (let image in assets)
                this.images.push({ pathShort: image })

            // r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
            console.log(this.images);
        },

    }
}
</script>
<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
}

li {
    height: 25vh;
    padding: 0.5rem;
    flex-grow: 1;
}

li:last-child {
    flex-grow: 10;
}

img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
}

.gallery {
    padding-left: 300px;
    padding-right: 300px;
    padding-top: 50px;
}

.banner-gallery {
    padding-top: 240px;
    font-size: 77px;
    padding-left: 67px;
    font-family: "Bebas Neue", serif;
    word-spacing: 17px;
    letter-spacing: 5px;
    color: #ffffff;
    background-position: center -131px;
}

/*.banner-gallery h1 {*/
/*    transform: rotate3d(1, 1, 1, 349deg);*/
/*}*/
</style>
