<template>
    <div class="cropper-area">
      <cropper
        ref="cropper"
        :src="image"
        :stencil-props="{
          aspectRatio: aspectRatio
        }"
        :min-height="10"
        :min-width="10"
        class="cropperclass"
        :default-size="defaultSize"
      />
      <button type="primary-button" class="mt-3" @click="crop">
        Kırp
      </button>
    </div>
  </template>
  
  <script>
  import { Cropper } from 'vue-advanced-cropper'
  
  export default {
    components: {
      Cropper
    },
    props: {
      // eslint-disable-next-line vue/require-prop-types
      image: {
        required: true
      },
      ratio: {
        required: false,
        default: () => null,
        type: String
      }
    },
    computed: {
      aspectRatio () {
        let result = ''
        if (this.ratio === 'square') {
          result = parseInt(1)
        } else {
          return null
        }
        return result
      }
    },
    methods: {
      defaultSize ({ imageSize, visibleArea }) {
        return {
          width: (visibleArea || imageSize).width,
          height: (visibleArea || imageSize).height
        }
      },
      async crop () {
        const { canvas } = this.$refs.cropper.getResult()
        await canvas.toBlob((blob) => {
          this.$emit('croppedImage', blob)
        })
      }
    }
  }
  </script>
  
  <style lang="scss">
  .cropper-area {
    text-align: center;
  }
  .cropperclass {
    width: 100%;
    height: auto;
    background-color: #4a4a4a;
  }
  </style>
  