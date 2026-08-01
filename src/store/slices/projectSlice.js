import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  projects: {
    ids: [],
    entities: {},
  },
  boards: {
    ids: [],
    entities: {},
  },
  tasks: {
    ids: [],
    entities: {},
  },
  selectedProjectId: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Project Reducers
    addProject: (state, action) => {
      const { id = uuidv4(), name, description } = action.payload;
      state.projects.ids.push(id);
      state.projects.entities[id] = { id, name, description, boardIds: [] };
      if (!state.selectedProjectId) state.selectedProjectId = id;
    },
    updateProject: (state, action) => {
      const { id, ...updates } = action.payload;
      if (state.projects.entities[id]) {
        state.projects.entities[id] = { ...state.projects.entities[id], ...updates };
      }
    },
    deleteProject: (state, action) => {
      const id = action.payload;
      const project = state.projects.entities[id];
      if (project) {
        // Cleanup boards and tasks
        project.boardIds.forEach((boardId) => {
          const board = state.boards.entities[boardId];
          if (board) {
            board.taskIds.forEach((taskId) => {
              delete state.tasks.entities[taskId];
              state.tasks.ids = state.tasks.ids.filter((tid) => tid !== taskId);
            });
            delete state.boards.entities[boardId];
            state.boards.ids = state.boards.ids.filter((bid) => bid !== boardId);
          }
        });
        delete state.projects.entities[id];
        state.projects.ids = state.projects.ids.filter((pid) => pid !== id);
        if (state.selectedProjectId === id) {
          state.selectedProjectId = state.projects.ids[0] || null;
        }
      }
    },
    selectProject: (state, action) => {
      state.selectedProjectId = action.payload;
    },

    // Board Reducers
    addBoard: (state, action) => {
      const { projectId, id = uuidv4(), title } = action.payload;
      if (state.projects.entities[projectId]) {
        state.boards.ids.push(id);
        state.boards.entities[id] = { id, title, projectId, taskIds: [] };
        state.projects.entities[projectId].boardIds.push(id);
      }
    },
    deleteBoard: (state, action) => {
      const { boardId, projectId } = action.payload;
      const board = state.boards.entities[boardId];
      if (board) {
        // Cleanup tasks
        board.taskIds.forEach((taskId) => {
          delete state.tasks.entities[taskId];
          state.tasks.ids = state.tasks.ids.filter((tid) => tid !== taskId);
        });
        delete state.boards.entities[boardId];
        state.boards.ids = state.boards.ids.filter((bid) => bid !== boardId);
        if (state.projects.entities[projectId]) {
          state.projects.entities[projectId].boardIds = 
            state.projects.entities[projectId].boardIds.filter((bid) => bid !== boardId);
        }
      }
    },

    // Task Reducers
    addTask: (state, action) => {
      const { boardId, id = uuidv4(), ...taskData } = action.payload;
      if (state.boards.entities[boardId]) {
        state.tasks.ids.push(id);
        state.tasks.entities[id] = { id, boardId, ...taskData };
        state.boards.entities[boardId].taskIds.push(id);
      }
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      if (state.tasks.entities[id]) {
        state.tasks.entities[id] = { ...state.tasks.entities[id], ...updates };
      }
    },
    deleteTask: (state, action) => {
      const { taskId, boardId } = action.payload;
      if (state.tasks.entities[taskId]) {
        delete state.tasks.entities[taskId];
        state.tasks.ids = state.tasks.ids.filter((id) => id !== taskId);
        if (state.boards.entities[boardId]) {
          state.boards.entities[boardId].taskIds = 
            state.boards.entities[boardId].taskIds.filter((id) => id !== taskId);
        }
      }
    },
    moveTask: (state, action) => {
      const { taskId, fromBoardId, toBoardId, index } = action.payload;
      const task = state.tasks.entities[taskId];
      if (task && state.boards.entities[fromBoardId] && state.boards.entities[toBoardId]) {
        // Remove from source
        state.boards.entities[fromBoardId].taskIds = 
          state.boards.entities[fromBoardId].taskIds.filter((id) => id !== taskId);
        
        // Add to destination
        const targetTaskIds = state.boards.entities[toBoardId].taskIds;
        targetTaskIds.splice(index, 0, taskId);
        
        // Update task's board assignment
        task.boardId = toBoardId;
      }
    },
  },
});

export const { 
  addProject, updateProject, deleteProject, selectProject, 
  addBoard, deleteBoard, 
  addTask, updateTask, deleteTask, moveTask 
} = projectSlice.actions;

export default projectSlice.reducer;
