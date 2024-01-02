import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"

import { type DataListType } from "~@minimal/sections/popup/view"

import { Editor } from "../editor/editor"

type InputTypeElement = null | HTMLTextAreaElement | HTMLInputElement
interface PopUpInputTypes {
  selectedInput: InputTypeElement
  inputList: InputTypeElement[]
  searchValue: string
  listSelectedItems: DataListType[]
  listItems: DataListType[]
  buttonElement: HTMLButtonElement | null
}

const popupInputs: PopUpInputTypes = {
  selectedInput: null,
  inputList: [],
  searchValue: "",
  listSelectedItems: [],
  listItems: [],
  buttonElement: null
}
export const PopUp = () => {
  const [items, setItems] = useState<DataListType[]>([])
  const initialInputs = async (list: DataListType[]) => {
    if (typeof window !== undefined) {
      const observer = new MutationObserver((mutations) => {
        const isGpt4 = window.location.href.includes("model=gpt-4") || document.querySelector("[type=file]") != null
        let div: HTMLDivElement | null;
        if (isGpt4 && (div = document.getElementById("prompt-textarea_div_popup"))) {
          div.style.paddingLeft = "55px"
        }
        console.log("isGpt4", isGpt4)
        mutations.forEach((mut) => {
          if (mut.target === window.document.body) {
            return ""
          }
          const listInputs = [...document.querySelectorAll("textarea")]
          listInputs.forEach(async (input) => {
            const id = input.id + "_div_popup"
            if (
              !popupInputs.inputList.includes(input) &&
              !document.getElementById(id)
            ) {
              const style = document.createElement("style")
              style.textContent =
                `div#${id} > div {` +
                "  outline: unset; position: relative; z-index:1;}"
              document.head.appendChild(style)
              const div = document.createElement("div")
              div.id = id
              for (const style in input.style) {
                div.style.setProperty(style, input.style[style])
              }
              for (const classList of input.classList) {
                div.classList.add(classList)
              }

              if (isGpt4) {
                div.style.paddingLeft = "55px"
              }
              div.style.maxHeight = input.style.height
              div.style.height = "unset"
              input.parentElement.appendChild(div)
              input.style.display = "none"

              console.log("Initiating in ", isGpt4, div)
              ReactDOM.createRoot(div).render(
                <Editor input={input} items={list} />
              )
              popupInputs.inputList.push(input)
            }
          })
        })
      })
      observer.observe(document.body, {
        subtree: true,
        attributes: true,
        childList: true
      })
    }
  }

  useEffect(() => {
    initialInputs(items)
  }, [])

  return <></>
}
