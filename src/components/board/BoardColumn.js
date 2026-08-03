import React from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useModal } from '../../hooks/useModal';
import { useFilterAndSort } from '../../hooks/useFilterAndSort';
import { useBoardDrop } from '../../hooks/useDragAndDrop';
import { useAuth } from '../../hooks/useAuth';
import { canManageTasks } from '../../utils/permissions';
import TaskCard from './TaskCard';

const BoardColumn = ({ board }) => {
  const { tasks: allTasks } = useTasks(board.id);
  const { openModal } = useModal();
  const { applyFilters } = useFilterAndSort();
  const { user } = useAuth();
  const [isOver, drop] = useBoardDrop(board.id);

  const filteredTasks = applyFilters(allTasks);

  const handleAddTask = () => {
    if (!canManageTasks(user?.role)) {
      return;
    }
    openModal('task', { boardId: board.id, mode: 'create' });
  };

  return (
    <div 
      ref={drop}
      className={`board-column glass ${isOver ? 'over' : ''}`}
    >
      <div className="column-header">
        <h3 className="column-title">
          {board.title}
          <span className="count">{filteredTasks.length}</span>
        </h3>
        <button className="column-more glass">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} boardId={board.id} />
        ))}
      </div>

      {canManageTasks(user?.role) && (
        <button className="add-task-btn" onClick={handleAddTask}>
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      )}
    </div>
  );
};

export default BoardColumn;
