import { AmplifyLoginView } from "@minimal/sections/auth/amplify"
import { Box } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { auth } from "src/firebase/firebaseClient"
import useFirebaseUser from "src/firebase/useFirebaseUser"
import { type UserCredential } from "src/types"

const Login = () => {
  const { onLogin } = useFirebaseUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const onSubmitLogin = async (data: UserCredential) => {
    try {
      setIsSubmitting(true)
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          setErrorMsg("Invalid email or password")
          break
        default:
          setErrorMsg("Unknown error occured")
          break
      }
    } finally {
      onLogin()
    }

    setIsSubmitting(false)
  }

  return (
    <Box>
      <AmplifyLoginView
        onSubmit={onSubmitLogin}
        isSubmitting={isSubmitting}
        errorMsg={errorMsg}
      />
    </Box>
  )
}

export default Login
