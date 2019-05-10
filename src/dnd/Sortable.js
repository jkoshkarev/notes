import React, { useRef } from 'react';

export default propsFactory => Component => ({
  connectDragSource,
  connectDropTarget,
  isDragging,
  ...rest
}) => {
  const dragElementRef = useRef();
  connectDragSource(dragElementRef);
  connectDropTarget(dragElementRef);

  return (
    <Component
      ref={dragElementRef}
      {...propsFactory({ ...rest }, isDragging)}
    />
  );
};
