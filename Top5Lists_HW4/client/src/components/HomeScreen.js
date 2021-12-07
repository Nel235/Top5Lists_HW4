import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import FunctionIcon from '@mui/icons-material/Functions';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [markedList, setMarkedList] = useState("");
    const [home, setHome] = useState(false);
    const [people, setPeople] = useState(false);
    const [person, setPerson] = useState(false);
    const [community, setCommunity] = useState(false);

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

    function handleHome(event){
        event.stopPropagation();
        setHome(true);
        setPeople(false);
        setPerson(false);
        setCommunity(false);
    }
    function handlePeople(event){
        event.stopPropagation();
        setHome(false);
        setPeople(true);
        setPerson(false);
        setCommunity(false);
    }
    function handlePerson(event){
        event.stopPropagation();
        setHome(false);
        setPeople(false);
        setPerson(true);
        setCommunity(false);
    }
    function handleCommunity(event){
        event.stopPropagation();
        setHome(false);
        setPeople(false);
        setPerson(false);
        setCommunity(true);
    }

    function openModal() {
        setOpen(true);
    }

    let selectedHome = "secondary";
    let selectedPerson = "secondary";
    let selectedPeople = "secondary";
    let selectedCommunity = "secondary";
    if (home)
        selectedHome = "primary";
    if (person)
        selectedPerson = "primary";
    if(people)
        selectedPeople = "primary";
    if(community)
        selectedCommunity = "primary";

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
        let ownPairs = [];
        let otherPairs = [];
        for( let pair of store.idNamePairs ){
            if(pair['owner']==auth.user.email){
                ownPairs.push(pair);
            }
            else
                otherPairs.push(pair);
        }
        let pairs = [];
        if (home)
            pairs = ownPairs;
        else if(person||people)
            pairs = otherPairs;
        listCard = 
            <List sx={{ width: '90%', left: '5%', fillOpacity: '1', zIndex: '-.05' }}>
            {
                pairs.map((pair) => (
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
        <div id="top5-list-selector" >
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
                <Typography variant="h3">Your Lists</Typography>
            </div>

            <div id="home-screen-tabs">
                <Fab 
                    color={selectedHome}
                    aria-label="home"
                    id="add-list-button"
                    onClick={handleHome}
                >
                    <HomeIcon />
                </Fab>
                <Fab 
                    color={selectedPeople}
                    aria-label="people"
                    id="add-list-button"
                    onClick={handlePeople}
                >
                    <PeopleIcon />
                </Fab>
                <Fab 
                    color={selectedPerson}
                    aria-label="person"
                    id="add-list-button"
                    onClick={handlePerson}
                >
                    <PersonIcon />
                </Fab>
                <Fab 
                    color={selectedCommunity} 
                    aria-label="community"
                    id="add-list-button"
                    onClick={handleCommunity}
                >
                    <FunctionIcon />
                </Fab>
            </div>

            <div id="list-selector-list" style={{height: '75%'}}>
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