import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import DashboardToolbar from '../../components/dashboard/DashboardToolbar';
import EnhancedTable from '../../components/table/EnhancedTable';
import React, { useState  } from "react";
import { Backdrop, CircularProgress } from '@mui/material';
// interface Data { calories: number; carbs: number; fat: number; name: string; protein: number; }

const Dashboard: React.FC<any> = () => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = React.useState([]);

    const handleClose = () => { setOpen(false); };
    function createData( name: string, calories: number, fat: number, carbs: number, protein: number ) {
        return { name, calories, fat, carbs, protein, };
    }

    const deleteSelected = () => {
        console.log(selected);
        setOpen(true);    
    }    

    const rows = [
        createData('Cupcake', 305, 3.7, 67, 4.3), createData('Donut', 452, 25.0, 51, 4.9),
        createData('Eclair', 262, 16.0, 24, 6.0), createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Gingerbread', 356, 16.0, 49, 3.9), createData('Honeycomb', 408, 3.2, 87, 6.5),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3), createData('Jelly Bean', 375, 0.0, 94, 0.0),
        createData('KitKat', 518, 26.0, 65, 7.0),  createData('Lollipop', 392, 0.2, 98, 0.0),
        createData('Marshmallow', 318, 0, 81, 2.0), createData('Nougat', 360, 19.0, 9, 37.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
      ];
      
    const headCells = [ { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)', },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories', },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)', },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)', },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)', },
  ];
  
    return (
        <>
            <Helmet> <title>Dashboard Table | SMFC</title> </Helmet>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={false}>
                    <DashboardToolbar module="field" />
                    <Box sx={{ pt: 3 }}>
                        <EnhancedTable selected={selected} setSelected={setSelected} rows={rows} 
                        module="field" deleteSelected={deleteSelected} headCells={headCells}   />
                    </Box>
                </Container>
            </Box>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
                <CircularProgress color="inherit" />
            </Backdrop>    
        </>
    );
}

export default Dashboard;