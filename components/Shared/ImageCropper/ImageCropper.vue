<template>
    <div class="image-upload-and-crop-wrapper">
      <FilePond
        v-if="!uploadedFile"
        :file="file"
        :disabled="disabled"
        @selectedFile="selectedFile"
        @removeFile="() => {
          $emit('removeFile', null)
          uploadedFromCropper = false
          uploadedFile = null
        }"
      />
      <Cropper
        v-if="!file && uploadedFile"
        :image="uploadedFile"
        :ratio="ratio"
        @croppedImage="croppedImage"
      />
    </div>
  </template>
  
  <script>
  import FilePond from './FilePond'
  import Cropper from './Cropper'
  
  export default {
    name: 'ImageUploadAndCrop',
    components: {
      FilePond,
      Cropper
    },
    props: {
      file: {
        type: String || Image,
        required: false,
        default: null
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      // eslint-disable-next-line vue/require-prop-types
      ratio: {
        required: false,
        default: null
      }
    },
    data () {
      return {
        uploadedFile: null,
        uploadedFromCropper: false
      }
    },
    methods: {
      selectedFile (file) {
        if (!this.file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.uploadedFile = e.target.result
          }
          reader.readAsDataURL(file.file)
          this.uploadedFromCropper = true
          this.$emit('onImageImported')
        }
      },
      croppedImage (image) {
        this.$emit('croppedImage', [URL.createObjectURL(image), image])
        this.uploadedFromCropper = false
        this.uploadedFile = null
      }
    }
  }
  </script>
  
  <style>
  </style>