<template>
  <div>
    <div width="500px"></div>
    <div
      class="flex flex-col xl:flex-row mobile:h-screen mobile:py-10 bg-cover bg-dive-banner bg-no-repeat bg-center xl:pt-96 sm:pt-0 sm:justify-center">
      <div class="flex flex-grow flex-row xl:h-full xl:w-1/2 sm:w-full justify-center xl:justify-start">
        <div
          class="flex flex-col-reverse mobile:justify-center mobile:text-center md:mt-20 md:ml-24 text-white font-medium sm:ml-0 sm:mb-20 sm:px-5 mb-10">
          <span class="text-6xl mt-8 font-medium">Club de Bernay</span>
          <span class="opacity-70 text-xl">PLONGÉE & APNÉE</span>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col-reverse xl:mb-8 text-white">
          <div class="wrapper" style="height: 225px">
            <swiper :slidesPerView="'auto'" :spaceBetween="30" :pagination="{
              clickable: true,
            }" :modules="modules" :freeMode="true" class="mySwiper">
              <swiper-slide>
                <div class="relative plugin-panel">
                  <img src="/images/front/normandie_epave.png" class="panel-image rounded-2xl" />
                  <span class="absolute left-6 top-3.5 text-2xl font-medium tracking-wide">01 - Normandie</span>
                  <span class="absolute left-6 bottom-10 text-2xl font-bold tracking-wide">Dieppe</span>
                  <span class="absolute left-6 bottom-5 text-sm opacity-80 font-bold tracking-wide">Épave à 20m</span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="relative plugin-panel">
                  <img src="/images/front/image_test1.jpg" class="panel-image rounded-2xl" />
                  <span class="absolute left-6 top-3.5 text-2xl font-medium tracking-wide">02 - Corse</span>
                  <span class="absolute left-6 bottom-10 text-2xl font-bold tracking-wide">Calvi</span>
                  <span class="absolute left-6 bottom-5 text-sm opacity-80 font-bold tracking-wide">Épave à 25m</span>
                </div>
              </swiper-slide>
            </swiper>
            <!-- <Flicking
                style="height: 225px"
                class="slide"
                :options="{ align: 'prev', renderOnlyVisible: true, autoResize: true, circular: true }"
              >
                <div class="relative plugin-panel">
                  <img src="/images/front/normandie_epave.png" class="panel-image rounded-2xl" />
                  <span
                    class="absolute left-6 top-3.5 text-2xl font-medium tracking-wide"
                  >01 - Normandie</span>
                  <span class="absolute left-6 bottom-10 text-2xl font-bold tracking-wide">Dieppe</span>
                  <span
                    class="absolute left-6 bottom-5 text-sm opacity-80 font-bold tracking-wide"
                  >Épave à 20m</span>
                </div>
                <div class="relative plugin-panel">
                  <img src="/images/front/image_test1.jpg" class="panel-image rounded-2xl" />
                  <span
                    class="absolute left-6 top-3.5 text-2xl font-medium tracking-wide"
                  >02 - Corse</span>
                  <span class="absolute left-6 bottom-10 text-2xl font-bold tracking-wide">Calvi</span>
                  <span
                    class="absolute left-6 bottom-5 text-sm opacity-80 font-bold tracking-wide"
                  >Épave à 25m</span>
                </div>
                <div class="relative plugin-panel">
                  <img src="/images/front/image_test1.jpg" class="panel-image rounded-2xl" />
                  <span
                    class="absolute left-6 top-3.5 text-2xl font-medium tracking-wide"
                  >02 - Corse</span>
                  <span class="absolute left-6 bottom-10 text-2xl font-bold tracking-wide">Calvi</span>
                  <span
                    class="absolute left-6 bottom-5 text-sm opacity-80 font-bold tracking-wide"
                  >Épave à 25m</span>
                </div>
            </Flicking>-->
          </div>
          <!--                                <img src="/images/front/bi_play-circle-fill.png">-->
          <div class="text-xl mb-7">
            <svg class="w-2 h-8 inline-block bg-test-yellow bg-opacity-100" />
            <span class="align-middle tracking-wide pl-1 font-bold">DERNIÈRES PLONGÉES</span>
          </div>
        </div>
      </div>
    </div>
    <section class="w-full flex px-20 flex-grow">
      <div id="introduction" class="mt-20">
        <h2 class="font-title-homepage-h1 text-2xl">Rencontre l'Équipe</h2>
        <h1 class="opacity-50 font-normal text-lg">Les Squales</h1>
        <p class="text-2xl font-normal p-14 w-2/3">
          Que vous soyez novice ou confirmé, l’école de plongée
          les
          Squales vous accueille tous les
          vendredis et dimanches ! Vous aurez l’opportunité d’être un témoin privilégié de la richesse
          de
          nos fonds-marins situé en manche. L’avantage de venir plonger à Bernay, c’est qu’il y en a
          pour
          tous les goûts et pour tous les niveaux ! Pour votre plongée et votre sécurité, notre centre
          vous propose du matériel (hors combinaisons) adapté à votre activité.
        </p>
      </div>
    </section>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from "swiper"

// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    return {
      modules: [FreeMode],
    }
  }
};
</script>

<style lang="scss" scoped>
.mySwiper {
  width: 900px;
}

.swiper-slide {
  width: auto;
}
</style>
