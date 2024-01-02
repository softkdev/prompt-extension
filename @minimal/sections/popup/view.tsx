import { Box, Popover, Typography } from "@mui/material"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import React, { useEffect, useRef, useState } from "react"

import { collectionName } from "~src/firebase/firebaseApi"
import { db } from "~src/firebase/firebaseClient"

export type DataListType = {
  content: string
  createdDate: {
    nanoseconds: number
    seconds: number
  }
  id: string
  isRead: boolean
  title: string
}

interface PopUpViewProps {
  anchorEl: HTMLInputElement | HTMLTextAreaElement | null
  handleClosePopup: () => void
  searchValue: string
  handleClickItem: (item: DataListType) => void
}

let isOpen = {
  open: false
}

export default function PopUpView({
  anchorEl,
  handleClosePopup,
  searchValue,
  handleClickItem
}: PopUpViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  
  const [dataList, setDataList] = useState<DataListType[]>([])
  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy("createdDate", "desc")
    )
    onSnapshot(q, (querySnapshot) => {
      let docs = []
      querySnapshot.forEach(async (doc) => {
        const docItem = { ...doc.data() }
        docs.push({ ...docItem, id: doc.id })
      })
      setDataList(docs)
    })
  }, [])

  const handleDocumentClick = (event: MouseEvent) => {
    if (anchorEl && !ref.current?.contains(event.target as Node)) {
      // Click occurred outside the popup
      handleClosePopup()
    }
  }
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleDocumentClick)
    isOpen.open = false

    // Clean up the event listener when the component unmounts
    return () => {
      isOpen.open = false
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [anchorEl])

  const getCaretCoordinates = (
    input: HTMLInputElement | HTMLTextAreaElement
  ): { top: number; left: number } => {
    const sizeInput = input.getBoundingClientRect()
    const { selectionStart, offsetLeft, offsetTop, offsetWidth } = input
    const span = document.createElement("span")
    const textContent = input.value.substring(0, selectionStart)
    span.textContent = textContent
    document.body.appendChild(span)
    const rect = span.getBoundingClientRect()
    document.body.removeChild(span)

    return {
      top: sizeInput.top,
      left: offsetLeft + rect.width + sizeInput.left
    }
  }

  const caretPosition = anchorEl
    ? getCaretCoordinates(anchorEl)
    : { top: 0, left: 0 }

  const dataNewList = dataList.filter(
    (item) =>
      searchValue === "" ||
      item.title.includes(searchValue) ||
      item.content.includes(searchValue)
  )

  return (
    <Popover
      id={id}
      open={dataList.length > 0 && open}
      anchorEl={anchorEl}
      onClose={handleClosePopup}
      onFocus={(e) => {
        if (isOpen.open === false) {
          anchorEl?.focus?.()
          isOpen.open = true
        }
      }}
      ref={ref}
      style={{
        position: "absolute",
        top: caretPosition.top,
        left: caretPosition.left,
        backgroundColor: "#000000",
        transform: "translate(20px, -100%)",
        padding: "8px",
        outline: "unset !important",
        borderRadius: "6px",
        minWidth: "200px"
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="6"
        viewBox="0 0 12 6"
        style={{
          
        }}
        fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0L0 0Z"
          fill="black"
        />
      </svg>
      <div
        style={{
          outline: "unset !important",
          display: "flex",
          gap: "12px",
          flexDirection: "column"
        }}>
        <Typography
          style={{
            color: "#B9B9B9"
          }}>
          {" "}
          My Data Sets
        </Typography>
        {dataNewList.map((item, index) => (
          <Box
            style={{
              cursor: "pointer"
            }}
            onClick={() => handleClickItem(item)}
            key={item.id}>
            <Typography>{item.title}</Typography>
          </Box>
        ))}
        {dataNewList.length === 0 && (
          <Typography
            style={{
              opacity: 0.7
            }}>
            There is no item
          </Typography>
        )}
      </div>
    </Popover>
  )
}
