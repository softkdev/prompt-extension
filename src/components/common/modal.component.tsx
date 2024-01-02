import CloseIcon from "@mui/icons-material/Close"
import {
  Box,
  IconButton,
  Modal as MuiModal,
  Stack,
  styled
} from "@mui/material"
import React from "react"
import Logo from "react:~assets/logo.svg"

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  width: 12,
  height: 12,
  color: "white"
}))

export default function Modal({
  open,
  onClose,
  children,
  width = 400
}: {
  open?: boolean
  onClose?: any
  children: any
  width?: number
}) {
  return (
    <MuiModal open={open} disablePortal disableScrollLock onClose={onClose}>
      <Box
        sx={{
          padding: 2,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: 24,
          top: "50%",
          left: "50%",
          borderRadius: 2,
          width: width
        }}>
        {/* Render MuiModal Header */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ mb: 5 }}>
          <Logo />
          <IconButton
            size="small"
            onClick={onClose}
            style={{ background: "#bbb", width: 24, height: 24 }}>
            <StyledCloseIcon />
          </IconButton>
        </Stack>

        {children}
      </Box>
    </MuiModal>
  )
}
