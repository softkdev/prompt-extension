import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { useEffect } from "react"
import ReactDOM from "react-dom/client"
import useFirebaseUser from "src/firebase/useFirebaseUser"

import { useStorage } from "@plasmohq/storage/hook"

import { MinimalProvider } from "~@minimal/Provider"
import {
  AUTH_STATE,
  EXTENSION_ENABLE,
  EXTENSION_VISIBLE
} from "~src/config/storage.config"
import { AuthInitialState, type AuthState } from "~src/types"
import { waitForElement } from "~src/utils/wait-for.utils"

import FabButton from "./common/fab-button.component"
import LoadingComponent from "./common/loading.component"
import Modal from "./common/modal.component"
import { PopUp } from "./popUp/PopUp"
import Login from "./sections/login.component"
import NoteComponent from "./sections/note.component"

const Home = () => {
  const [extensionEnabled] = useStorage(EXTENSION_ENABLE, true)
  const [extensionVisible, setExtensionVisible] = useStorage(
    EXTENSION_VISIBLE,
    true
  )
  const [userInfo, setUserInfo] = useStorage<AuthState>(
    AUTH_STATE,
    AuthInitialState
  )

  const toggleModal = () => setExtensionVisible(!extensionVisible)

  const { user, isLoading } = useFirebaseUser()

  useEffect(() => {
    if (user && !userInfo.isAuth)
      user.getIdToken(true).then(async (token) => {
        setUserInfo({
          email: user.email,
          accessToken: token,
          refreshToken: user.refreshToken,
          isAuth: true
        })
      })
  }, [user])

  if (!extensionEnabled) return <></>

  return (
    <MinimalProvider>
      <Modal
        open={extensionVisible}
        onClose={toggleModal}
        width={user && !isLoading ? 1200 : 400}
        >
        {isLoading && <LoadingComponent />}
        {!userInfo.isAuth && !isLoading && <Login />}
        {userInfo.isAuth && !isLoading && <NoteComponent />}
      </Modal>
      <FabButton
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 10000,
          padding: 1.25
        }}
        onClick={toggleModal}
      />
      {/* {userInfo.isAuth && extensionVisible && !isLoading && <PopUp />} */}
      <PopUp />
    </MinimalProvider>
  )
}

export const injectMainComponent = async () => {
  const querySelectorTargetElement = "body"
  const injectComponentId = "recruitbrain-main-component"
  await waitForElement(querySelectorTargetElement)

  const targetElement = document.querySelector(querySelectorTargetElement)
  const injectComponent = document.getElementById(injectComponentId)

  if (targetElement && !injectComponent) {
    const container = document.createElement("div")
    container.setAttribute("id", injectComponentId)
    targetElement.appendChild(container)
    const shadowContainer = container.attachShadow({ mode: "open" })

    const emotionRoot = document.createElement("style")
    const shadowRootElement = document.createElement("div")
    shadowContainer.appendChild(emotionRoot)
    shadowContainer.appendChild(shadowRootElement)
    const root = ReactDOM.createRoot(shadowRootElement)

    const cache = createCache({
      key: "css",
      prepend: true,
      container: emotionRoot
    })

    root.render(
      <CacheProvider value={cache}>
        <Home />
      </CacheProvider>
    )
  }
}

export default Home
