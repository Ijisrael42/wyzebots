import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SquadToolbar from '../../components/squad/SquadToolbar';
import EnhancedTable from '../../components/table/EnhancedTable';
import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { Backdrop, CircularProgress, AlertColor, AlertTitle, Alert, Snackbar } from '@mui/material';
import { squadService } from '../../services/squadService'; 
import { wyzebotService } from '../../services/wyzebotService'; 

const SquadList: React.FC<any> = () => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = React.useState([]);
    const [ squads, setSquads ] = useState([]);
    const navigate = useNavigate();
    const handleToggle = () => { setOpen(!open); }; 

    function createData( id: string, name: string, wyzebots: string, tribe: string ) {
        return { id, name, wyzebots, tribe, };
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

        squadService.deletemany(selected)
        .then( response => { handleClose(); setAlertBody("success");  })
        .catch( error => { handleClose(); setAlertBody("error");  } );
    }    
          
    const headCells = [ 
        { id: 'id', numeric: false, disablePadding: false, label: 'ID', },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
        { id: 'wyzebots', numeric: false, disablePadding: false, label: 'Wyzebots', },
        { id: 'tribe', numeric: false, disablePadding: false, label: 'Tribe', },
    ];
  
    useEffect( () => { 
        handleToggle();
        squadService.getAll()
        .then( async (response:any) => { 
            const wyzebots = await wyzebotService.getAll();
            const wyzebotNames: any[] = [];

            wyzebots.forEach( (wyzebot:any) => { wyzebotNames[wyzebot.id] = wyzebot.name; })

            const squads = response.map( (el:any) => {
                let tribe = el.tribe_name ? el.tribe_name : "N/A";
                let names = [];
                let squadWyzebots = el.wyzebots;

                for( var i = 0; i < squadWyzebots.length; i++ ) names.push(wyzebotNames[squadWyzebots[i]]);
                let nameStr = names.length > 0 ? names.toString() : "N/A";

                return createData( el.id, el.name, nameStr, tribe);
            });
            setSquads(squads);    
            handleClose();         
        })
        .catch( (error:any) => { console.log(error);});

      },[]);

    return (
        <>
            <Helmet> <title>Squad Table | WYZETALK</title> </Helmet>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={false}>
                    <SquadToolbar module="squads" />
                    <Box sx={{ pt: 3 }}>
                        <EnhancedTable selected={selected} setSelected={setSelected} rows={squads} toolBarBtn={true}
                        deleteSelected={deleteSelected} headCells={headCells} module="squads" checkbox={true} />
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

export default SquadList;