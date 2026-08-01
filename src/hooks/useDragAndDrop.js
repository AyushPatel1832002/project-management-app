import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { moveTask } from '../store/slices/projectSlice';

export const ItemTypes = {
  TASK: 'task',
};

export const useDragAndDrop = (taskId, fromBoardId) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: taskId, fromBoardId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const useTaskDrop = (toBoardId, index = 0) => {
    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.TASK,
      drop: (item) => {
        if (item.fromBoardId !== toBoardId || item.id !== taskId) {
           dispatch(moveTask({ 
            taskId: item.id, 
            fromBoardId: item.fromBoardId, 
            toBoardId, 
            index 
          }));
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    return [isOver, drop];
  };

  return { drag, isDragging, useTaskDrop };
};

// Also export a simpler version for board dropping
export const useBoardDrop = (toBoardId) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      if (item.fromBoardId !== toBoardId) {
        dispatch(moveTask({ 
          taskId: item.id, 
          fromBoardId: item.fromBoardId, 
          toBoardId, 
          index: 999 // Append at the end
        }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return [isOver, drop];
};
