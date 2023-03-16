<template>
    <Transition name="slide">
        <div class="flex flex-col">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900">
                    Nom de l'album</label>
                <input type="text" id="small-input" v-model="folderName"
                    class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900">
                    Image de l'album</label>
                <label for="default-picture"
                    class="
                    border-dashed rounded-lg overflow-hidden flex flex-col bg-gray-50 border-2 border-gray-300 w-[440px] h-[200px] justify-center items-center hover:bg-gray-100">
                    <svg v-if="previewImage.loading" aria-hidden="true" role="status"
                        class="h-12 mr-3 text-white animate-spin w-12 inline" viewBox="0 0 100 101" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor" />
                    </svg>
                    <img v-else class="h-full w-full rounded-lg object-cover" v-if="defaultPicture"
                        :src="previewCropPictures" alt="">
                </label>
                <input type="file" name="file" id="default-picture" class="default-picture"
                    @change="onInputChangeDefaultPicture" />
                <button
                    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button" data-modal-toggle="popup-modal" @click="showCropModal">
                    Recadrer l'image
                </button>
            </div>


            <div id="cropModal" v-show="cropModal"
                class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full w-max-2xl md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-1/2 max-h-[748px] md:h-auto">
                    <!-- Crop Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Crop Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Redimensionner l'image
                            </h3>
                            <button type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                data-modal-toggle="defaultModal" @click="showCropModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Crop modal body -->
                        <div
                            class="p-6 space-y-6 flex flex-row h-[700px] overflow-hidden items-stretch w-full justify-around">
                            <cropper v-if="defaultPicture" v-show="img" ref="crop" class="w-[580px] cropper flex-1 ml-5"
                                :stencilProps="{
                                    aspectRatio: 13 / 6, resizable: true
                                }" default-boundaries="fill" priority="visibleArea" :src="previewPictures"
                                @change="onChange">
                            </cropper>
                            <div class="h-[224px] m-0 mt-0 flex-1 w-full mr-5 items-center justify-center">
                                <img v-if="previewImage?.img" class="m-auto h-full" :src="previewImage.img" />
                            </div>

                        </div>
                        <!-- Modal footer -->
                        <div
                            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button @click="cropPicture" data-modal-toggle="defaultModal" type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Valider</button>

                        </div>
                    </div>
                </div>
            </div>

            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 pb-4">Description
                de l'album</label>
            <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div class="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
                    <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                        <div class="flex items-center space-x-1 sm:pr-4">
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Embed map</span>
                            </button>
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Upload image</span>
                            </button>
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Format code</span>
                            </button>
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Add emoji</span>
                            </button>
                        </div>
                        <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Add list</span>
                            </button>
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Settings</span>
                            </button>
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Timeline</span>
                            </button>
                            <button type="button"
                                class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="sr-only">Download</span>
                            </button>
                        </div>
                    </div>
                    <button type="button" data-tooltip-target="tooltip-fullscreen"
                        class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Full screen</span>
                    </button>
                    <div id="tooltip-fullscreen" role="tooltip"
                        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                        Show full screen
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div class="py-2 px-4 bg-white rounded-b-lg">
                    <label for="editor" class="sr-only">Publish post</label>
                    <textarea v-model="descriptionAlbum" id="editor" rows="8"
                        class="block px-0 w-full text-sm text-gray-800 bg-white border-0 focus:ring-0 "
                        placeholder="Write an article..." required></textarea>
                </div>
            </div>

            <DropZone class=" flex w-full justify-center" @files-dropped="addFiles"
                :class="{ 'cursor-not-allowed opacity-50': loadingFiles.finished }" #default="{ dropZoneActive }">
                <label for="file-input" class="
                    border-dashed rounded-lg flex flex-col bg-gray-50 border-2 border-gray-300 h-48 w-full justify-center items-center
                    dark:bg-gray-700 
                    hover:bg-gray-100"
                    :class="{ 'cursor-not-allowed': loadingFiles.finished, 'cursor-pointer': !loadingFiles.finished }">
                    <!-- <div v-if=" dropZoneActive">
                    <span>Drop Them Here</span>
                    </div> -->
                    <div class="text-center items-center" :class="{ 'cursor-not-allowed': loadingFiles.finished }">
                        <div v-if="files.length == 0" class="items-center">
                            <svg aria-hidden="true" class="m-auto h-10 mb-3 text-gray-400 w-10" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                </path>
                            </svg>
                            <p class="text-sm mb-2 text-gray-500 dark:text-gray-400">
                                <span class="font-semibold">
                                    Clique ici pour mettre des photos
                                </span>
                                ou glisse les ici
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG autorisé </p>
                        </div>
                        <div v-else-if="!loadingFiles.finished">
                            <p class="text-sm mb-2 dark:text-gray-400">
                                <span class="font-semibold">
                                    {{ files.length }}
                                </span>
                                images déposé
                            </p>
                            <p class="text-xs  dark:text-gray-400">
                                (Vous pouvez encore en déplacé)
                            </p>
                        </div>
                        <div v-else>
                            <p class="text-sm mb-2 dark:text-gray-400">
                                <span class="font-semibold">
                                    Pour remettre des images en ligne
                                </span>
                                vous devez appuyez sur le bouton <span class="font-semibold">FINIT</span> ci-dessous
                            </p>

                        </div>
                    </div>
                </label>
            </DropZone>

            <input type="file" name="file" id="file-input" class="inputfile" multiple @change="onInputChange"
                :disabled="loadingFiles.finished" />

            <div v-if="files.length > 0"
                class="bg-white border rounded-lg border-gray-200 shadow-md mt-12 text-center mb-6 w-full max-w-[650px] pt-6 pl-6 self-center file-preview dark:bg-gray-800 dark:border-gray-700">

                <h5 class="font-bold mb-2 pr-6 text-3xl text-gray-900 dark:text-white ">
                    Prévisualisation
                </h5>

                <p class="text-base mb-5 pr-6 text-gray-500 sm:text-lg dark:text-gray-400">
                    Voici un rapide aperçu des photos prêt à être envoyé, vous pouvez encore retirer des photos</p>

                <br>

                <div class="h-full max-h-96 file-preview overflow-auto">
                    <FilePreview v-for="file of files" :key="file.id" :file="file" tag="li"
                        class="file-preview_row last:pb-6" @remove="removeFile" :finished="loadingFiles.finished">
                    </FilePreview>
                </div>

            </div>



            <button :disabled="loadingFiles.status" v-if="files.length > 0" @click.prevent="!loadingFiles.finished && uploadFiles(files);
            loadingFiles.finished && removePreview()" type="button"
                class="rounded-lg font-sans font-medium bg-blue-800 text-white  text-sm text-center self-center"
                :class="{ 'cursor-not-allowed bg-blue-400': loadingFiles.status, 'hover:bg-blue-900 cursor-pointer': !loadingFiles.status }">

                <span v-if="!loadingFiles.status && !loadingFiles.finished" class=" uploadButton">
                    <svg class="h-6 mr-3 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                        </path>
                    </svg>
                    Mettre en ligne
                </span>

                <span class="uploadButton" v-else>
                    <svg v-if="!loadingFiles.finished" aria-hidden="true" role="status"
                        class="h-4 mr-3 text-white animate-spin w-4 inline" viewBox="0 0 100 101" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor" />
                    </svg>
                    {{ !loadingFiles.finished ? "Chargement..." : "Finit !" }}
                    {{ !loadingFiles.finished ? "" : "Tu peux enlever la prévisualisation en me cliquant!" }}

                </span>
            </button>

            <div class="mt-12 w-full">
                <label for="red-toggle" class="cursor-pointer mr-5 inline-flex relative items-center">
                    <input type="checkbox" v-model="deleteMode" id="red-toggle" class="sr-only peer">
                    <div
                        class="rounded-full bg-gray-200 h-6 w-11 peer  peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700 ''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600">
                    </div>
                    <span class="font-medium text-sm ml-3 text-gray-900 dark:text-gray-300">Mode suppression</span>
                </label>
            </div>

            <div class="flex flex-wrap mt-3 pb-14 " :class="{ 'items-center h-full self-center': loading }">

                <svg v-if="loading" role="status"
                    class="h-28 mr-2 animate-spin fill-blue-600 text-gray-200 w-28 inline dark:text-gray-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>

                <li class="card" :class="{ 'hover:bg-red-600 cursor-deleteMode': deleteMode }"
                    v-for="(image, index) in pictures" :key="image.id" loading="lazy">
                    <img class="card_img lazyload" data-sizes="auto"
                        :data-src="config.apiURL + 'storage/thumbnail/' + image.path"
                        @click="deleteMode && removePicture(index, image.id)" />
                    <!-- <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                    </svg> -->

                    <div></div>
                </li>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export interface Gallery {
    [album: any]:
    {
        created_at: any,
        folder: string,
        id: number,
        name: string,
        pictures: any,
    },
    [default_picture: string]: {
        album_id: number,
        created_at: string,
        crop: number,
        default_album: boolean,
        h: number,
        height: number,
        id: number,
        name: string,
        path: string,
        src: string,
        thumbnail: string,
        updated_at: string,
        w: number,
        width: number
    },
}

