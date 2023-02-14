import Vue from 'vue'
import { io } from 'socket.io-client'
import VueSocketIO from './socket-lib'

export default (context, inject) => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: io('http://142.93.106.148:3200', {
        path: '',
        auth: (cb) => {
          const data = { token: context.app.store.state.user.token }
          console.log(data)
          cb(data)
        },
        transports: ['websocket'],
        autoConnect: false,
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
