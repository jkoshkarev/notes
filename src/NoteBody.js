import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import TextArea from './TextArea';
import styles from './NoteBody.module.scss';
import { noop } from './utils';

const NoteBody = ({ value, onChange, isEdit, onEditChange }) => {
  const textAreaRef = useRef(null);

  function triggerEdit() {
    onEditChange(true);
  }

  function stopEdit() {
    onEditChange(false);
  }

  if (isEdit) {
    return (
      <TextArea
        onChange={onChange}
        onBlur={stopEdit}
        onClick={triggerEdit}
        value={value}
        innerRef={textAreaRef}
        className={styles.textArea}
      />
    );
  }

  function handleKeyPress(evt) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      triggerEdit();
    }
  }

  return (
    <div
      role="button"
      onClick={triggerEdit}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      draggable
      onDragStart={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <ReactMarkdown
        source={value}
        escapeHtml={false}
        className={styles.markdown}
      />
    </div>
  );
};

NoteBody.propTypes = {
  /**
   * Text to display.
   */
  value: PropTypes.string,
  onChange: PropTypes.func,
  isEdit: PropTypes.bool,
  onEditChange: PropTypes.func,
};

NoteBody.defaultProps = {
  value: '',
  isEdit: true,
  onEditChange: noop,
  onChange: noop,
};

export default NoteBody;