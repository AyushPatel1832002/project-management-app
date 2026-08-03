import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Trash2, Save } from 'lucide-react';
import { useModal } from '../../hooks/useModal';
import { useTasks } from '../../hooks/useTasks';
import { useUsers } from '../../hooks/useUsers';
import { useAuth } from '../../hooks/useAuth';
import { canManageTasks } from '../../utils/permissions';
import './Modal.css';


const TaskModal = () => {
  const { isOpen, closeModal, modalData, openModal } = useModal();
  const { createTask, editTask, removeTask } = useTasks(modalData?.boardId);
  const { users } = useUsers();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (modalData?.mode !== 'create' && modalData) {
      setTitle(modalData.title || '');
      setDescription(modalData.description || '');
      setPriority(modalData.priority || 'Medium');
      setAssigneeId(modalData.assigneeId || '');
      setDueDate(modalData.dueDate ? modalData.dueDate.split('T')[0] : new Date().toISOString().split('T')[0]);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setAssigneeId('');
      setDueDate(new Date().toISOString().split('T')[0]);
    }
  }, [modalData]);

  if (!isOpen('task')) return null;

  const isViewOnly = modalData.mode === 'view' || !canManageTasks(user?.role);

  const handleSave = (e) => {
    e.preventDefault();
    if (!canManageTasks(user?.role)) {
      closeModal();
      return;
    }
    const taskData = {
      title,
      description,
      priority,
      assigneeId,
      dueDate,
      assignee: users.find(u => u.id === assigneeId)?.name,
      assigneeAvatar: users.find(u => u.id === assigneeId)?.avatar,
    };

    if (modalData.mode === 'create') {
      createTask(taskData);
    } else {
      editTask(modalData.id, taskData);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!canManageTasks(user?.role)) {
      return;
    }
    if (window.confirm('Are you sure you want to delete this task?')) {
      removeTask(modalData.id);
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={closeModal}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="modal-content glass glass-shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="modal-header">
            <h3>{modalData.mode === 'create' ? 'Create New Task' : modalData.mode === 'edit' ? 'Edit Task' : 'Task Details'}</h3>
            <button className="close-btn glass" onClick={closeModal}><X size={20} /></button>
          </header>

          <form onSubmit={handleSave} className="modal-body">
            <div className="modal-group">
              <label>Task Title</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isViewOnly}
              />
            </div>

            <div className="modal-group">
              <label>Description</label>
              <textarea 
                className="input-field textarea" 
                placeholder="Add more details..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isViewOnly}
              />
            </div>

            <div className="modal-row">
              <div className="modal-group flex-1">
                <label><Tag size={14} /> Priority</label>
                <select 
                  className="input-field" 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={isViewOnly}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="modal-group flex-1">
                <label><Calendar size={14} /> Due Date</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isViewOnly}
                />
              </div>
            </div>

            <div className="modal-group">
              <label><User size={14} /> Assignee</label>
              <select 
                className="input-field" 
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                disabled={isViewOnly}
              >
                <option value="">Unassigned</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            {!isViewOnly && (
              <div className="modal-footer">
                {modalData.mode === 'edit' && (
                  <button type="button" className="btn-danger" onClick={handleDelete}>
                    <Trash2 size={18} />
                    <span>Delete</span>
                  </button>
                )}
                <button type="submit" className="btn-primary flex-1">
                  <Save size={18} />
                  <span>{modalData.mode === 'create' ? 'Create Task' : 'Save Changes'}</span>
                </button>
              </div>
            )}

            {isViewOnly && canManageTasks(user?.role) && (
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-primary flex-1" 
                  onClick={() => openModal('task', { ...modalData, mode: 'edit' })}
                >
                  Edit Task
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;
