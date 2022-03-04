import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Avatar, Container, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { tribeService } from '../../services/tribeService'; 
import { squadService } from '../../services/squadService'; 
import { wyzebotService } from '../../services/wyzebotService'; 
import { useParams, useHistory, useLocation } from 'react-router';
import { Stepper, Step, StepLabel, Backdrop, CircularProgress, Grid, Paper, Chip, Alert, Stack, Typography, Snackbar, AlertTitle, AlertColor } from '@mui/material';
import { styled } from '@mui/material/styles';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import EnhancedTable from "../table/EnhancedTable";

const steps = ['Tribe Name', 'Select Squads', 'Complete'];

const TribeForm = (props: any) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const nameRef = useRef<any>(null);
  const [selected, setSelected] = React.useState([]);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = useState("");
  const [selectedError, setSelectedError] = useState("");

  const { id }:any = useParams();
  const [open, setOpen] = useState(false);
  const [squads, setSquads] = useState<any>(null);
  const [tribe, setTribe] = useState<any>(null);

  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const moduleName = route[0].toUpperCase() + route.slice(1, route.length - 1);
  
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alert, setAlert] = useState<any>();
  const [state, setState] = useState<AlertColor | undefined>("success");

  const handleStep0 = () => {

    if( activeStep === 0 && nameRef.current.value === "" || nameRef.current.value === undefined) {
      setNameError("Name is a required field"); return;
    } else setName(nameRef.current.value);

    setActiveStep(1); 
  };  
  
  const handleStep1 = () => {

    if( activeStep === 1 && selected ) {
      if( selected.length < 1 ) { setSelectedError("You have not selected any Squad"); return; }
      else if( selected.length > 3 ) { setSelectedError("You have selected more than 3 Squad"); return; }
    }

    setActiveStep(2); 
  };

  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

  const history = useHistory();

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };

  const handleCloseSnackbar = () => { setOpenSnackBar(false); };
  const handleClick = () => { setOpenSnackBar(true); };
  function createData( id: string, name: string, wyzebots: string, tribe: string ) {
    return { id, name, wyzebots, tribe, };
  }

  const delay = 5000;
  const setAlertBody = ( state: AlertColor ) => { 
    const stateMessage = state === "success" ? "Success" : "Error";
    const action = (id === "create") ? "Created" : "Updated";
    setState(state);
    const message = state === "success" ? 
    (<>You have successfully — <strong>{action} a {moduleName}!</strong></>) : 
    (<>You have Unsuccessfully — <strong>{action} a {moduleName}</strong>. Please check your Network Connection.</>);

    const alert = (<> <AlertTitle>{stateMessage}</AlertTitle> {message} </>);
    setAlert(alert); handleClose(); handleClick(); setTimeout(() => history.push(`/${route}`), delay);
  }

  const headCells = [ 
    { id: 'id', numeric: false, disablePadding: false, label: 'ID', },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
    { id: 'wyzebots', numeric: false, disablePadding: false, label: 'Wyzebots', },
    { id: 'tribe', numeric: false, disablePadding: false, label: 'Tribe', },
  ];

  const create = () => {
        
    handleToggle();
    let data = { name: name, squads: selected };

    if( id === "create" ){
      tribeService.create(data)
      .then((response:any) => { handleClose(); setAlertBody("success"); })
      .catch((error:any) => { handleClose(); setAlertBody("error"); console.log(error);})
    } 
    else {
      tribeService.update(id, data)
      .then( response => { handleClose(); setAlertBody("success"); })
      .catch( error => { handleClose(); setAlertBody("error"); console.log(error);} );
    }
  }

  const deleteSelected = () => { }    

  useEffect( () => {

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

          return createData( el.id, el.name, names.toString(), tribe);
        });
        setSquads(squads);              
    })
    .catch( (error:any) => {  });

    if( id !== "create" ) {

      handleToggle();

      tribeService.getById(id)
      .then( response => { 
        setSelected(response.squads); setTribe(response); setName(response.name);
        
        handleClose();
      })    
      .catch( error => { handleClose();  console.log(error); } );
    }

  },[]);

  return (
    <>
      <form {...props} >           
        <Card>
          <CardHeader subheader={ id === "create" ? `Create ${moduleName}` : `Update ${moduleName}` } title={moduleName} />
          <Divider />
          <CardContent>
            
          <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}> 
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: { optional?: React.ReactNode; } = {};
                  
                  return (
                    <Step key={label} {...stepProps}> <StepLabel {...labelProps}>{label}</StepLabel> </Step>
                  );
                })}
              </Stepper>

              { activeStep === 0 && (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1} - Enter Tribe Name</Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    { ( id === "create" && name === "" ) &&
                      (<TextField onClick={() => setNameError("")} fullWidth label="Name" margin="normal" name="name" type="text" 
                        variant="outlined" helperText={nameError ? nameError : ""}
                        error={nameError ? true : false}  inputRef={value => (nameRef.current = value) }  
                      /> ) 
                    }

                    { ( name && name !== "" ) && 
                      (<TextField onClick={() => setNameError("")} fullWidth label="Name" margin="normal" name="name" type="text" 
                        variant="outlined" helperText={nameError ? nameError : ""} defaultValue={name}
                        error={nameError ? true : false}  inputRef={value => (nameRef.current = value) }  
                      />)                      
                    }                   
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button onClick={() => handleStep0()}> {activeStep === steps.length - 1 ? 'Finish' : 'Next'} </Button>
                  </Box>
                </React.Fragment>
              )}
              
              { activeStep === 1 && (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1} - Select Minimum of 1 or Maximum of 3 Squads </Typography>

                  <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Container maxWidth={false}>
                      { selectedError !== "" && (<Alert severity="error"> {selectedError} </Alert> )}                   
                      
                      <Box sx={{ pt: 3 }}>
                          <EnhancedTable selected={selected} setSelected={setSelected} rows={squads}
                          deleteSelected={deleteSelected} headCells={headCells} module="tribes" checkbox={true} />
                      </Box>
                    </Container>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }} >
                      Back
                    </Button>
                    <Button onClick={() => handleStep1()}> Next </Button>
                  </Box>
                </React.Fragment>
              )}
              
              {activeStep === steps.length - 1 && (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}> All steps completed - Click Complete to Submit </Typography>
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }} >
                      Back
                    </Button>
                    <Button onClick={() => create()}> Complete </Button>
                </React.Fragment>
              )} 

            </Box>
          </CardContent>
        </Card>
      </form>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
        <CircularProgress color="inherit" />
      </Backdrop>    

      <Snackbar open={openSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={delay} onClose={handleCloseSnackbar}>
        <Alert variant="filled" onClose={() => handleCloseSnackbar()} severity={state} sx={{ width: '100%' }}> {alert} </Alert>
      </Snackbar>
    </>
  );
};

export default TribeForm;
