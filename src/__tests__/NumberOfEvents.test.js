import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents/> component', () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents/>)
  });

  test('should render text input', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
  });

  test('render text input correctly from prop', () => {
    const numberOfEvents = NumberOfEventsWrapper.prop('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(
      numberOfEvents
    );
  });

  test('should change state of numberOfEvents', () => {
    const val = { target: {value: 12}};
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', val);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(12);
  })
  

  
});