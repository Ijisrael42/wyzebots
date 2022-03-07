import { render, screen } from '@testing-library/react';
import SquadList from '../../pages/sidemenu/SquadList';
import {squadService} from '../../services/squadService';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('Displaying the list of Squads', async () => {
  let squad = { 
    id: '621629c9ebc7ef3810e40ecb', name: 'Squad 1', wyzebots: ['62162a68ebc7ef3810e40ed1','62162d13ebc7ef3810e40eda'], 
    tribe: '62162d9eebc7ef3810e40edc', tribe_name: 'Tribe 1',  created_at: "2022-02-23T12:34:17.883Z"
  };

  let squadList = [ squad ];

  jest.spyOn(squadService, "getAll").mockResolvedValue(squadList);

  render(<MemoryRouter initialEntries={['/wyzebots']}> <SquadList /> </MemoryRouter>);
  expect(await screen.findByText(squad.id)).toBeInTheDocument();
  expect(await screen.findByText(squad.name)).toBeInTheDocument();
  expect(await screen.findByText(squad.tribe_name)).toBeInTheDocument();

  // Does not exists in render as id but as values
  expect(screen.queryByText(squad.tribe)).toBeNull();
  expect(screen.queryByText(squad.wyzebots.toString())).toBeNull();

});

