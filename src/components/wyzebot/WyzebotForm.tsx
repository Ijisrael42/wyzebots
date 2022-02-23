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
  const [open, setOpen] = useState(false);
  const [wyzebot, setWyzebot] = useState<any>(null);
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
  const [name, setName] = React.useState("");

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
      wyzebotService.create(data)
      .then((response:any) => { handleClose(); setAlertBody("success"); })
      .catch((error:any) => { handleClose(); setAlertBody("error"); console.log(error);})
    } 
    else {
      wyzebotService.update(id, data)
      .then( response => { handleClose(); setAlertBody("success"); })
      .catch( error => { handleClose(); setAlertBody("error"); console.log(error);} );
    }

  }

  const getFile = (e:any) => {
    let file = e.target.files[0];
    const filetype = ['png', 'jpg', 'jpeg']; // 'doc', 'docx', 'pdf',
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if( filetype.indexOf(fileExtension) === -1) return; 
    else return file;
  };

  const fileServiceUpload = async (file:any) => {

    let formData = new FormData();
    formData.append("file", file);

    try{
      let response = await fileService.upload(formData);
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

      wyzebotService.getById(id)
      .then( response => { 
        setWyzebot(response);  setOpen(false); 
        setFile({ name: response.image });
        setFileID(response.file_id);
        setName(response.name);

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
              <Grid item xs={12} md={9}>
                { ( id === "create" && name === "" ) && 
                  (<TextField onClick={() => setError("")} fullWidth label="Name" margin="normal" name="name"
                    helperText={error ? error : ""}
                    error={error ? true : false} type="text" variant="outlined" inputRef={value => (nameRef.current = value) } 
                  />) 
                }
                
                { ( name && name !== "") && 
                  (<TextField onClick={() => setError("")} fullWidth label="Name" margin="normal" name="name"
                    helperText={error ? error : ""}  defaultValue={name}
                    error={error ? true : false} type="text" variant="outlined" inputRef={value => (nameRef.current = value) } 
                  />)
                }          
             </Grid> 

             <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }} > 
                  <Stack spacing={0}>
                    <Typography sx={{ width: "240px" }} noWrap variant="caption" gutterBottom component="div">File type: png, jpg, jpeg</Typography>                      
                    <div>         
                      <Input ref={fileRef} onChange={(e:any) => fileUpload(e)} accept="image/*" id="contained-button-file" type="file" />
                      <Button onClick={() => uploadBtn()} disabled={isDisabled ? true: false} variant="contained" component="span"> Upload </Button>
                    </div>
                    {file && (
                      <Typography sx={{ width: "240px" }} noWrap variant="caption" gutterBottom component="div">{file.name}</Typography>                      
                    )}
                    {fileError && (
                      <Typography sx={{ width: "240px", color: "red" }} variant="caption" display="block" gutterBottom component="div">{fileError}</Typography>                      
                    )}
                  </Stack>  
                </Box>
             </Grid>  
            </Grid>  
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                  <TextField onClick={() => setPowerError("")}fullWidth label="Power" margin="normal" name="value" type="text" helperText={powerError ? powerError : ""}
                  error={powerError ? true : false} variant="outlined" inputRef={value => (powerRef.current = value) } />          
              </Grid>
              <Grid item xs={12} md={3} >
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }} >            
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
                    if (data.label === 'React') icon = <TagFacesIcon />;

                    return (
                      <ListItem key={key}>
                        <Chip icon={icon} label={data.label} 
                        onDelete={data.label === 'React' ? undefined : handleDelete(data)} />
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
