import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material"
import React from "react"
import Logo from "react:~assets/logo.svg"
import { EXTENSION_ENABLE } from "src/config/storage.config"
import useFirebaseUser from "src/firebase/useFirebaseUser"

import { useStorage } from "@plasmohq/storage/hook"

import { ActionTypes } from "./types"

const IndexPopup = () => {
  const [state, setState] = useStorage<boolean | null>(EXTENSION_ENABLE, true)

  const { onLogout } = useFirebaseUser()

  const onReset = () => {
    onLogout()
    chrome.runtime.sendMessage(
      { action: ActionTypes.DELETE_ALL_DATABASE, data: "" },
      (response) => {
        console.log("DELETE DB")
      }
    )
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      width={260}
      padding={2}
      gap={2}>
      <Box>
        <Logo />
      </Box>
      <ToggleButtonGroup
        value={state || false}
        onChange={(e, val) => (val !== null ? setState(val) : null)}
        exclusive
        aria-label="On/Off">
        <ToggleButton
          value={true}
          aria-label="On"
          style={{ borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}>
          ON
        </ToggleButton>
        <ToggleButton
          value={false}
          aria-label="Off"
          style={{ borderBottomRightRadius: 12, borderTopRightRadius: 12 }}>
          OFF
        </ToggleButton>
      </ToggleButtonGroup>
      {/*
      <Button color="primary" variant="contained" onClick={onReset}>
        Reset
      </Button>
      */}
      <Typography variant="caption" display={"block"}>
        info@recruiterbrain.com
      </Typography>
    </Box>
  )
}

export default IndexPopup
