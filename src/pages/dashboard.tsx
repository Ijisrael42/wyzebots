import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Table from '../components/table/Table';
import React, { useState  } from "react";
import { Backdrop, CircularProgress } from '@mui/material';

const DashboardPage: React.FC<any> = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false); };
  
    return (
        
        <>
            <Helmet> <title>Applications | SMFC</title> </Helmet>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={false}>
                <Box sx={{ pt: 3 }}>            

                    <Table  /> 
            
                </Box>
                </Container>
            </Box>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} >
                <CircularProgress color="inherit" />
            </Backdrop>    
        </> 
    
    );
}
export default DashboardPage;
