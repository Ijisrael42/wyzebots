import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import WyzebotToolbar from '../../components/wyzebot/WyzebotToolbar';
import EnhancedTable from '../../components/table/EnhancedTable';
import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import { Backdrop, CircularProgress, Avatar } from '@mui/material';
import { wyzebotService } from '../../services/wyzebotService'; 
import { config } from "../../helpers/config";

interface Data { calories: number; carbs: number; fat: number; name: string; protein: number; }

const WyzebotList: React.FC<any> = () => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = React.useState([]);
    const [ wyzebots, setWyzebots ] = useState([]);
    const navigate = useNavigate();

    const handleClose = () => { setOpen(false); };
    function createData( image: any, id: string, name: string, power: string, squad: string, ) {
        return { image, id, name, power, squad, };
    }

    const deleteSelected = () => {
        console.log(selected);
        setOpen(true);

        wyzebotService.deletemany(selected)
        .then( response => { setOpen(true); navigate(0); })
        .catch( error => console.log(error) );
    }
    
    
    const rows: any = [
        // createData('Cupcake', 305, 3.7, 67, 4.3), createData('Donut', 452, 25.0, 51, 4.9),
        // createData('Eclair', 262, 16.0, 24, 6.0), createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        // createData('Gingerbread', 356, 16.0, 49, 3.9), createData('Honeycomb', 408, 3.2, 87, 6.5),
        // createData('Ice cream sandwich', 237, 9.0, 37, 4.3), createData('Jelly Bean', 375, 0.0, 94, 0.0),
        // createData('KitKat', 518, 26.0, 65, 7.0),  createData('Lollipop', 392, 0.2, 98, 0.0),
        // createData('Marshmallow', 318, 0, 81, 2.0), createData('Nougat', 360, 19.0, 9, 37.0),
        // createData('Oreo', 437, 18.0, 63, 4.0),
    ];
      
    const headCells = [ 
        { id: 'image', numeric: false, disablePadding: false, label: 'Image', },
        { id: 'id', numeric: false, disablePadding: false, label: 'ID', },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name', },
        { id: 'power', numeric: false, disablePadding: false, label: 'Power', },
        { id: 'squad', numeric: false, disablePadding: false, label: 'Squad', },
    ];
  
    useEffect( () => { 

        wyzebotService.getAll()
        .then( (response:any) => { 

            const wyzebots = response.map( (el:any) => {
                let image = (<Avatar sx={{ ml: 2 }} alt={el.name} src={`${config.apiUrl}/files/image/${el.image}`} />);
                let squad = el.squad ? el.squad : "N/A";
                return createData( image, el.id, el.name, el.power.toString(), squad);
            });
            setWyzebots(wyzebots);             
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
                        <EnhancedTable selected={selected} setSelected={setSelected} rows={wyzebots} 
                        deleteSelected={deleteSelected} headCells={headCells} module="wyzebots" checkbox={true} />
                    </Box>
                </Container>
            </Box>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
                <CircularProgress color="inherit" />
            </Backdrop>    
        </>
    );
}

export default WyzebotList;