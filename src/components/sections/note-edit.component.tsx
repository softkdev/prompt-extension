import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setIsEditing: (isEditing: boolean) => void; 
  isEditing: boolean;
  handleSaveNoteClick: () => void;
  handleDeleteClick: () => void;
}

const NoteEditComponent = (props: NoteProps) => {

const handleChangeTitle = (value: string) => {
    props.setTitle(value);
  }

  const handleChangeContent = (value: string) => {
    props.setContent(value);
  }

  const handleEditClick = () => {
    props.setIsEditing(true);
  }

  const handleCancelClick = () => {
    props.setIsEditing(false);
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      width={"508px"}
      height={"100%"}
      // justifyContent={"space-between"}
      sx={{ background: "#FFF" }}
    >
      {
        (props.isEditing)?
          <Stack padding={"24px 24px 24px 24px"} direction="column" gap={3} height={"100%"}>
            <TextField fullWidth label={"Title"} sx={{ borderRadius: 2, color: "black" }} value={props.title} onChange={(e) => handleChangeTitle(e.target.value)} />
            <TextField fullWidth label={"Content"} multiline rows={10} sx={{ borderRadius: 2, color: "black" }} value={props.content} onChange={(e) => handleChangeContent(e.target.value)} />
          </Stack>
          :
          <Stack padding={"24px 24px 24px 24px"} direction="column" gap={3} height={"100%"}>
            <Typography fontSize={"18px"} fontWeight={700} lineHeight={"28px"} sx={{ color: "black" }}>
              {props.title}
            </Typography>
            <Typography fontSize={"13px"} fontWeight={500} lineHeight={"18px"} sx={{ color: "black" }}>
              {props.content}
            </Typography>
          </Stack>
      }

      {
        (props.isEditing) ?
          (
            <Stack direction={"row"} justifyContent={"end"} padding={2} gap={2}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => handleCancelClick()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ background: "#212B36" }}
                onClick={() => props.handleSaveNoteClick()}
              >
                Save Changes
              </Button>
            </Stack>
          )
          :
          (
            <Stack direction={"row"} justifyContent={"end"} padding={2} gap={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleEditClick()}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => props.handleDeleteClick()}>
                Delete
              </Button>
            </Stack>
          )
      }


    </Stack>
  )
}

export default NoteEditComponent