import React from 'react';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { noop } from './utils';
import styles from './Header.module.scss';

export default function Header({ info, onDelete, isEdit }) {
  const statusIcon = isEdit && (
    <IconButton icon="pencil-alt" className={styles.pencil} />
  );
  const iconContainer = (
    <div className={styles.iconContainer}>
      {statusIcon}
      <IconButton icon="trash" onClick={onDelete} className={styles.trash} />
    </div>
  );

  return (
    <div className={styles.header}>
      {info && <div className={styles.info}>{info}</div>}
      {iconContainer}
    </div>
  );
}

Header.propTypes = {
  info: PropTypes.string,
  onDelete: PropTypes.func,
  isEdit: PropTypes.bool,
};

Header.defaultProps = {
  info: undefined,
  onDelete: noop,
  isEdit: false,
};
