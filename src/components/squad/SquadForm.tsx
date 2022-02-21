import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { squadService } from '../../services/squadService'; 
import { useParams, useNavigate, useLocation } from 'react-router';
import { Stepper, Step, StepLabel, Backdrop, CircularProgress, Grid, Paper, Chip, Alert, Stack, Typography, Snackbar, AlertTitle, AlertColor } from '@mui/material';
import { styled } from '@mui/material/styles';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { fileService } from "../../services/fileService";

interface ChipData { key: number; label: string; }
const ListItem = styled('li')((props: any) => ({ margin: props.theme.spacing(0.5), }));
const Input = styled('input')({ display: 'none', });

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const SquadForm = (props: any) => {


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => { return step === 1; };
  const isStepSkipped = (step: number) => { return skipped.has(step); };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1); setSkipped(newSkipped);
  };

  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values()); newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => { setActiveStep(0); };



  const navigate = useNavigate();
  const { id }:any = useParams();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [squad, setSquad] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const options = [ "Enabled", "Disabled" ];
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const moduleName = route[0].toUpperCase() + route.slice(1, route.length - 1);
  
  const powerRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const fileRef = useRef<any>(null);
  const [file, setFile] = useState<any>(null);
  const [fileID, setFileID] = useState<any>(null);
  const [fileError, setFileError] = useState<any>(null);
  const [powerError, setPowerError] = useState<any>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alert, setAlert] = useState<any>();
  const [state, setState] = useState<AlertColor | undefined>("success");

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const [chipData, setChipData] = React.useState< ChipData[]>([]);
  const uploadBtn = async () => { 

    try{ 
      if(fileID && fileID !== "") {
        let response =  await fileService.deleteFile(fileID); console.log(response); 
      } 
    } catch (error) {  console.log(error);  }

    fileRef.current.click(); setFile(null); setFileError(""); 
  }
  const handleClick = () => { setOpenSnackBar(true); };
  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleCloseSnackbar = () => { setOpenSnackBar(false); };

  const delay = 5000;
  const setAlertBody = ( state: AlertColor ) => { 
    const stateMessage = state === "success" ? "Success" : "Error";
    const action = (id === "create") ? "Created" : "Updated";
    setState(state);
    const message = state === "success" ? 
    (<>You have successfully — <strong>{action} a {moduleName}!</strong></>) : 
    (<>You have Unsuccessfully — <strong>{action} a {moduleName}</strong>. Please check your Network Connection.</>);

    const alert = (<> <AlertTitle>{stateMessage}</AlertTitle> {message} </>);
    setAlert(alert); handleClose(); handleClick(); setTimeout(() => navigate(`/${route}`), delay);
  }

  const handleAdd = () => {

    if( powerRef.current!.value !== '' ) {
      let power: ChipData = { key: chipData.length, label: powerRef.current!.value };
      powerRef.current!.value = "";
      setChipData([...chipData, power ]);
    } else setPowerError("Please type power here");
  };

  const create = () => {
    
    var name = "", power: any[] = [], isValid = true;

    if(nameRef.current.value === "" || nameRef.current.value === undefined) {
      setError("Name is a required field"); 
      isValid = false;
    } else name = nameRef.current.value;

    if( chipData.length < 1 ) isValid = false;
    else power = chipData.map( ( chip: ChipData) => chip.label);

    if(!file) { setFileError("Please choose a file"); isValid = false; }  
    
    if(!isValid) return;
    
    handleToggle();
    setIsDisabled(true);
    let data = { name: name, power: power, image: file.name, file_id: fileID };

    if( id === "create" ){
      squadService.create(data)
      .then((response:any) => { handleClose(); setAlertBody("success"); })
      .catch((error:any) => { handleClose(); setAlertBody("error"); console.log(error);})
    } 
    else {
      squadService.update(id, data)
      .then( response => { handleClose(); setAlertBody("success"); })
      .catch( error => { handleClose(); setAlertBody("error"); console.log(error);} );
    }

  }

  const getFile = (e:any) => {
    let file = e.target.files[0];
    const filetype = ['png', 'jpg', 'jpeg']; // 'doc', 'docx', 'pdf',
    const fileExtension = file.name.split('.').pop();
  
    if( filetype.indexOf(fileExtension) === -1) return; 
    else return file;
  };

  const fileServiceUpload = async (file:any) => {

    let formData = new FormData();
    formData.append("file", file);

    try{
      let response = await fileService.upload(formData);
      console.log(response);
      setFileID(response.file_id);
      return response;
    } catch (error) {  return error;  }
  };

  const fileUpload = (e:any) => {
    const filetype = ['png', 'jpg', 'jpeg']; // 'doc', 'docx', 'pdf',

    if( !e.target.files[0] ) return;
    const file = getFile(e);
    if( !file ) { setFileError(`Incompatible. Please use ${filetype.toString()}`); return; }

    const fileSize = Math.round((file.size / (1024 * 1024) )); // in Kb => 1024 bytes, Mb => 1024 * 1024 bytes
    
    if( fileSize > 10 ) { 
      let docFile = document.getElementById(id) as HTMLFormElement;
      docFile.value = "";
      setFileError("File is too large."); return;
    }

    setFile(file); fileServiceUpload(file);
  };

  useEffect( () => {

    if( id !== "create" ) {

      handleToggle();

      squadService.getById(id)
      .then( response => { 
        setSquad(response);  setOpen(false); 
        setFile({ name: response.image });
        setFileID(response.file_id);
        nameRef.current.value = response.name;
        
        let temp: ChipData[] = [];
        response.power.forEach((el:string, index: number) => temp.push({label: el, key: index}));

        setChipData([...temp]);
      })    
      .catch( error => console.log(error) );
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
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
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

export default SquadForm;
