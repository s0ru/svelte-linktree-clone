import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { writable } from 'svelte/store'

const firebaseConfig = {
  apiKey: 'AIzaSyAA_rAMXl-UmfD__O8y44l2yhyea8IXzLc',
  authDomain: 'svelte-linktree-clone-2eca9.firebaseapp.com',
  projectId: 'svelte-linktree-clone-2eca9',
  storageBucket: 'svelte-linktree-clone-2eca9.appspot.com',
  messagingSenderId: '188457931007',
  appId: '1:188457931007:web:99d0bbd0e18de15640bcca'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()

const userStore = () => {
  let unsuscribe = () => {}

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable(null)
    return {
      subscribe
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsuscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    })

    return () => unsuscribe()
  })

  return { subscribe }
}

export const user = userStore()
