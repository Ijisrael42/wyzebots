import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { wyzebotService } from '../../services/wyzebotService'; 
import { useForm, Controller } from "react-hook-form";
import useResolver from '../../helpers/resolver';
import { useParams, useNavigate, useLocation } from 'react-router';
import * as Yup from 'yup';
import { Backdrop, CircularProgress, Grid, Paper, Chip, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { fileService } from "../../services/fileService";

interface ChipData { key: number; label: string; }
const ListItem = styled('li')((props: any) => ({ margin: props.theme.spacing(0.5), }));
const Input = styled('input')({ display: 'none', });

const WyzebotForm = (props: any) => {
  const [wyzebot, setWyzebot] = useState();
  const navigate = useNavigate();
  const { id }:any = useParams();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const options = [ "Enabled", "Disabled" ];
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  const powerRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const [file, setFile] = useState<any>(null);
  const [fileExt, setFileExt] = useState<any>(null);
  const [fileError, setFileError] = useState<any>(null);

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const [chipData, setChipData] = React.useState< ChipData[]>([]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleAdd = () => {

    if( powerRef.current!.value !== '' ) {
      let power: ChipData = { key: chipData.length, label: powerRef.current!.value };
      powerRef.current!.value = "";
      setChipData([...chipData, power ]);
    }
  };

  const create = () => {
    let name = "", power = [];
    if(nameRef.current.value === "" || nameRef.current.value === undefined) {
      // set error
      return;
    } else name = nameRef.current.value;

    if( chipData.length < 1 ) {
      // set error
      return;
    } else if( chipData.length > 3 ) {
      // set error
      return;
    } else power = chipData.map( ( chip: ChipData) => chip.label);

    if(!file) { 
      // set error
      return;
    }
    
    let data = { name: name, power: power, image: file.name };
    wyzebotService.create(data)
    .then((response:any) => { console.log(response);})
    .catch((error:any) => { console.log(error);})

  }

  const update = (data:any) => {
    handleToggle();
    if( id === "create" ) {
      data.status = options[1];
      wyzebotService.create(data)
      .then( response => { navigate(`/app/${route}s`); })
      .catch( error => console.log(error) );
    }
    else {
      wyzebotService.update(id, data)
      .then( response => {   navigate(0); })
      .catch( error => console.log(error) );
    }
  };

  const getFile = (e:any) => {
    let file = e.target.files[0];
    const filetype = ['png', 'jpg', 'jpeg']; // 'doc', 'docx', 'pdf',
    const fileExtension = file.name.split('.').pop();
  
    if( filetype.indexOf(fileExtension) === -1) return; 
    else return file;
  };

  const fileServiceUpload = async (file:any) => {
    // setShowLoading(true);
    let formData = new FormData();
    formData.append("file", file);

    try{
      let response = await fileService.upload(formData);
      // setShowLoading(false);
      return response;
    } catch (error) { 
      //setShowLoading(false); 
      return error; 
    }
  };

  const fileUpload = (e:any) => {
    if( !e.target.files[0] ) return;
    const file = getFile(e);
    if( !file ) { setFileError("Incompatible file type"); return; }

    const fileSize = Math.round((file.size / (1024 * 1024) )); // in Kb => 1024 bytes, Mb => 1024 * 1024 bytes
    if( fileSize > 10 ) { 
      let docFile = document.getElementById(id) as HTMLFormElement;
      docFile.value = "";
      setFileError("File is too large."); return;
    }
    setFileExt(file);
    setFile(file); fileServiceUpload(file);
  };

  return (
    <>
      <form {...props} >           
        <Card>
          <CardHeader subheader={ id === "create" ? "Create field" : "Update field" } title="Wyzebot" />
          <Divider />
          <CardContent>'
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={10}>
                <TextField fullWidth label="Name" margin="normal" name="name" 
                 type="text" variant="outlined" inputRef={value => (nameRef.current = value) } />          
             </Grid> 

             <Grid item xs={12} md={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }} >   
                  <label htmlFor="contained-button-file">         
                    <Input onChange={(e:any) => fileUpload(e)} accept="image/*" id="contained-button-file" type="file" />
                    <Button variant="contained" component="span"> Upload </Button>
                  </label>
                </Box>
             </Grid>  
            </Grid>  
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={10}>
                  <TextField fullWidth label="Power" margin="normal" name="value" type="text" 
                  variant="outlined" inputRef={value => (powerRef.current = value) } />          
              </Grid>
              <Grid item xs={12} md={2} >
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 3 }} >            
                  { (chipData.length >= 3) ? 
                      (<Button component="span" disabled={true} color="primary" variant="contained" > Maxed Out </Button>) 
                    : (<Button component="span" onClick={() => handleAdd()} color="primary" variant="contained" > Add </Button>)
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
            <Button onClick={() => create()} color="primary" variant="contained" >
               { id === "create" ? "Create" : "Update" }
            </Button>
          </Box>
        </Card>
      </form>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
        <CircularProgress color="inherit" />
      </Backdrop>    

    </>
  );
};

export default WyzebotForm;
