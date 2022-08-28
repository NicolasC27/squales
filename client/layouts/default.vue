<template>
    <div>
        <div class="flex bg-white-100 font-sans flex-col min-h-screen">
            <!-- Side bar-->
            <div class="mobile:hidden text-lg h-screen w-20 bg-white fixed">
                <nuxt-link to="/">
                    <img src="/images/front/logo.jpg" class="object-contain pb-1" alt />
                </nuxt-link>
                <nav>
                    <ul class="flex flex-col justify-content-center">
                        <li class="h-16 container mx-auto bg-test-light bg-opacity-20">
                            <div class="flex items-center justify-center w-full h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24"
                                    stroke="#0089B5">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </li>
                        <li class="h-16 container mx-auto">
                            <div class="flex items-center justify-center w-full h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 opacity-50" viewBox="0 0 20 20"
                                    fill="#33A4C9">
                                    <path
                                        d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                    <path
                                        d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                </svg>
                            </div>
                        </li>
                        <li class="h-16 container mx-auto">
                            <nuxt-link to="/album">
                                <div class="flex items-center justify-center w-full h-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 opacity-50" fill="none"
                                        viewBox="0 0 24 24" stroke="#33A4C9">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </nuxt-link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="xl:pl-20">
                <div class="h-40 lg:h-20 w-full flex flex-wrap">
                    <nav id="header1" class="bg-white-100 w-auto flex-1 border-gray-300 order-1 lg:order-2">
                        <div class="flex h-full justify-between items-center">
                            <!--Search-->
                            <div class="relative w-full px-6">
                                <nav>
                                    <ul class="flex flex-row text-center text-lg font-medium text-default">
                                        <li></li>
                                        <a class="pr-8">LE CLUB</a>
                                        <li>
                                            <a class="p-6">FORMATION</a>
                                        </li>
                                        <li>
                                            <a class="p-6">TARIFS</a>
                                        </li>
                                        <li>
                                            <a class="p-6">ENCADRANTS</a>
                                        </li>
                                        <li>
                                            <a class="p-6">MATÉRIEL</a>
                                        </li>
                                        <li>
                                            <a class="p-6">ENTRAÎNEMENT</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <!-- / Search-->

                           
                        </div>
                    </nav>
                </div>
                <!--Graph Content -->
                <div id="main-content" class="w-full flex flex-col flex-grow">
                    <slot></slot>
                </div>
            </div>
        </div>
        <!-- <footer class="bg-footer w-full flex h-96"></footer> -->
    </div>
</template>
