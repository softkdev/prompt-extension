import axios from "axios"
import { AUTH_STATE } from "src/config/storage.config"
import type { AuthState } from "src/types"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export async function getEvaluationData() {
  return new Promise(async (resolve, reject) => {
    const data: AuthState = await storage.get(AUTH_STATE)
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`, {
        headers: {
          Authorization: `${data.accessToken}`
        }
      })
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
