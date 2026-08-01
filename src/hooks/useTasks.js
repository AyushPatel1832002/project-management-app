import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, deleteTask, moveTask } from '../store/slices/projectSlice';
import { useNotifications } from './useNotifications';

export const useTasks = (boardId) => {
  const dispatch = useDispatch();
  const { notify } = useNotifications();
  const { tasks, boards } = useSelector((state) => state.projects);

  const boardTasks = (boardId) => {
    const board = boards.entities[boardId];
    if (!board) return [];
    return board.taskIds.map((tid) => tasks.entities[tid]);
  };

  const createTask = (taskData) => {
    if (!boardId) return;
    dispatch(addTask({ boardId, ...taskData, createdAt: new Date().toISOString() }));
    notify('Task added', 'success');
  };

  const editTask = (taskId, updates) => {
    dispatch(updateTask({ id: taskId, ...updates }));
    notify('Task updated', 'success');
  };

  const removeTask = (taskId) => {
    dispatch(deleteTask({ taskId, boardId }));
    notify('Task deleted', 'error');
  };

  const moveTaskToBoard = (taskId, targetBoardId, index = 0) => {
    dispatch(moveTask({ taskId, fromBoardId: boardId, toBoardId: targetBoardId, index }));
  };

  return {
    tasks: boardTasks(boardId),
    createTask,
    editTask,
    removeTask,
    moveTaskToBoard,
  };
};
