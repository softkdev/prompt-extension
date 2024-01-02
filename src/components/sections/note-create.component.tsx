import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface NoteCreateProps {
  id: string;
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  handleCreateNoteClick: () => void;
}

const NoteCreateComponent = (props: NoteCreateProps) => {

  const handleChangeTitle = (value: string) => {
    props.setTitle(value);
  }

  const handleChangeContent = (value: string) => {
    props.setContent(value);
  }

  const handleCancelClick = () => {
    props.setTitle('');
    props.setContent('');
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ background: "#FFF", borderRadius: 2 }}
      width={"508px"}
      height={"100%"}
    >
      <Typography
        paddingX={1.5}
        paddingY={3}
        fontSize={"18px"}
        fontWeight={700}
        lineHeight={"28px"}
        sx={{ color: "black" }}
      >
        New Note
      </Typography>
      <Stack padding={"0px 24px 24px 24px"} direction="column" gap={3} height={"100%"}>
        <TextField fullWidth label={"Title"} sx={{ borderRadius: 2, color: "black"  }} value={props.title} onChange={(e) => handleChangeTitle(e.target.value)} />
        <TextField fullWidth label={"Content"} multiline rows={10} sx={{ borderRadius: 2, color: "black"  }} value={props.content} onChange={(e) => handleChangeContent(e.target.value)} />
      </Stack>
      <Stack direction={"row"} justifyContent={"end"} padding={2} gap={2}>
        <Button
          variant="contained"
          color="inherit"
          onClick={
            () => handleCancelClick()
          }
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#212B36" }}
          onClick={() => props.handleCreateNoteClick()}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )
}

export default NoteCreateComponent