import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import cx from 'classnames';
import styles from './TextArea.module.scss';
import { noop } from './utils';

const TextArea = ({ value, onChange, onBlur, onClick, className }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return (
    <TextareaAutosize
      className={cx(styles.textarea, className)}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      inputRef={textAreaRef}
    />
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

TextArea.defaultProps = {
  value: '',
  onChange: noop,
  onBlur: noop,
  onClick: noop,
  className: undefined,
};

export default TextArea;
