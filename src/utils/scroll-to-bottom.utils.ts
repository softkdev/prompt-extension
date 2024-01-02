export async function scrollToBottom() {
  let lastHeight = document.body.scrollHeight

  while (true) {
    let newHeight = Math.min(document.body.scrollHeight, window.scrollY + 500)
    window.scrollTo(0, newHeight)
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      await new Promise((resolve) => setTimeout(resolve, 750))

      newHeight = document.body.scrollHeight
      if (newHeight === lastHeight) {
        break
      }
      lastHeight = newHeight
    }
  }
}
