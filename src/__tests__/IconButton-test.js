import { shallow } from 'enzyme';
import React from 'react';
import IconButton from '../IconButton';

describe('IconButton', () => {
  it('should render icon with given name', () => {
    const icon = 'pencil-alt';
    const wrapper = shallow(<IconButton icon={icon} />);
    expect(wrapper.find('i')).toHaveClassName(`fas fa-${icon}`);
  });


  it('should render calls onClick callback when icon is clicked', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(<IconButton icon="check" onClick={onClickMock} />);
    wrapper.find('i').simulate('click');
    expect(onClickMock.mock.calls.length).toBe(1);
  });
});
