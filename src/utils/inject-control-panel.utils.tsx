import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import mapboxStyle from "data-text:mapbox-gl/dist/mapbox-gl.css"
import lazyStyle from "data-text:react-lazy-load-image-component/src/effects/blur.css"
import quillStyle from "data-text:react-quill/dist/quill.snow.css"
import simpleBarStyle from "data-text:simplebar-react/dist/simplebar.min.css"
import carouselThemeStyle from "data-text:slick-carousel/slick/slick-theme.css"
import carouselStyle from "data-text:slick-carousel/slick/slick.css"
import ReactDOM from "react-dom/client"

import MainComponent from "../components/main"
import { waitForElement } from "./wait-for.utils"

export async function injectControlPanel() {
  // const querySelectorTargetElement = ".artdeco-tabs"
  const querySelectorTargetElement = "body"
  await waitForElement(querySelectorTargetElement)
  const injectComponentId = "recruiter-brain-main-button"

  const targetElement = document.querySelector(querySelectorTargetElement)
  const injectedComponent = document.getElementById(injectComponentId)

  if (targetElement && !injectedComponent) {
    console.log(
      `Target element: ${injectComponentId} for injecting data found!!!`
    )
    const container = document.createElement("div")
    container.setAttribute("id", injectComponentId)
    targetElement.appendChild(container)
    const shadowContainer = container.attachShadow({ mode: "open" })

    const emotionRoot = document.createElement("style")
    const elementCSS = document.createElement("style")
    elementCSS.textContent =
      carouselStyle +
      carouselThemeStyle +
      quillStyle +
      lazyStyle +
      simpleBarStyle +
      mapboxStyle
    const shadowRootElement = document.createElement("div")
    shadowContainer.appendChild(emotionRoot)
    shadowContainer.appendChild(elementCSS)
    shadowContainer.appendChild(shadowRootElement)

    const cache = createCache({
      key: "css",
      prepend: true,
      container: emotionRoot
    })

    const root = ReactDOM.createRoot(shadowRootElement as HTMLElement)

    root.render(
      <CacheProvider value={cache}>
        <MainComponent />
      </CacheProvider>
    )
  } else {
    console.error(
      `Target element: ${injectComponentId} for injecting data not found.`
    )
  }
}
