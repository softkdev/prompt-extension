import { Badge, Stack, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface NoteSearchItemProps {
  id: string;
  title: string;
  content: string;
  isRead: boolean;
  createdDate: Timestamp;
  isClick: boolean | false;
  handleClick: (id: string) => void;
}

const NoteSearchItemComponent = (props: NoteSearchItemProps) => {
  const {
    id,
    title,
    content,
    isRead,
    isClick,
    createdDate
  }: NoteSearchItemProps = props;

  const [pastTime, setPastTime] = useState('');

  useEffect(() => {
    let value = ((new Date()).getTime() / 1000 - createdDate.seconds) / 60;
    const h = Math.floor(value / 60);
    const m = Math.floor(value) % 60;
    setPastTime((h === 0 ? (m + ' min') : (h + ' hours ' + m + ' min ')));
  }, [props.createdDate]);


  return (
    <div onClick={() => props.handleClick(id)}>
      <Stack
        direction="column"
        padding={1}
        sx={{
          background: isClick ? "#EDEFF1" : "#FFF",
        }}
      >
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            maxWidth={"80%"}
            fontWeight={600}
            sx={{ fontWeight: 600, color: "black" }}
            variant="subtitle2"
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: "12px", textAlign: "right", color: "gray" }}
            variant="subtitle2"
          >
            {pastTime}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontWeight={600}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            maxWidth={"80%"}
            sx={{ color: "black" }}
            variant="body2"
          >
            {content}
          </Typography>
          {
            !isRead &&
            <Badge color="info" badgeContent=" " variant="dot"></Badge>
          }
        </Stack>
      </Stack>
    </div>
  )
}

export default NoteSearchItemComponent