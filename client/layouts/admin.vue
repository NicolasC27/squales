<script setup>

</script>
<template>
    <div>
        <client-only>
            <div
                class="bg-oceanBackground absolute -z-1 backdrop-blur-md h-full w-full bg-center bg-no-repeat bg-cover">
                <div class="p-12">
                    <div
                        class="flex h-full drop-shadow-container fixedfont-sans flex-row max-h-[90vh] bg-[#F2F4F5] rounded-3xl overflow-hidden">
                        <!-- Side bar-->
                        <div
                            class="mobile:hidden flex h-[90vh] text-lg w-[128px] bg-[#1D2558] rounded-tl-3xl rounded-bl-[20px]">
                            <div class="h-32 bg-[#1D2558] rounded-tl-3xl">

                            </div>
                            <nav>
                                <ul class="flex flex-col justify-content-center"></ul>
                            </nav>
                        </div>
                        <!-- END SIDEBAR -->
                        <Transition name="fade">
                            <slot></slot>
                        </Transition>
                    </div>
                </div>
            </div>
        </client-only>
    </div>
</template>

<style scoped>
body {
    overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>