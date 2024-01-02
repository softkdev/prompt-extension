import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodeToNearestRoot } from "@lexical/utils"
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  type LexicalCommand
} from "lexical"
import { useEffect } from "react"

import { $createEmojiNode, EmojiNode } from "./popup-editor"

export const INSERT_TWEET_COMMAND: LexicalCommand<string> = createCommand()

export default function PopUpPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([EmojiNode])) {
      throw new Error(
        "PopUpPlugin: TweetNode not registered on editor (initialConfig.nodes)"
      )
    }

    return editor.registerCommand<string>(
      INSERT_TWEET_COMMAND,
      (payload) => {
        const tweetNode = $createEmojiNode(payload, "")
        $insertNodeToNearestRoot(tweetNode)

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}
