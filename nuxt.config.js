export default {
  ssr: true,

  head: {
    title: 'AFET',
    htmlAttrs: {
      lang: 'tr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  server: {
    port: 3200,
  },

  css: ['~/assets/font/afet-font.css', '~/assets/scss/global.scss'],
  styleResources: {
    scss: [
      '~/assets/scss/global.scss',
      '~/assets/scss/_color.scss',
      '~/assets/scss/_types.scss',
      '~/assets/scss/_responsive.scss',
    ],
  },

  plugins: [
    { src: '~/plugins/components.js', mode: 'client' },
    { src: '~/plugins/icons.js', mode: 'client' },
    { src: '~/plugins/api.js', mode: 'client' },
    { src: '~/plugins/firebase.js', mode: 'client', ssr: false },
    { src: '~/plugins/boot.js', mode: 'client' },
  ],

  components: true,

  iconFont: {
    fontName: 'afet-font',
    style: 'css',
    classOptions: {
      baseClass: 'afet-icons',
      classPrefix: 'afet',
    },
    files: ['assets/icon/*.svg'],
  },

  buildModules: [
    'nuxt-fontagon',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('node-sass'),
      },
    },
  },
  router: {
    middleware: ['global']
  }
}