const props = defineProps({
    data: {
        type: Object,
        default: null
    },
})

/*
** Declaration CONST
*/
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const files = ref([])

const loadingFiles = reactive({
    status: false,
    finished: false,
    number: 0,
});

const debouncedTime     = ref(0);

const crop              = ref();
const cropModal         = ref(false);
const defaultPicture    = ref(null);
const deleteMode        = ref(false);
const gallery           = ref<Gallery>();
const folderName        = ref(null);
const img               = ref('https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80');
const loading           = ref(false);
const descriptionAlbum  = useDebouncedRef('', debouncedTime);

let previewImage = ref({
    img: '',
    coordinates: '',
    version: 0,
    loading: false,
});


/*
** END DECLARATION
*/

function showCropModal() {
    cropModal.value = !cropModal.value;
    crop.value.refresh();

}
const previewPictures = computed(() => {
    return gallery.value?.default_picture?.original_url;
})

const previewCropPictures = computed(() => {
    return gallery.value?.default_picture?.crop_url;
})

function onChange({ coordinates, canvas, }) {
    // // You able to do different manipulations at a canvas
    // // but there we just get a cropped image, that can be used
    // // as src for <img/> to preview result
    previewImage.value.coordinates = coordinates;
    previewImage.value.img = canvas.toDataURL();
}
const pictures = computed(() => {
    return gallery.value?.album.pictures;
})


