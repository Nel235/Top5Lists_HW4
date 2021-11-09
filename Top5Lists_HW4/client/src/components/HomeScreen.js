import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [markedList, setMarkedList] = useState("");

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    async function handleClose(event) {
        setOpen(false);
        store.closeCurrentList();
        setMarkedList("");
    }

    function handleCreateNewList() {
        store.createNewList();
    }
    async function handleDeleteList() {
        store.deleteList(store.listMarkedForDeletion);
        store.closeCurrentList();
        setOpen(false);
        setMarkedList("");
    }

    function openModal() {
        setOpen(true);
    }
    if(!editing&&(store.isListNameEditActive||store.isItemEditActive)){
        setEditing(true);
    }
    if(editing&&!(store.isListNameEditActive||store.isItemEditActive)){
        setEditing(false);
    }
    let listCard = "";
    if(store.listMarkedForDeletion && !open){
        setMarkedList(store.listMarkedForDeletion.name);
        openModal();
    }
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled={editing}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}> 
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete {markedList}?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    You will not be able to recover this list.
                    </Typography>
                    <Button id="list-card-button" onClick={handleDeleteList}>Confirm</Button>
                    <Button id="list-card-button" onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>
        </div>)
}

export default HomeScreen;