import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const IconButton = ({ icon, onClick, className }) => {
  const handleKeyPress = useCallback(
    evt => {
      if (onClick && (evt.key === 'Enter' || evt.key === ' ')) {
        onClick();
      }
    },
    [onClick],
  );

  return (
    <i
      role="button"
      tabIndex={onClick ? 0 : -1}
      className={cx(`fas fa-${icon}`, className)}
      onKeyDown={handleKeyPress}
      onClick={onClick}
    />
  );
};

IconButton.propTypes = {
  /**
   * Font awesome icon (e.g. `times`).
   */
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

IconButton.defaultProps = {
  onClick: undefined,
  className: undefined,
};

export default IconButton;
