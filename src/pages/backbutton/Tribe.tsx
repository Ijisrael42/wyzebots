import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TribeForm from '../../components/tribe/TribeForm';

const Tribe = () => (
  <>
    <Helmet> <title>Tribe | WYZETALK</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <TribeForm  /> </Box>
      </Container>
    </Box>
  </>
);

export default Tribe;
