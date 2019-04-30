import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';
import IconButton from '../IconButton';
import styles from '../Header.module.scss';

describe('Header', () => {
  it('should render info', () => {
    const testInfo = 'Some info';
    const wrapper = shallow(<Header info={testInfo} />);
    const info = wrapper.find(`.${styles.info}`);
    expect(info).toExist();
    expect(info).toHaveText(testInfo);
  });

  it('should not render info if not passed', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(`.${styles.info}`)).not.toExist();
  });

  it('should render delete button', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(IconButton)).toHaveProp('icon', 'trash');
  });

  it('should render pencil icon button when edit = true', () => {
    const wrapper = shallow(<Header isEdit />);
    expect(wrapper.find('IconButton.pencil')).toHaveProp('icon', 'pencil-alt');
  });
});
