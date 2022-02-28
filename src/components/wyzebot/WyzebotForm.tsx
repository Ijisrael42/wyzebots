import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { wyzebotService } from '../../services/wyzebotService'; 
import { useParams, useNavigate, useLocation } from 'react-router';
import { Backdrop, CircularProgress, Grid, Paper, Chip, Alert, Stack, Typography, Snackbar, AlertTitle, AlertColor } from '@mui/material';
import { styled } from '@mui/material/styles';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { fileService } from "../../services/fileService";

interface ChipData { key: number; label: string; }
const ListItem = styled('li')((props: any) => ({ margin: props.theme.spacing(0.5), }));
const Input = styled('input')({ display: 'none', });

const WyzebotForm = (props: any) => {
  const navigate = useNavigate();
  const { id }:any = useParams();
  const [error, setError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [open, setOpen] = useState(false);
  const [wyzebot, setWyzebot] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const options = [ "Enabled", "Disabled" ];
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const moduleName = route[0].toUpperCase() + route.slice(1, route.length - 1);
  const [powerError, setPowerError] = useState<any>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alert, setAlert] = useState<any>();
  const [state, setState] = useState<AlertColor | undefined>("success");
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const powerRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const imageUrlRef = useRef<any>(null);

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const [chipData, setChipData] = React.useState< ChipData[]>([]);

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
    setAlert(alert); handleClose(); handleClick(); 
    setTimeout(() => { 
      if( state === "success" ) navigate(`/${route}`); 
    }, delay);
  }

  const handleAdd = () => {

    if( powerRef.current!.value !== '' ) {
      let power: ChipData = { key: chipData.length, label: powerRef.current!.value };
      powerRef.current!.value = "";
      setChipData([...chipData, power ]);
    } else setPowerError("Please type power here");
  };

  const errorFn = (error: any) => {
    if( error === "Name is already taken" ) setError(error);
    else { setAlertBody("error"); console.log(error); }

    handleClose(); setIsDisabled(false);
  }

  const create = () => {
    
    var name = "", imageUrl = "", power: any[] = [], isValid = true;

    if(nameRef.current.value === "" || nameRef.current.value === undefined) {
      setError("Name is a required field"); 
      isValid = false;
    } else name = nameRef.current.value;

    if(imageUrlRef.current.value === "" || imageUrlRef.current.value === undefined) {
      setImageUrlError("Image Url is a required field"); 
      isValid = false;
    } else imageUrl = imageUrlRef.current.value;

    if( chipData.length < 1 ) isValid = false;
    else power = chipData.map( ( chip: ChipData) => chip.label);
    
    if(!isValid) return;
    
    handleToggle();
    setIsDisabled(true);
    let data = { name: name, power: power, image_url: imageUrl };

    if( id === "create" ){
      wyzebotService.create(data)
      .then((response:any) => { handleClose(); setAlertBody("success"); })
      .catch((error:any) => errorFn(error) );
    } 
    else {
      wyzebotService.update(id, data)
      .then( response => { handleClose(); setAlertBody("success"); })
      .catch((error:any) => errorFn(error) );
    }

  }

  useEffect( () => {

    if( id !== "create" ) {

      handleToggle();

      wyzebotService.getById(id)
      .then( response => { 
        setWyzebot(response);  setOpen(false);  setName(response.name); setImageUrl(response.image_url);

        let temp: ChipData[] = [];
        response.power.forEach((el:string, index: number) => temp.push({label: el, key: index}));

        setChipData([...temp]);
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
            
            <Grid container spacing={2}>

              <Grid item xs={12} md={6}>
                { ( id === "create" && name === "" ) && 
                  (<TextField onClick={() => setError("")} fullWidth label="Name" margin="normal" name="name"
                    helperText={error ? error : ""} placeholder="Enter Name"
                    error={error ? true : false} type="text" variant="outlined" inputRef={value => (nameRef.current = value) } 
                  />) 
                }
                
                { ( name && name !== "") && 
                  (<TextField onClick={() => setError("")} fullWidth label="Name" margin="normal" name="name"
                    helperText={error ? error : ""}  defaultValue={name} placeholder="Enter Name"
                    error={error ? true : false} type="text" variant="outlined" inputRef={value => (nameRef.current = value) } 
                  />)
                }          
              </Grid> 
             
              <Grid item xs={12} md={6}>
                { ( id === "create" && imageUrl === "" ) && 
                  (<TextField onClick={() => setImageUrlError("")} fullWidth label="Image Url" margin="normal"
                    helperText={imageUrlError ? imageUrlError : ""} placeholder="Enter image url from https://robohash.org/"
                    error={imageUrlError ? true : false} type="text" variant="outlined" inputRef={value => (imageUrlRef.current = value) } 
                  />) 
                }
                
                { ( imageUrl && imageUrl !== "") && 
                  (<TextField onClick={() => setImageUrlError("")} fullWidth label="Image Url" margin="normal"
                    helperText={imageUrlError ? imageUrlError : ""}  defaultValue={imageUrl} placeholder="Enter image url from https://robohash.org/"
                    error={imageUrlError ? true : false} type="text" variant="outlined" inputRef={value => (imageUrlRef.current = value) } 
                  />)
                }          
              </Grid> 
            
            </Grid>  
            
            <Grid container spacing={2}>
              <Grid item xs={12} >
                  <TextField onClick={() => setPowerError("")}fullWidth label="Power" margin="normal" name="value" type="text" helperText={powerError ? powerError : ""}
                  error={powerError ? true : false} variant="outlined" inputRef={value => (powerRef.current = value) } />          
                  <Box sx={{ display: 'flex', justifyContent: 'center' }} >            
                      { (chipData.length >= 3) ? 
                          (<Button component="span" disabled={true} color="primary" variant="contained" > Maxed Out </Button>) 
                        : (<Button component="span" disabled={isDisabled ? true: false} onClick={() => handleAdd()} color="primary" variant="contained" > Add </Button>)
                      }
                  </Box>
              </Grid>
                
              
              <Grid item xs={12} >
                <Paper sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0, }} component="ul" >
                  { chipData.length > 0 ? ( chipData.map((data, key) => {
                    let icon;

                    return (
                      <ListItem key={key}>
                        <Chip icon={icon} label={data.label} onDelete={handleDelete(data)} />
                      </ListItem>
                    );
                  })) 
                : (<Alert severity="error">Type Power and Click Add. Min - 1, Max - 3 powers</Alert> )}
                </Paper>
              </Grid>              
            </Grid>
          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }} >            
            <Button onClick={() => create()} disabled={isDisabled ? true: false} color="primary" variant="contained" >
               { id === "create" ? "Create" : "Update" }
            </Button>
          </Box>
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

export default WyzebotForm;
