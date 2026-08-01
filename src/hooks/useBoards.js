import { useDispatch, useSelector } from 'react-redux';
import { addBoard, deleteBoard } from '../store/slices/projectSlice';
import { useNotifications } from './useNotifications';

export const useBoards = (projectId) => {
  const dispatch = useDispatch();
  const { notify } = useNotifications();
  const { boards, projects } = useSelector((state) => state.projects);

  const getProjectBoards = () => {
    const project = projects.entities[projectId];
    if (!project) return [];
    return project.boardIds.map((bid) => boards.entities[bid]);
  };

  const projectBoards = getProjectBoards();

  const createBoard = (title) => {
    if (!projectId) return;
    dispatch(addBoard({ projectId, title }));
    notify(`Board "${title}" created`, 'success');
  };

  const removeBoard = (boardId) => {
    dispatch(deleteBoard({ boardId, projectId }));
    notify('Board removed', 'error');
  };

  return {
    boards: projectBoards,
    createBoard,
    removeBoard,
  };
};