async function cropC() {
    let formData = new FormData()

    formData.append('folder', props.data.folder)
    formData.append('folder_id', props.data.id)
    formData.append('coordinates[height]', previewImage.value.coordinates.height)
    formData.append('coordinates[width]', previewImage.value.coordinates.width)
    formData.append('coordinates[top]', previewImage.value.coordinates.top)
    formData.append('coordinates[left]', previewImage.value.coordinates.left)


    gallery.value.default_picture = null;
    previewImage.value.loading = true;
    try {
        await $api.store('/api/admin/gallery/upload/crop', formData);
        return true;
    } catch ($e) {
    }

    return true;
}

async function cropPicture() {

    const result = await cropC().then(() => { });

    Promise.resolve(result);
    getPictures().then((response) => {
        loading.value = false;
        previewImage.value.version += 1;
        gallery.value.default_picture.crop_url = response.default_picture.crop_url + '?version=' + previewImage.value.version;
        previewImage.value.loading = false;
    });
    cropModal.value = !cropModal.value;

}

/*
** TODO: Check database pictures and edit migration
*/
async function onInputChangeDefaultPicture(e) {
    let newUploadableFiles = new UploadableFile(e.target.files[0], true);

    defaultPicture.value = newUploadableFiles;
    previewImage.value.loading = true;
    await uploadFile(newUploadableFiles);
    previewImage.value.loading = false;
}

function activeDeleteMode() {
    deleteMode.value = !deleteMode.value;
}

