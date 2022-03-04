import { render, screen } from '@testing-library/react';
import WyzebotList from '../../pages/sidemenu/WyzebotList';
import {wyzebotService} from '../../services/wyzebotService';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

test('renders learn react link', async () => {
  let squad = { 
    id: '621629c9ebc7ef3810e40ecb', name: 'Squad 1', power: ['62162a68ebc7ef3810e40ed1','62162d13ebc7ef3810e40eda'], 
    tribe: '62162d9eebc7ef3810e40edc', tribe_name: 'Tribe 1',  created_at: "2022-02-23T12:34:17.883Z"
  };

  let squadList = [ squad ];

  jest.spyOn(wyzebotService, "getAll").mockResolvedValue(squadList);

  render(<MemoryRouter initialEntries={['/wyzebots']}> <WyzebotList /> </MemoryRouter>);
  expect(await screen.findByText(/Squad 1/)).toBeInTheDocument();

});

