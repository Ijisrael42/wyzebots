import { render, screen } from '@testing-library/react';
import TribeList from '../../pages/sidemenu/TribeList';
import {tribeService} from '../../services/tribeService';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

test('Displaying the list of Tribes', async () => {
  let tribe = { 
    id: '62162d9eebc7ef3810e40edc',  squads: ['621629c9ebc7ef3810e40ecb', '62162dccebc7ef3810e40ede'], 
     name: 'Tribe 1',  created_at: "2022-02-23T12:50:38.150Z"
  };

  let tribeList = [ tribe ];

  jest.spyOn(tribeService, "getAll").mockResolvedValue(tribeList);

  render(<MemoryRouter initialEntries={['/tribes']}> <TribeList /> </MemoryRouter>);
  expect(await screen.findByText(/62162d9eebc7ef3810e40edc/)).toBeInTheDocument();
  expect(await screen.findByText(/Tribe 1/)).toBeInTheDocument();

  // Does not exists in render as id but as values
  expect(screen.queryByText(/621629c9ebc7ef3810e40ecb/)).toBeNull();
  expect(screen.queryByText(/62162dccebc7ef3810e40ede/)).toBeNull();

});

