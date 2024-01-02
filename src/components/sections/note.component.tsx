import { Button, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import NoteCreateComponent from './note-create.component';
import NoteEditComponent from './note-edit.component';
import NoteSearchItemComponent from './note-search-item.component';
import CreateIcon from '@mui/icons-material/Create'
import { collection, type DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebaseClient'
import { collectionName, deleteNote, getNote, getNotes, saveNote, updateNote } from '~src/firebase/firebaseApi';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const NoteComponent = () => {

  const [selId, setSelId] = useState('');
  const [selTitle, setSelTitle] = useState("");
  const [selContent, setSelContent] = useState("");
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("createdDate", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach( async (doc) => {
        const docItem = { ...doc.data()};
        // const prevItem = dataList.find(item => item.id === doc.id);
        // console.log("docItem", docItem);
        // console.log("prevItem", prevItem);
        // if(prevItem && (prevItem.title !== docItem.title || prevItem.content !== docItem.content)) {
        //   docItem.createdDate = new Date();
        //   await updateNote(doc.id, {...docItem});
        // }
        docs.push({ ...docItem, id: doc.id });
      });
      setDataList(docs);
    });
    // const unsubscribe1 = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach(async (change) => {
    //     if (change.type === "modified") {
    //       await updateNote(selId, { ...change.doc.data(), createdDate: new Date() });
    //     }
    //   });
    // });
  }, [selId]);

  const filteredDataList = useMemo(() => {
    return dataList.filter(item => {
      return item.title.indexOf(search) >= 0 || item.content.indexOf(search) >= 0 || search === "";
    })
  }, [search, dataList])


  const handleSearchItemClick = async (id: string) => {
    const selItem = dataList.find((item) => item.id === id);
    await updateNote(id, { title: selItem.title, content: selItem.content, isRead: true, createdDate: selItem.createdDate });
    setSelId(id);
    setSelTitle(selItem.title);
    setSelContent(selItem.content);
  }

  const handleSaveNoteClick = async () => {
    const today = new Date();
    if (!selId) {
      const newNote = await saveNote({ title: selTitle, content: selContent, isRead: false, createdDate: today });
      console.log("newNotem", newNote);
      setSelId(newNote.id);
    } else {
      await updateNote(selId, { title: selTitle, content: selContent, isRead: true, createdDate: today });
    }
    setIsEditing(false);
  }

  const handleDeleteClick = async () => {
    await deleteNote(selId);
    setSelId('');
    setSelTitle('');
    setSelContent('');
  }

  return (
    <Stack direction="row" spacing={2} padding={1} gap={1} height={"750px"} sx={{ background: "#F4F6F8", borderRadius: 2 }}>
      <List sx={{ width: "200px", padding: "16px 12px", gap: 4 }}>
        <ListItem>
          <ListItemText
            sx={{ height: 22, alignSelf: "stretch" }}
            primary="All"
          ></ListItemText>
        </ListItem>
      </List>
      <Stack direction={"column"} padding={2} gap={4} sx={{ borderRadius: 2, background: "#FFF" }}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        ></TextField>
        <List sx={{ height: "100%", width: "400px" }}>
          {
            filteredDataList.map((item) => (
              <NoteSearchItemComponent
                id={item.id}
                title={item.title}
                content={item.content}
                isRead={item.isRead}
                createdDate={item.createdDate}
                isClick={selId === item.id}
                handleClick={handleSearchItemClick}
              />
            ))
          }
        </List>
        <Button
          variant="contained"
          startIcon={<CreateIcon />}
          sx={{ width: "100%", background: "#212B36" }}
          onClick={() => {
            setSelId('');
            setSelTitle('');
            setSelContent('');
          }}
        >
          Create a Note
        </Button>
      </Stack>
      {
        selId === '' ?
          <NoteCreateComponent id={selId} title={selTitle} content={selContent} setTitle={setSelTitle} setContent={setSelContent} handleCreateNoteClick={handleSaveNoteClick}></NoteCreateComponent>
          :
          <NoteEditComponent
            id={selId}
            title={selTitle}
            content={selContent}
            setTitle={setSelTitle}
            setContent={setSelContent}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSaveNoteClick={handleSaveNoteClick}
            handleDeleteClick={handleDeleteClick}>
          </NoteEditComponent>
      }
    </Stack>
  )
}

export default NoteComponent