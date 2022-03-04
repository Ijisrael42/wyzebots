import { render, screen } from '@testing-library/react';
import WyzebotList from '../../pages/sidemenu/WyzebotList';
import {wyzebotService} from '../../services/wyzebotService';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

test('renders learn react link', async () => {
  let wyzebot = { 
    id: '62162a68ebc7ef3810e40ed1', name: 'Wyzebot 1', power: ['Power 1','Power 2','Power 3'], 
    squad: '621629c9ebc7ef3810e40ecb', squad_name: 'Squad 1', image_url: 'https://robohash.org/Wyzebot 1',
    created_at: "2022-02-23T12:36:56.016Z"
  };

  let wyzebotList = [ wyzebot ];

  jest.spyOn(wyzebotService, "getAll").mockResolvedValue(wyzebotList);

  render(<MemoryRouter initialEntries={['/wyzebots']}> <WyzebotList /> </MemoryRouter>);
  expect(await screen.findByText(/Wyzebot 1/)).toBeInTheDocument();

});

