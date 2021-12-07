import { useContext, useState } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expandActive, setExpandActive] = useState(false);
    const [list, setList] = useState([]);
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentLists(id);
        }
    }

   async function handleExpand(event, id) {
        event.stopPropagation();
        setList(await store.setCurrentList(id));
        toggleExpand();
    }

    function toggleExpand() {
        let newActive = !expandActive;
        if (!newActive)
            store.closeCurrentList();
        setExpandActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let G = 
        <Box sx={{ p: 1 }}>
            <IconButton style={{ right: '-5650%'}} onClick={(event) => {
                handleDeleteList(event, idNamePair._id)
            }} aria-label='delete'>
                <DeleteIcon style={{fontSize:'18pt', position: 'absolute', top: '-1050%'}} />
            </IconButton>
        </Box>

    let H = 
        <Box sx={{ p: 0 }}>
            <IconButton style={{ width: '100%', alignSelf: 'flex-end' }} disabled={store.currentList} onClick={(event) => {
                handleDeleteList(event, idNamePair._id)
            }} aria-label='delete'>
                <DeleteIcon style={{fontSize:'18pt', position: 'absolute', top: '-100%'}} />
            </IconButton>
        </Box>

    let published = 
        <Box sx={{ p: 0 }}>
            <IconButton disabled={store.currentList} style={{ position: 'absolute', left: '0%', bottom: '0%', fontSize: '12pt'}} onClick={(event) => {handleLoadList(event, idNamePair._id)}} aria-label='edit'>
                <EditIcon style={{fontSize:'12pt', float: 'left'}} />
                Edit
            </IconButton>
        </Box>
    if (idNamePair['published']){
        if(idNamePair['owner'] !== auth.user.email){
            H = "";
            G = "";
        }
        published = 
        <Box style={{ position: 'absolute', left: '1%', bottom: '0%', fontSize: '12pt'}}>{"published:" + idNamePair['published'] + " By:" + idNamePair['owner']}</Box>;
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1, minHeight: '72px' }}
            style={{
                fontSize: '16pt',
                width: '100%',
                height: '15%',
                borderRadius: '20px',
                backgroundColor: 'lightBlue'
            }}
        >
                <Box sx={{ p: 0, alignSelf:'flex-start', flex: 1 }}>{idNamePair.name}</Box>
                {published}
                {H}
                <Box sx={{ p: 0 }}>
                    <IconButton style={{ width: '100%', alignSelf: 'flex-end', left: '-100%' }} disabled={store.currentList} onClick={(event) => {
                        handleExpand(event, idNamePair._id)
                    }} aria-label='expand'>
                        <DownIcon style={{fontSize:'18pt', position: 'absolute', top: '110%'}} />
                    </IconButton>
                </Box>
        </ListItem>
    if (expandActive && store.currentList) {
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1, minHeight: '384px' }}
            style={{
                fontSize: '16pt',
                width: '100%',
                height: '15%',
                borderRadius: '20px',
                backgroundColor: 'lightBlue'
            }}
        >
                <Box sx={{ p: 0 , position: 'absolute', left: '1%', top: '5%' }}>{idNamePair.name}</Box>
                {published}
                <Box sx={{ p: 0 , position: 'absolute', left: '1%', top: '15%', color: 'black', backgroundColor:'lightGreen', height: '75%', width: '50%', borderRadius: '20px' }}>
                    <div id="edit-numbering">
                        <div className="item-number"><Typography variant="h4">1.</Typography></div>
                        <div className="item-number"><Typography variant="h4">2.</Typography></div>
                        <div className="item-number"><Typography variant="h4">3.</Typography></div>
                        <div className="item-number"><Typography variant="h4">4.</Typography></div>
                        <div className="item-number"><Typography variant="h4">5.</Typography></div>
                    </div>
                    <List id="edit-items" sx={{ p: 0, borderRadius: '20px', color: 'black', width: '100%', height: '20%', bgcolor: 'background.paper' }}>
                        {
                            list.map((item) => (
                                <div className="item-number" ><Typography variant="h4" style={{width:'100%', align:'left'}}>{item}</Typography></div>
                            ))
                        }
                    </List>
                </Box>
                {G}
                <Box sx={{ p: 1 }}>
                    <IconButton style={{ right: '-5450%'}} onClick={(event) => {
                        handleExpand(event, idNamePair._id)
                    }} aria-label='shrink'>
                        <UpIcon style={{fontSize:'18pt', position: 'absolute', top: '1050%'}} />
                    </IconButton>
                </Box>
        </ListItem>

    }
    // else if(open){
    //     cardElement=<Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //     className="modal.is-visible"
    //     data-backdrop="false"
    //     >
    //     <Box> 
    //         <Typography id="modal-modal-title" variant="h6" component="h2">
    //         Text in a modal
    //         </Typography>
    //         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //         </Typography>
    //     </Box>
    // </Modal>
    // }
    return (
        cardElement
    );
}

export default ListCard;