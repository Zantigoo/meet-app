import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event/> component', () => {

  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]}/>);
  });

  test('should display Summary', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  });

  test('should display Location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  })
  
  test('should display details button', () => {
    expect(EventWrapper.find('.showDetails')).toHaveLength(1);
  });

  test('should display date & timezone', () => {
    expect(EventWrapper.find('.startDate')).toHaveLength(1);
  });

  test('should be collapsed by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('should show extra details when show details is clicked', () => {
    EventWrapper.setState({
      collapsed:true,
    });
    EventWrapper.find('.showDetails').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('should hide extra details when show details is clicked', () => {
    EventWrapper.setState({
      collapsed:false,
    });
    EventWrapper.find('.hideDetails').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

});