async function removePicture(index, imageid) {

    if (deleteMode) {
        await $api.delete('/api/admin/gallery/picture/' + imageid);
    }
    gallery.value.album.pictures.splice(index, 1);
}

async function uploadFile(file) {
    let formData = new FormData()


    formData.append('file', file.file)
    formData.append('folder', props.data.folder)
    formData.append('folder_id', props.data.id)
    formData.append('default', file.default)

    file.status = 'loading';

    try {
        await $api.store('/api/admin/gallery/upload', formData);
        file.status = 'success';
        getPictures();
        return true;
    } catch ($e) {
        file.status = 'failed';

    }

    return true;
}

async function uploadFiles(files) {
    loadingFiles.status = true;

    const result = files.map(async (file) => {
        return await uploadFile(file);
    });

    await Promise.all(result)

    loadingFiles.status = false;
    loadingFiles.finished = true;

    // this.files = [];
}

function onInputChange(e) {
    if (!loadingFiles.finished) {
        addFiles(e.target.files)
        e.target.value = null
    }
}

function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId)
}
function removeFile(file) {
    if (!loadingFiles.finished) {
        const index = files.value.indexOf(file)

        if (index > -1) files.value.splice(index, 1)
    }
}

function addFiles(newFiles) {
    let newUploadableFiles = [...newFiles]
        .map((file) => new UploadableFile(file, false))
        .filter((file) => !fileExists(file.id))
    files.value = files.value.concat(newUploadableFiles)
    console.log(files.value);
}

class UploadableFile {
    constructor(file, defaultPicture) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
        this.default = defaultPicture
    }
}


const getPictures = async () => gallery.value = (await $api.get<Gallery>('/api/admin/gallery/album/' + props.data.id)).data;

// const getDefaultPictureAlbum = async () => gallery.value = (await $api.get<Gallery[]>('/api/admin/gallery/album/' + props.data.id)).data;

/*
** Watchers
** Can't change value when loading is true when swipe modal by modal
*/
watch(descriptionAlbum, async(dAlbumNew, dAlbumOld) => {
    if (loading.value != true && dAlbumNew != null && dAlbumOld != null){
    try {
      let formData = new FormData()

      formData.append('desc', dAlbumNew)
      const res =  await $api.store('/api/album/desc/' + props.data.id, formData);
    } catch (error) {
    }
}
})


watch(() => props.data, (first, newData) => {

    loading.value = true;
    reset();
    folderName.value = props.data.folder;
    setTimeout(_ => getPictures().then((response) => {
        defaultPicture.value = gallery.value?.default_picture ? true : false;
        if (gallery.value?.album.desc !== "null")
            descriptionAlbum.value = gallery.value?.album.desc;
 
        loading.value = false;
    }), 500);
})


function removePreview() {
    loadingFiles.status = false;
    loadingFiles.finished = false;
    this.files = [];
}

const reset = () => {
    descriptionAlbum.value = '';
    loadingFiles.status = false;
    loadingFiles.finished = false;
    gallery.value = null;
    files.value = [];
}

</script>
<style lang="scss" scoped>
/*
**
* Upload Button
*/
.uploadButton {
    @apply mr-2 py-2.5 px-5 inline-flex items-center;
}

/*
**
* slideIn
*/
.slidein {
    .card {
        @apply list-none rounded-[11px] h-44 m-[3px] p-0 w-[19%];
    }

    .card_img {
        @apply rounded-lg h-full object-cover bg-[#B4B4B4] w-full;
    }

    .card {
        opacity: 1;
        transition: background-color 300ms ease-out;
    }

    .card_img {
        &:hover {
            opacity: 0.4;
        }
    }
}

.upload-button {
    @apply bg-admin-sidebar m-auto mt-7;
    width: 253px;
    padding: 15px;
}

li.file-preview_row:not(:last-child) {
    margin-bottom: 10px;
}


.inputfile,
.default-picture {
    @apply h-px w-px opacity-0 overflow-hidden absolute;
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
    @apply bg-[#17277D] h-[92px];
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
    transform: translateX(100%);

}

.slide-leave-to {
    transform: translateX(100%);

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
