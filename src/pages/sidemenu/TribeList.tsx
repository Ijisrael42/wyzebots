import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TribeToolbar from '../../components/tribe/TribeToolbar';
import EnhancedTable from '../../components/table/EnhancedTable';
import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { Backdrop, CircularProgress, AlertColor, AlertTitle, Alert, Snackbar } from '@mui/material';
import { tribeService } from '../../services/tribeService'; 
import { squadService } from '../../services/squadService'; 
import { config } from "../../helpers/config";

interface Data { calories: number; carbs: number; fat: number; name: string; protein: number; }

const TribeList: React.FC<any> = () => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = React.useState([]);
    const [ tribes, setTribes ] = useState([]);
    const navigate = useNavigate();
    const handleToggle = () => { setOpen(!open); }; 

    function createData( id: string, name: string, squads: string) {
        return { id, name, squads };
    }

    const location = useLocation();
    const route = location.pathname.split("/")[1];
    const moduleName = route[0].toUpperCase() + route.slice(1, route.length - 1);
    const [state, setState] = useState<AlertColor | undefined>("success");
    const [alert, setAlert] = useState<any>();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const handleCloseSnackbar = () => { setOpenSnackBar(false); };

    const handleClose = () => { setOpen(false); };
    const handleClick = () => { setOpenSnackBar(true); };

    const delay = 5000;
    const setAlertBody = ( state: AlertColor ) => { 
        const stateMessage = state === "success" ? "Success" : "Error";

        setState(state);
        const message = state === "success" ? 
        (<>You have successfully — <strong>Deleted a {moduleName}!</strong></>) : 
        (<>You have Unsuccessfully — <strong>Deleted a {moduleName}</strong>. Please check your Network Connection.</>);

        const alert = (<> <AlertTitle>{stateMessage}</AlertTitle> {message} </>);
        setAlert(alert); handleClose(); handleClick(); setTimeout(() => navigate(0), delay);
    }

    const deleteSelected = () => {
        handleToggle();

        tribeService.deletemany(selected)
        .then( response => { handleClose(); setAlertBody("success");  })
        .catch( error => { handleClose(); setAlertBody("error");  } );
    }    
          
    const headCells = [ 
        { id: 'id', numeric: false, disablePadding: false, label: 'ID', },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
        { id: 'squads', numeric: false, disablePadding: false, label: 'Squads', },
    ];
  
    useEffect( () => { 
        handleToggle();
        tribeService.getAll()
        .then( async (response:any) => { 
            const squads = await squadService.getAll();
            const squadNames: any[] = [];

            squads.forEach( (squad:any) => { squadNames[squad.id] = squad.name; })

            const tribes = response.map( (el:any) => {
                let names = [];
                let tribeSquads = el.squads;

                for( var i = 0; i < tribeSquads.length; i++ ) names.push(squadNames[tribeSquads[i]]);
                let nameStr = names.length > 0 ? names.toString() : "N/A";

                return createData( el.id, el.name, nameStr);
            });
            setTribes(tribes);    
            handleClose();         
        })
        .catch( (error:any) => { console.log(error);});

      },[]);

    return (
        <>
            <Helmet> <title>Tribe Table | WYZETALK</title> </Helmet>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={false}>
                    <TribeToolbar module="tribes" />
                    <Box sx={{ pt: 3 }}>
                        <EnhancedTable selected={selected} setSelected={setSelected} rows={tribes} toolBarBtn={true}
                        deleteSelected={deleteSelected} headCells={headCells} module="tribes" checkbox={true} />
                    </Box>
                </Container>
            </Box>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
                <CircularProgress color="inherit" />
            </Backdrop>    

            <Snackbar open={openSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={delay} onClose={handleCloseSnackbar}>
                <Alert variant="filled" onClose={() => handleCloseSnackbar()} severity={state} sx={{ width: '100%' }}> {alert} </Alert>
            </Snackbar>   
        </>
    );
}

export default TribeList;