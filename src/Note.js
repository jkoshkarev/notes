import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Header from './Header';
import NoteContent from './NoteContent';
import styles from './Note.module.scss';
import { noop } from './utils';

const getInfoFromCreated = created => created && created.toLocaleString();

const Note = ({ id, value, onDelete, onChange, created, className }) => {
  const [isEdit, setIsEdit] = useState(true);

  function handleDelete() {
    onDelete(id);
  }

  function handleNoteChange(evt) {
    onChange(id, evt.target.value);
  }

  return (
    <div className={cx(styles.note, className)}>
      <Header
        info={getInfoFromCreated(created)}
        onDelete={handleDelete}
        isEdit={isEdit}
      />
      <NoteContent
        onChange={handleNoteChange}
        value={value}
        onEditChange={setIsEdit}
        isEdit={isEdit}
      />
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date),
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};

Note.defaultProps = {
  created: undefined,
  value: '',
  className: undefined,
  onChange: noop,
};

export default Note;
