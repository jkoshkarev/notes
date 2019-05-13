import React from 'react';
import { shallow } from 'enzyme';

import NoteBody from '../NoteBody';
import { noop } from '../utils';
import TextArea from '../TextArea';

describe('NoteBody', () => {
  it('should render textarea with given text when edit mode', () => {
    const testText = 'Some text';
    const wrapper = shallow(
      <NoteBody onNoteChange={noop} value={testText} isEdit />,
    );
    expect(wrapper.find(TextArea)).toHaveProp('value', testText);
  });
});
