import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    function handleClick(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("item-".length);
            if(text !== "")
                store.updateItem(id-1, text);
            toggleEdit();
            store.setCurrentList(store.currentList);
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
        store.setCurrentList(store.currentList);
    }

    let { index } = props;

    let itemClass = "top5-item";

    if (editActive) {
        let cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                label="Top 5 Item Name"
                id={'item-' + (index+1)}
                name="name"
                autoComplete="Top 5 Item Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={props.text}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
        return cardElement
    }

    return (
            <ListItem
                id={'item-' + (index+1)}
                key={props.key}
                className={itemClass}
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton disabled={store.isEditActive} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}}  onClick={(event) => {
                        handleClick(event)
                    }}/>
                </IconButton>
            </Box>
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
            </ListItem>
    )
}

export default Top5Item;