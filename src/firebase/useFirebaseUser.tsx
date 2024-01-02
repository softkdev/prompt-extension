// src/firebase/useFirebaseUser.tsx

import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  type User
} from "firebase/auth"
import { useEffect, useState } from "react"
import { AUTH_STATE } from "src/config/storage.config"
import { AuthInitialState, type AuthState } from "src/types"

import { useStorage } from "@plasmohq/storage/hook"

import { auth } from "./firebaseClient"

setPersistence(auth, browserLocalPersistence)

export default function useFirebaseUser() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>(null)
  const [userInfo, setUserInfo] = useStorage<AuthState>(
    AUTH_STATE,
    AuthInitialState
  )

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
      setUserInfo(AuthInitialState)
    }
  }

  const onLogin = () => {
    if (!user) return

    const uid = user.uid

    // Get current user auth token
    user.getIdToken(true).then(async (token) => {
      setUserInfo({
        email: user.email,
        accessToken: token,
        refreshToken: user.refreshToken,
        isAuth: true
      })
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      if (user) {
        user.getIdToken(true).then(async (token) => {
          setUserInfo({
            email: user.email,
            accessToken: token,
            refreshToken: user.refreshToken,
            isAuth: true
          })
        })
      }
    })
  }, [])

  useEffect(() => {
    if (user) {
      onLogin()
    }
  }, [user])

  return {
    isLoading,
    user,
    onLogin,
    onLogout
  }
}
