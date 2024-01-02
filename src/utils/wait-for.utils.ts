export async function waitForElement(selector) {
  return new Promise((resolve) => {
    let element = document.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    let observer = new MutationObserver(function (mutations, me) {
      let element = document.querySelector(selector)
      if (element) {
        resolve(element)
        me.disconnect() // Stop observing
        return
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    })
  })
}

export function waitForContainerChanges(containerSelector, timeout = 500) {
  return new Promise<void>((resolve) => {
    const container = document.querySelector(containerSelector)

    if (!container) {
      resolve()
      return
    }

    const startTime = Date.now()

    const checkChanges = () => {
      const observer = new MutationObserver(() => {
        observer.disconnect()
        resolve()
      })

      observer.observe(container, { childList: true })

      setTimeout(() => {
        observer.disconnect()
        resolve()
      }, timeout)
    }

    // Check for changes immediately and set up a timeout
    checkChanges()

    const intervalId = setInterval(() => {
      if (Date.now() - startTime >= timeout) {
        clearInterval(intervalId)
        resolve()
      } else {
        checkChanges()
      }
    }, 300)
  })
}
