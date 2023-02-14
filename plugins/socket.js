import VueSocketIO from 'vue-3-socket.io'
import Vue from 'vue'
import { io } from 'socket.io-client'

export default (context, inject) => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: io('http://142.93.106.148:3200', {
        path: '',
        auth: (cb) => {
          const data = { token: context.app.store.state.user.token }
          cb(data)
        },
        transports: ['websocket'],
      }),
      vuex: {
        store: context.app.store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
      },
      //   options: { path: ' ' },
    })
  )
}
