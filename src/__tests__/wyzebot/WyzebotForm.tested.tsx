import { fireEvent, render, screen } from '@testing-library/react';
import Wyzebot from '../../pages/backbutton/Wyzebot';
import { MemoryRouter, Route } from 'react-router-dom';
import '@testing-library/jest-dom'

test('Creating a Wyzebot', async () => {

  const {container} = render( <MemoryRouter initialEntries={['/wyzebots/create']}> 
    <Route path='/wyzebots/:id'><Wyzebot /></Route>       
  </MemoryRouter>);

  let nameInput = screen.getByTestId("name") as HTMLInputElement;
  fireEvent.change(nameInput, {target: { value: "Wyzebot 12"}});
  expect(nameInput.value).toBe("Wyzebot 12");

  let imgInput = screen.getByTestId("img-url") as HTMLInputElement;
  expect(imgInput).toBeInTheDocument();
  fireEvent.change(imgInput, {target: { value: "https://robohash.org/Wyzebot 3"}});
  expect(imgInput.value).toBe("https://robohash.org/Wyzebot 3");

  let powerInput = screen.getByTestId("power") as HTMLInputElement;
  expect(powerInput).toBeInTheDocument();

  // Add power is in the document
  let addPowerBtn = screen.getByTestId("add-power");
  expect(addPowerBtn).toBeInTheDocument();

  // Type Power 1
  fireEvent.change(powerInput, {target: { value: "Power 1"}});
  expect(powerInput.value).toBe("Power 1");

  // Add Power 1 and display Power 1
  expect(addPowerBtn).toBeInTheDocument();
  fireEvent.click(addPowerBtn);
  expect(await screen.findByText(/Power 1/)).toBeInTheDocument();

  // Type Power 2
  fireEvent.change(powerInput, {target: { value: "Power 2"}});
  expect(powerInput.value).toBe("Power 2");

  // Add Power 2 and display Power 2
  expect(addPowerBtn).toBeInTheDocument();
  fireEvent.click(addPowerBtn);
  expect(await screen.findByText(/Power 2/)).toBeInTheDocument();

  // Type Power 3
  fireEvent.change(powerInput, {target: { value: "Power 3"}});
  expect(powerInput.value).toBe("Power 3");

  // Add Power 3 and display Power 3
  expect(addPowerBtn).toBeInTheDocument();
  fireEvent.click(addPowerBtn);
  expect(await screen.findByText(/Power 3/)).toBeInTheDocument();

  // Type Power 4
  fireEvent.change(powerInput, {target: { value: "Power 4"}});
  expect(powerInput.value).toBe("Power 4");

  // Add Power in not in the document anymore
  expect(addPowerBtn).not.toBeInTheDocument();
  
  // Maxed Out is displaying now
  expect(screen.getByTestId('maxed-out')).toBeInTheDocument();
});

