import { ref } from 'vue'

export default function () {

    const files = ref([])

    function addFiles(newFiles)
    {
        let newUploadableFiles = [...newFiles]
            .map((file) => new newUploadableFiles(file))
            .filter((file) => !fileExists(file.id))
        
        files.value = files.value.concat(newUploadableFiles)
    }

}