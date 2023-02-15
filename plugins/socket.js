import Vue from 'vue'
import { io } from 'socket.io-client'
import VueSocketIO from './socket-lib'

export default (context, inject) => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: io('https://api.birlikte.org.tr:3300', {
        path: '',
        auth: (cb) => {
          const data = { token: context.app.store.state.user.token }
          cb(data)
        },
        transports: ['websocket'],
        autoConnect: false,
        secure: true,
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
