import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useCallback } from "react"
import { $getSelection, $isRangeSelection, $isTextNode } from 'lexical';

export const EmojiPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const clearFormat = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            console.log("Node: ", node)
            // node.setFormat(0)
          }
        })
      }
    })
  }, [editor])
  
  return null
}
