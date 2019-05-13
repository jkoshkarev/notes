import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import TextArea from './TextArea';
import styles from './NoteBody.module.scss';
import { noop } from './utils';

const NoteBody = ({ value, onChange, isEdit, onEditChange, ...rest }) => {
  const textAreaRef = useRef(null);

  const triggerEdit = useCallback(() => onEditChange(true), [onEditChange]);

  const stopEdit = useCallback(() => onEditChange(false), [onEditChange]);

  const handleTextAreaKeyDown = useCallback(
    evt => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onEditChange(false);
      }
    },
    [onEditChange],
  );

  const handleMarkdownKeyDown = useCallback(
    evt => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        triggerEdit();
      }
    },
    [triggerEdit],
  );

  if (isEdit) {
    return (
      <TextArea
        onChange={onChange}
        onBlur={stopEdit}
        onClick={triggerEdit}
        value={value}
        innerRef={textAreaRef}
        className={styles.textArea}
        onKeyDown={handleTextAreaKeyDown}
        {...rest}
      />
    );
  }

  return (
    <div
      role="button"
      onClick={triggerEdit}
      onKeyDown={handleMarkdownKeyDown}
      tabIndex={0}
      {...rest}
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
