<template>
    <no-ssr>
      <file-pond
        ref="pond"
        class="file-pond-style"
        name="test"
        label-idle="Resimlerinizi buraya sürükleyin veya tıklayın"
        :allow-multiple="false"
        accepted-file-types="image/jpeg, image/png"
        :files="file"
        :onaddfile="onAddFile"
        :onremovefile="onRemoveFile"
        :disabled="disabled"
        @init="handleFilePondInit"
      />
    </no-ssr>
  </template>
  
  <script>
  import vueFilePond from 'vue-filepond'
  import 'filepond/dist/filepond.min.css'
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
  
  const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
  export default {
    components: {
      FilePond
    },
    props: {
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      file: {
        type: String || Image,
        required: false,
        default: null
      }
    },
    methods: {
      handleFilePondInit () {
        // FilePond instance methods are available on `this.$refs.pond`
      },
      onAddFile (error, file) {
        if (error) {
          alert(error)
        } else {
          this.$emit('selectedFile', file)
        }
      },
      onRemoveFile () {
        this.$emit('removeFile', null)
      }
    }
  }
  </script>
  
  <style>
  .filepond--file-info {
    display: none;
  }
  .filepond--credits {
    display: none;
  }
  </style>
  