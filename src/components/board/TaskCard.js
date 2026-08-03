import React from 'react';
import { Clock, MessageSquare, MoreHorizontal, User } from 'lucide-react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../../hooks/useAuth';
import { canManageTasks } from '../../utils/permissions';
import './Board.css';

const TaskCard = ({ task, boardId }) => {
  const { drag, isDragging } = useDragAndDrop(task.id, boardId);
  const { openModal } = useModal();
  const { user } = useAuth();

  const handleEdit = (e) => {
    e.stopPropagation();
    if (!canManageTasks(user?.role)) {
      return;
    }
    openModal('task', { ...task, mode: 'edit' });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div 
      ref={drag}
      className={`task-card glass ${isDragging ? 'dragging' : ''}`}
      onClick={() => openModal('task', { ...task, mode: 'view' })}
    >
      <div className="task-header">
        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
        {canManageTasks(user?.role) && (
          <button className="task-more glass" onClick={handleEdit}>
            <MoreHorizontal size={14} />
          </button>
        )}
      </div>

      <h4 className="task-title">{task.title}</h4>
      <p className="task-body">{task.description}</p>

      <div className="task-footer">
        <div className="task-meta">
          <div className="meta-item">
            <Clock size={12} />
            <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="meta-item">
            <MessageSquare size={12} />
            <span>3</span>
          </div>
        </div>
        <div className="task-assignee">
           {task.assignee ? (
              <img src={task.assigneeAvatar} alt={task.assignee} className="mini-avatar" />
           ) : (
              <div className="mini-avatar empty"><User size={12} /></div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
