import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Header from './Header';
import NoteContent from './NoteContent';
import styles from './Note.module.scss';
import { noop } from './utils';

const getInfoFromCreated = created => created && created.toLocaleString();

const Note = forwardRef(
  ({ value, onDelete, onChange, created, className, headerClassName }, ref) => {
    const [isEdit, setIsEdit] = useState(true);

    function handleNoteChange(evt) {
      onChange(evt.target.value);
    }

    return (
      <div className={cx(styles.note, className)} ref={ref}>
        <Header
          info={getInfoFromCreated(created)}
          onDelete={onDelete}
          isEdit={isEdit}
          className={headerClassName}
        />
        <NoteContent
          onChange={handleNoteChange}
          value={value}
          onEditChange={setIsEdit}
          isEdit={isEdit}
        />
      </div>
    );
  },
);

Note.propTypes = {
  created: PropTypes.instanceOf(Date),
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
};

Note.defaultProps = {
  created: undefined,
  value: '',
  className: undefined,
  headerClassName: undefined,
  onChange: noop,
};

export default Note;
