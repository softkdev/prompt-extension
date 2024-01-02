import crypto from "crypto"

export function generateMD5(string) {
  return crypto.createHash("md5").update(string).digest("hex")
}
