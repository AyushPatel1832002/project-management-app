import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject, deleteProject, selectProject } from '../store/slices/projectSlice';
import { useNotifications } from './useNotifications';

export const useProjects = () => {
  const dispatch = useDispatch();
  const { notify } = useNotifications();
  const { projects, selectedProjectId } = useSelector((state) => state.projects);

  const projectList = projects.ids.map((id) => projects.entities[id]);
  const currentProject = projects.entities[selectedProjectId] || null;

  const createProject = (name, description) => {
    const id = Date.now().toString();
    dispatch(addProject({ id, name, description }));
    notify(`Project "${name}" created successfully`, 'success');
    return id;
  };

  const editProject = (id, updates) => {
    dispatch(updateProject({ id, ...updates }));
    notify('Project updated', 'success');
  };

  const removeProject = (id) => {
    const project = projects.entities[id];
    dispatch(deleteProject(id));
    notify(`Project "${project?.name}" removed`, 'error');
  };

  const setSelectedProject = (id) => {
    dispatch(selectProject(id));
  };

  return {
    projects: projectList,
    currentProject,
    selectedProjectId,
    createProject,
    editProject,
    removeProject,
    setSelectedProject,
  };
};
