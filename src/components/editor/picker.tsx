/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch
} from "@lexical/react/LexicalTypeaheadMenuPlugin"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { Typography } from "@mui/material"
import {
  $getSelection,
  $insertNodes,
  TextNode,
  type LexicalEditor,
  $createTextNode
} from "lexical"
import { useCallback, useMemo, useState } from "react"
import * as React from "react"
import * as ReactDOM from "react-dom"

import type { DataListType } from "~@minimal/sections/popup/view"

import { $createEmojiNode } from "./popup-editor"

// import useModal from '../../hooks/useModal';

class ComponentPickerOption extends MenuOption {
  // What shows up in the editor
  title: string
  // Icon for display
  icon?: JSX.Element
  // For extra searching.
  keywords: Array<string>
  // TBD
  keyboardShortcut?: string
  // What happens when you select this option?
  onSelect: (queryString: string) => void

  constructor(
    title: string,
    options: {
      icon?: JSX.Element
      keywords?: Array<string>
      keyboardShortcut?: string
      onSelect: (queryString: string) => void
    }
  ) {
    super(title)
    this.title = title
    this.keywords = options.keywords || []
    this.icon = options.icon
    this.keyboardShortcut = options.keyboardShortcut
    this.onSelect = options.onSelect.bind(this)
  }
}

function ComponentPickerMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option
}: {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: ComponentPickerOption
}) {
  let className = "item"
  if (isSelected) {
    className += " selected"
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={"typeahead-item-" + index}
      style={{
        color: "#fff",
        borderRadius: "6px",
        background: "var(#919EAB14, rgba(145, 158, 171, 0.08))",
        cursor: "pointer"
      }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}>
      {option.title}
      <span>{option.icon}</span>
    </li>
  )
}

function getDynamicOptions(editor: LexicalEditor, queryString: string) {
  const options: Array<ComponentPickerOption> = []

  if (queryString == null) {
    return options
  }

  const tableMatch = queryString.match(/^([1-9]\d?)(?:x([1-9]\d?)?)?$/)

  if (tableMatch !== null) {
    const rows = tableMatch[1]
    const colOptions = tableMatch[2]
      ? [tableMatch[2]]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String)

    options.push(
      ...colOptions.map(
        (columns) =>
          new ComponentPickerOption(`${rows}x${columns} Table`, {
            icon: <i className="icon table" />,
            keywords: ["table"],
            onSelect: () =>
              editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows })
          })
      )
    )
  }

  return options
}

// type ShowModal = ReturnType<typeof useModal>[1];

function getBaseOptions(editor: LexicalEditor, items: DataListType[]) {
  console.log("ITEMS: ", items)
  return items.map(
    (item) =>
      new ComponentPickerOption(item.title, {
        icon: <i className="icon paragraph" />,
        keywords: item.title.split(" "),
        onSelect: () =>
          editor.update(() => {
            // const selection = $getSelection()
            $insertNodes([$createEmojiNode(item.title, `${item.title}`, items),  $createTextNode(' ')])
            // selection!.insertNodes([
            //   $createEmojiNode(item.title, `${item.title}`)
            // ])
          })
      })
  )
}

export default function ComponentPickerMenuPlugin({
  items,
  input
}: {
  items: DataListType[]
  input: HTMLTextAreaElement | HTMLInputElement
}): JSX.Element {
  const [editor] = useLexicalComposerContext()
  //   const [modal, showModal] = useModal();
  const [queryString, setQueryString] = useState<string | null>(null)

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0
  })

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor, items)

    if (!queryString) {
      return baseOptions
    }

    const regex = new RegExp(queryString, "i")

    return [
      ...getDynamicOptions(editor, queryString),
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword))
      )
    ]
  }, [editor, queryString, items])

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string
    ) => {
      editor.update(() => {
        nodeToRemove?.remove()
        selectedOption.onSelect(matchingString)
        closeMenu()
      })
    },
    [editor]
  )

  return (
    <>
      {/* {modal} */}
      <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
        ) =>
          anchorElementRef.current && options.length
            ? ReactDOM.createPortal(
                <div
                  style={{
                    transform: "translate(0, calc(-100% - 20px))"
                  }}>
                  <ul
                    style={{
                      backgroundColor: "#000000",
                      padding: "8px",
                      outline: "unset !important",
                      borderRadius: "6px",
                      minWidth: "200px",
                      display: "flex",
                      gap: "12px",
                      flexDirection: "column"
                    }}>
                    <Typography
                      style={{
                        color: "#B9B9B9"
                      }}>
                      My Data Sets
                    </Typography>
                    {options.map((option, i: number) => (
                      <ComponentPickerMenuItem
                        index={i}
                        isSelected={selectedIndex === i}
                        onClick={() => {
                          setHighlightedIndex(i)
                          selectOptionAndCleanUp(option)
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(i)
                        }}
                        key={option.key}
                        option={option}
                      />
                    ))}
                  </ul>
                </div>,
                anchorElementRef.current
              )
            : null
        }
      />
    </>
  )
}
