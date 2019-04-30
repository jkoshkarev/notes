import { shallow } from 'enzyme';
import React from 'react';
import Note from '../Note';
import Header from '../Header';
import NoteContent from '../NoteContent';
import { noop } from '../utils';

describe('Note', () => {
  const noteId = 'note';

  it('should render Header with given props', () => {
    const date = new Date();
    const expectedInfo = date.toLocaleString();

    const wrapper = shallow(
      <Note id={noteId} created={date} onDelete={noop} />,
    );
    const header = wrapper.find(Header);
    expect(header).toExist();
    expect(header).toHaveProp('info', expectedInfo);
  });

  it('should not fail rendering when created is undefined', () => {
    shallow(<Note id={noteId} onDelete={noop} />);
  });

  it('should render note with given text', () => {
    const note = 'Some note';
    const wrapper = shallow(<Note id={noteId} onDelete={noop} value={note} />);
    expect(wrapper.find(NoteContent)).toHaveProp('value', note);
  });
});
