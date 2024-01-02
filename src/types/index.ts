export type AuthState = {
  isAuth: boolean
  email: string
  accessToken: string
  refreshToken: string
}

export const AuthInitialState: AuthState = {
  isAuth: false,
  email: "",
  accessToken: "",
  refreshToken: ""
}

export type UserCredential = {
  email: string
  password: string
  passwordConfirm?: string
}

export const ActionTypes = {
  EVALUATE_PROFILES: "evaluate-profiles",
  GET_STATUS: "get-status",
  PAUSE_JOB: "pause-job",
  RESUME_JOB: "resume-job",
  STOP_JOB: "stop-job",
  TASK_DATA_RECEIVED: "task-data-received",
  GET_JOB_DETAILS: "get-job-details",
  CLOSE_TAB: "close-tab",
  CLEAR_PROJECT_DATA: "clear-project-data",
  DELETE_ALL_DATABASE: "delete-all-dbs",
  GET_EVALUATION: "get-data-from-indexed-db",
  UPDATE_DATA: "update-data-from-indexed-db",
  GET_EVALUATIONS_AVERAGE: "get-evaluations-average-from-indexed-db",
  ITEM_ADDED: "item-added-to-indexed-db",
  SWITCH_BACK_TO_MAIN_TAB: "switch-back-to-main-tab",
  DELETE_DB: "delete-db",
  RESET_ALL: "reset-all",
}

export const PROFILE_SELECTORS = {
  listElement: "ol.profile-list",
  parent: ".page-layout__workspace"
}
