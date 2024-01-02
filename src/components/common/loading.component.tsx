import { Box, CircularProgress } from "@mui/material"
import React from "react"

const LoadingComponent = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={150}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingComponent
