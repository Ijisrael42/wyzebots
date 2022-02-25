import React from 'react';
import { shallow } from 'enzyme';
import WyzebotToolbar from '../../components/wyzebot/WyzebotToolbar';

test('renders WyzebotToolbar', () => {
  const component = shallow(<WyzebotToolbar module="wyzebots" />); 
  expect(component).toMatchSnapshot();
});