import { Box, Button, } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const SquadToolbar: React.FC<any> = (props) => (
  <Box {...props}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
      {/* <Button> Import </Button>  <Button sx={{ mx: 1 }}> Export </Button> */}
      <Button component={RouterLink} to={`/${props.module}/create`} color="primary" variant="contained" > Add Squad </Button>
    </Box>    
  </Box>
);

export default SquadToolbar;
