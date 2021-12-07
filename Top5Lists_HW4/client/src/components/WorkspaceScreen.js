import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import AuthContext from '../auth';
import { Typography, TextField, Box, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState(store.currentList.name);

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function handleClose(){
        store.closeCurrentList();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsEditActive();
        }
        setEditActive(newActive);
    }

    async function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            if(text !== "")
                store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
        store.setCurrentList(store.currentList);
    }

    let editItems = "";
    if (store.currentList&&auth.user&&auth.user.email==store.currentList.ownerEmail) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    let cardElement = 
        <div width='100%' >
            <Box sx={{ p: 0, fontSize: '48px', position: 'absolute', left: '10%' }}>{text}</Box>
            <Box sx={{ p: 1 }}>
                <IconButton disabled={store.IsEditActive} style={{position: 'absolute', left: '0%', top: '0%', fontSize: '24pt'}} onClick={(event) => {handleToggleEdit(event)}} aria-label='edit'>
                    <EditIcon style={{fontSize:'12pt', float: 'left'}} />
                    Edit
                </IconButton>
            </Box>
            <Button onClick={handleClose} sx={{p: 0, fontSize:'24px', position:'absolute', color: 'black', width: '10%', left: '85%', backgroundColor: 'whitesmoke'}}>
                Save
            </Button>
            </div>;
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + store.currentList._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={text}
                inputProps={{style: {fontSize: 24}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    
    return (
        <div id="top5-workspace">
            
            <div id="workspace-edit">
                {cardElement}
                <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography variant="h3">5.</Typography></div>
                </div>
                {editItems}
            </div>
        </div>
    )
}

export default WorkspaceScreen;