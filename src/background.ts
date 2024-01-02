import {
  ActionTypes,
} from "./types"

chrome.runtime.onMessage.addListener(handleChromeRuntimeMessage)

const actionHandlers = {
  // Profile Evaluation
  // Handling
  [ActionTypes.CLOSE_TAB]: handleTabCloseRequest,
}

async function handleChromeRuntimeMessage(request, sender, sendResponse) {
  const handler = actionHandlers[request.action]
  if (handler) {
    try {
      await handler(request, sender, sendResponse)
    } catch (error) {
      console.error(`Error handling action ${request.action}: ${error}`)
    }
  } else {
    console.log("action handling not implemented", request.action)
  }
  return true
}



function handleTabCloseRequest(request, sender, sendResponse) {
  chrome.tabs.remove(sender.tab.id, () => { })
}

// END: Handle tasks received from content script

// Mock API call with a timeout, then save data to IndexedDB


export { }

