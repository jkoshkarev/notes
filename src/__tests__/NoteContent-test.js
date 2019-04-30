import React from 'react';
import { shallow } from 'enzyme';

import NoteContent from '../NoteContent';
import { noop } from '../utils';
import TextArea from '../TextArea';

describe('NoteContent', () => {
  it('should render textarea with given text when edit mode', () => {
    const testText = 'Some text';
    const wrapper = shallow(
      <NoteContent onNoteChange={noop} value={testText} isEdit />,
    );
    expect(wrapper.find(TextArea)).toHaveProp('value', testText);
  });
});
