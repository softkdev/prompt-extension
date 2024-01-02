import { auth } from "src/firebase/firebaseClient"
import { injectComponents } from './componentInjector'

import { ActionTypes } from "~src/types"

export { }


// Inject components into the page
injectComponents()

// Constants for class names
const PROFILE_EVALUATION_CLASS = 'recruit-brain-profile-evaluation';

// Function to sign out the user
function signOutUser() {
  auth.signOut()
}

// Function to remove profile evaluations from the page
function removeProfileEvaluations() {
  console.log("Deleting project data from background db")
  const evaluations = document.getElementsByClassName(PROFILE_EVALUATION_CLASS)
  Array.from(evaluations).forEach(element => element.remove())
}

// Function to reload the page
function reloadPage() {
  window.location.reload()
}

// Clear project data from the page and reload
function clearProjectDataAndReload() {
  removeProfileEvaluations()
  reloadPage()
}

// Handle incoming messages from the Chrome runtime
function handleIncomingMessage(request, sender, sendResponse) {
  if (request.action) {
    console.log("content.js received message:", request.action)
  }

  switch (request.action) {
    case ActionTypes.RESET_ALL:
      signOutUser()
      break
    case ActionTypes.CLEAR_PROJECT_DATA:
      clearProjectDataAndReload()
      break
    default:
      break
  }

  sendResponse()
}

// Listen for messages from the Chrome runtime
chrome.runtime.onMessage.addListener(handleIncomingMessage)