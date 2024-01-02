export function sendMessageToContentScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs)
    chrome.tabs.sendMessage(tabs[0].id, { action: action })
  })
}
