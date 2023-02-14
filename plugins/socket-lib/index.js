import SocketIO from 'socket.io-client'
import Mixin from './mixin'
import Logger from './logger'
import Listener from './listener'
import Emitter from './emitter'

const version = 3

export default class VueSocketIO {
  /**
   * lets take all resource
   * @param io
   * @param vuex
   * @param debug
   * @param options
   */
  constructor({ connection, vuex, debug, options }) {
    Logger.debug = debug
    this.io = this.connect(connection, options)
    this.emitter = new Emitter(vuex)
    this.listener = new Listener(this.io, this.emitter)
  }

  /**
   * Vue.js entry point
   * @param Vue
   */
  install(Vue) {
    if (version <= +Vue.version.split('.')[0]) {
      Vue.provide('socket', this.io)
      Vue.config.globalProperties.$socket = this.io
      Vue.config.globalProperties.$vueSocketIo = this
    } else {
      Vue.prototype.$socket = this.io
      Vue.prototype.$vueSocketIo = this
    }

    Vue.mixin(Mixin)

    Logger.info('Vue-Socket.io plugin enabled')
  }

  /**
   * registering SocketIO instance
   * @param connection
   * @param options
   */
  connect(connection, options) {
    if (connection && typeof connection === 'object') {
      Logger.info('Received socket.io-client instance')

      return connection
    } else if (typeof connection === 'string') {
      Logger.info('Received connection string')

      this.io = SocketIO(connection, options)
      return this.io
    } else {
      throw new TypeError('Unsupported connection type')
    }
  }
}
