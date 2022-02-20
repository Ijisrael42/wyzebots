import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import WyzebotForm from '../../components/wyzebot/WyzebotForm';

const Wyzebot = () => (
  <>
    <Helmet> <title>Wyzebot | SMFC</title> </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>  <WyzebotForm  /> </Box>
      </Container>
    </Box>
  </>
);

export default Wyzebot;
