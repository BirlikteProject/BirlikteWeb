import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAi2KBYN1tft_IMqlAsvnLkLXzGJ5icOx4',
    authDomain: 'birlikte-api.firebaseapp.com',
    projectId: 'birlikte-api',
    storageBucket: 'birlikte-api.appspot.com',
    messagingSenderId: '432393148865',
    appId: '1:432393148865:web:834d778b562932c8d43740',
    measurementId: 'G-STZY76ZLR7',
  }

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export default firebase

