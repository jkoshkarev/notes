import { DropTarget, DragSource } from 'react-dnd';
import { flowRight } from 'lodash';
import cx from 'classnames';
import Note from '../Note';
import styles from './SortableNote.module.scss';
import ItemTypes from './ItemTypes';
import sortable from './Sortable';

const dropTargetHOC = DropTarget(
  ItemTypes.NOTE,
  {
    hover({ index: hoverIndex, moveNote }, monitor) {
      const monitorItem = monitor.getItem();
      const dragIndex = monitorItem.index;
      if (dragIndex === hoverIndex) {
        return;
      }

      moveNote(dragIndex, hoverIndex);

      monitorItem.index = hoverIndex;
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
);

const dropSourceHOC = DragSource(
  ItemTypes.NOTE,
  {
    beginDrag: props => ({
      index: props.index,
    }),
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
);

export default flowRight(
  dropTargetHOC,
  dropSourceHOC,
  sortable(({ className, headerClassName, ...rest }, isDragging) => ({
    ...rest,
    className: cx(className, { [styles.dragging]: isDragging }),
    headerClassName: cx(headerClassName, styles.draggableHeader),
  })),
)(Note);
