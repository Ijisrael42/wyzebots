import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SquadForm from '../../components/squad/SquadForm';

const Squad = () => (
  <>
    <Helmet> <title>Squad | WYZETALK</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <SquadForm  /> </Box>
      </Container>
    </Box>
  </>
);

export default Squad;
