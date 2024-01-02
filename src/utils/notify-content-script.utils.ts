export function notifyContentScript(action) {
  // Query all tabs or a specific tab to send the message to
  console.log("notifyContentScript", action)
  chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
      // Send a message to the content script
      chrome.tabs.sendMessage(tab.id, { action: action })
    }
  })
}
