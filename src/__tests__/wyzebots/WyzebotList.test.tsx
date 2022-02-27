import React from 'react';
import { shallow, mount } from 'enzyme';
import WyzebotList from '../../pages/sidemenu/WyzebotList';
import SquadList from '../../pages/sidemenu/SquadList';
import WyzebotToolBar from '../../components/wyzebot/WyzebotToolBar';
import SquadToolBar from '../../components/squad/SquadToolBar';
import EnhancedTable from '../../components/table/EnhancedTable';
import { wyzebotService } from '../../services/wyzebotService'; 
import { squadService } from '../../services/squadService'; 
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from "../../App";
import { Box, Button } from '@material-ui/core';
import { TableRow, Table } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

/* Use Case Tests

List Wyzebots
- fetch wyzebots is not null
- Display Add New button
- Display Table with empty data 

Retrive WyzebotList
- Check if WyzebotToolbar exist
- Check if EnhancedTable exists 
- Fetch data and check if data entry is in EnhancedTable that is mounted
 */


describe("rendering WyzebotList", () => {

  let component = null; 

  beforeEach( async () => { 
    await act( async () => { 
      component = mount(<MemoryRouter initialEntries={['/squads']}><App /></MemoryRouter>); 
    });
  });

  afterEach(() => { component.unmount(); });

  test('Check if Button exist in SquadToolBar', () => {
    const wyzebotToolBar = component.find(SquadToolBar);
    const button = (<Button component={RouterLink} to={`/squads/create`} color="primary" variant="contained" > Add Squad </Button>);
    expect(wyzebotToolBar.contains(button)).toBe(true);

  });

  test('Checking squad data now', async () => {
    let squads = null;
    await act ( async () => { squads = await squadService.getAll(); });
    expect(squads).not.toBeNull();

    const enhancedTable = component.find(EnhancedTable);
    await expect(enhancedTable).toHaveLength(1);
    const row = await enhancedTable.find(TableRow);
    console.log(row.length);

  });
  
});