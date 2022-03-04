import { render, screen } from '@testing-library/react';
import Wyzebot from '../../pages/backbutton/Wyzebot';
import {wyzebotService} from '../../services/wyzebotService';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

test('renders learn react link', async () => {

  render(<MemoryRouter initialEntries={['/wyzebot']}> <Wyzebot /> </MemoryRouter>);
  expect(await screen.getByText(/name="name"/)).toBeInTheDocument();

});

