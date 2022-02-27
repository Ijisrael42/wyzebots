import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import WyzebotToolbar from '../../components/wyzebot/WyzebotToolbar';
import EnhancedTable from '../../components/table/EnhancedTable';
import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { Backdrop, CircularProgress, Avatar, AlertColor, AlertTitle, Alert, Snackbar } from '@mui/material';
import { wyzebotService } from '../../services/wyzebotService'; 

const WyzebotList: React.FC<any> = () => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = React.useState([]);
    const [ wyzebots, setWyzebots ] = useState([]);
    const navigate = useNavigate();
    const handleToggle = () => { setOpen(!open); };
    
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

    function createData( image: any, id: string, name: string, power: string, squad: string, ) {
        return { image, id, name, power, squad, };
    }

    const deleteSelected = () => {
        handleToggle();

        wyzebotService.deletemany(selected)
        .then( response => { handleClose(); setAlertBody("success");  })
        .catch( error => { handleClose(); setAlertBody("error");  } );
    }
          
    const headCells = [ 
        { id: 'image', numeric: false, disablePadding: false, label: 'Image', },
        { id: 'id', numeric: false, disablePadding: false, label: 'ID', },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
        { id: 'power', numeric: false, disablePadding: false, label: 'Power', },
        { id: 'squad', numeric: false, disablePadding: false, label: 'Squad', },
    ];
  
    useEffect( () => { 
        handleToggle();
        wyzebotService.getAll()
        .then( (response:any) => {  

            const wyzebots = response.map( (el:any) => {
                let image = (<Avatar sx={{ ml: 2 }} alt={el.name} src={el.image_url} />);
                let squad = el.squad_name ? el.squad_name : "N/A";

                return createData( image, el.id, el.name, el.power.toString(), squad);
            });
            setWyzebots(wyzebots);     
            handleClose();        
        })
        .catch( (error:any) => { console.log(error);});

      },[]);

    return (
        <>
            <Helmet> <title>Wyzebot Table | WYZETALK</title> </Helmet>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={false}>
                    <WyzebotToolbar module="wyzebots" />
                    <Box sx={{ pt: 3 }}>
                        <EnhancedTable selected={selected} setSelected={setSelected} rows={wyzebots} toolBarBtn={true}
                        deleteSelected={deleteSelected} headCells={headCells} module="wyzebots" checkbox={true} />
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

export default WyzebotList;