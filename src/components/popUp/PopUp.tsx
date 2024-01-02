import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom/client"

import { type DataListType } from "~@minimal/sections/popup/view"
import { collectionName } from "~src/firebase/firebaseApi"
import { db } from "~src/firebase/firebaseClient"

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
  const listRef = useRef<DataListType[]>([])
  // const [searchValue, setSearchValue] = useState("")
  const [items, setItems] = useState<DataListType[]>([])
  // const [inputAnchorEl, setInputAnchorEl] = useState<
  //   HTMLTextAreaElement | HTMLInputElement | null
  // >(null)
  // const handleSubmit = async (
  //   element: HTMLTextAreaElement | HTMLInputElement | null,
  //   list: DataListType[]
  // ) => {
  //   if (element) {
  //     const div = document.getElementById(element.id + "_div_popup")
  //     div.innerHTML = ""
  //     let value = element.value
  //     for (const item of list) {
  //       value = await value.replaceAll(
  //         `\xa0/${item.title.replaceAll(" ", "_")}\xa0`,
  //         item.content
  //       )
  //     }
  //     console.log(" OLDVALUE: ", {
  //       value,
  //       inputValue: element.value,
  //       html: div.innerHTML
  //     })
  //     return value
  //   }

  //   return undefined
  // }

  // const handleSetKeyLabel = (
  //   input: HTMLTextAreaElement | HTMLInputElement,
  //   list: DataListType[]
  // ) => {
  //   let highlighted = input.value
  //   for (const itemList of list) {
  //     const regex = new RegExp(
  //       `\xa0/${itemList.title.replaceAll(" ", "_")}`,
  //       "gi"
  //     )
  //     const markElement = (match: string) =>
  //       `<mark style="border-radius: 8px;color: transparent;background: linear-gradient(95deg, #000 -2.16%, rgba(0, 0, 0, 0.42) 60.51%);padding:1px 0;opacity:0.8;">${match}</mark>`

  //     highlighted = highlighted.replaceAll(regex, markElement)
  //   }
  //   const div = document.getElementById(input.id + "_div_popup")
  //   div.innerHTML = highlighted
  // }

  // async function handleKyeUp(
  //   e: KeyboardEvent,
  //   input: HTMLTextAreaElement | HTMLInputElement
  // ) {
  //   if (e.key === "/") {
  //     setInputAnchorEl(input)
  //     popupInputs.openPopUp = true
  //   } else {
  //     const value = input.value
  //     if (e.code === "Backspace") {
  //       handleSetKeyLabel(input, listSelectedItem.current)
  //       // TODO fix the backspace for removing other tags
  //     }
  //     if (popupInputs.openPopUp === true) {
  //       setSearchValue(value?.slice(value?.lastIndexOf("/") + 1))
  //     }
  //   }
  // }
  // async function handleKyeDown(
  //   e: KeyboardEvent,
  //   input: HTMLTextAreaElement | HTMLInputElement
  // ) {
  //   const value = input.value
  //   if (e.code === "Enter") {
  //     const newValue = await handleSubmit(input, listSelectedItem.current)
  //     input.value = newValue || value
  //     handleClosePopup()
  //   }
  // }

  // useEffect(() => {
  //   const q = query(
  //     collection(db, collectionName),
  //     orderBy("createdDate", "desc")
  //   )
  //   onSnapshot(q, (querySnapshot) => {
  //     let docs = []
  //     querySnapshot.forEach((doc) => {
  //       const docItem = { ...doc.data() }
  //       docs.push({ ...docItem, id: doc.id })
  //     })
  //     setItems(docs)
  //     console.log("OLDDocs: ", docs)
  //   })
  // }, [])
  const initialInputs = async (list: DataListType[]) => {
    if (typeof window !== undefined) {
      const observer = new MutationObserver((mutations) => {
        const fileInput = document.querySelector("[type=file]")
        mutations.forEach((mut) => {
          if (mut.target === window.document.body) {
            return ""
          }
          const listInputs = [...document.querySelectorAll("textarea")]
          console.log("listInputs", fileInput, listInputs)
          if (listInputs.length > 0 && fileInput) {
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
                console.log("fileInput", fileInput, input)
                div.style.maxHeight = input.style.height
                div.style.height = "unset"
                input.parentElement.appendChild(div)
                input.style.display = "none"

                ReactDOM.createRoot(div).render(
                  <Editor input={input} items={list} />
                )
                popupInputs.inputList.push(input)
              }
            })
          }
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
    // if (items.length > 0) {
    // }
  }, [])

  // const handleClosePopup = () => {
  //   setInputAnchorEl(null)
  //   setSearchValue("")
  //   popupInputs.openPopUp = false
  // }

  // const handleClickNewItem = (item: DataListType) => {
  //   const input = inputAnchorEl
  //   if (input) {
  //     const title = item.title.replaceAll(" ", "_")
  //     const list = [...listSelectedItem.current, item]
  //     listSelectedItem.current = list
  //     const lastFindItem = input.value.lastIndexOf("/")
  //     input.value = input.value.slice(0, lastFindItem) + `\xa0/${title}\xa0`

  //     handleSetKeyLabel(input, list)
  //     handleClosePopup()
  //   }
  // }

  return <></>
}
