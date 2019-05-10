import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import TextArea from './TextArea';
import styles from './NoteContent.module.scss';
import { noop } from './utils';

const NoteContent = ({ value, onChange, isEdit, onEditChange, ...rest }) => {
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
        // {...rest}
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

NoteContent.propTypes = {
  /**
   * Text to display.
   */
  value: PropTypes.string,
  onChange: PropTypes.func,
  isEdit: PropTypes.bool,
  onEditChange: PropTypes.func,
};

NoteContent.defaultProps = {
  value: '',
  isEdit: true,
  onEditChange: noop,
  onChange: noop,
};

export default NoteContent;
