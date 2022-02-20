import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { wyzebotService } from '../../services/wyzebotService'; 
import { useForm, Controller } from "react-hook-form";
import useResolver from '../../helpers/resolver';
import { useParams, useNavigate, useLocation } from 'react-router';
import * as Yup from 'yup';
import { Backdrop, CircularProgress, Grid, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import TagFacesIcon from '@mui/icons-material/TagFaces';

interface ChipData { key: number; label: string; }
const ListItem = styled('li')((props: any) => ({ margin: props.theme.spacing(0.5), }));

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

  const handleClose = () => { setOpen(false); };
  const handleToggle = () => { setOpen(!open); };
  const validationSchema = Yup.object().shape({ name: Yup.string().required('Name is required')});

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: useResolver(validationSchema),
    defaultValues: {name: ""}
  });

  const [chipData, setChipData] = React.useState< ChipData[]>([{ key: 4, label: 'Vue.js' }]);

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

  useEffect( () => {
    if( id !== "create" ) {
      handleToggle();
      wyzebotService.getById(id)
      .then( response => {  setWyzebot(response); reset(response); setOpen(false); })    
      .catch( error => console.log(error) );
    }
  },[]);

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

  return (
    <>
      <form {...props} onSubmit={handleSubmit(update)}>           
        <Card>
          <CardHeader subheader={ id === "create" ? "Create field" : "Update field" } title="Wyzebot" />
          <Divider />
          <CardContent>
            <Controller control={control} name="name" defaultValue="" render={({ onChange, onBlur, value }) =>  (  
                <TextField fullWidth label="Name" margin="normal" name="name" 
                onChange={onChange}  type="text" value={value} variant="outlined" />          
              )}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={11}>
                  <TextField fullWidth label="Value" margin="normal" name="value" type="text" 
                  variant="outlined" inputRef={value => (powerRef.current = value) } />          
              </Grid>
              <Grid item xs={1} >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 3 }} >            
                  <Button onClick={() => handleAdd()} color="primary" variant="contained" > Add </Button>
                </Box>
              </Grid>   
              <Grid item xs={12} >
                <Paper sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', 
                    listStyle: 'none', p: 0.5, m: 0, }} component="ul"
                >
                  { chipData && chipData.map((data, key) => {
                    let icon;
                    if (data.label === 'React') icon = <TagFacesIcon />;

                    return (
                      <ListItem key={key}>
                        <Chip icon={icon} label={data.label} 
                        onDelete={data.label === 'React' ? undefined : handleDelete(data)} />
                      </ListItem>
                    );
                  })}
                </Paper>
              </Grid>              
            </Grid>
          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >            
            <Button type="submit" color="primary" variant="contained" >
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
