import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useBoards } from '../hooks/useBoards';
import BoardColumn from '../components/board/BoardColumn';
import TaskModal from '../components/modals/TaskModal';
import './ProjectBoard.css';

const ProjectBoard = () => {
  const { id } = useParams();
  const { setSelectedProject } = useProjects();
  const { boards, createBoard } = useBoards(id);

  useEffect(() => {
    setSelectedProject(id);
  }, [id, setSelectedProject]);

  const handleAddBoard = () => {
    const title = prompt('Enter board title (e.g., To Do, In Progress):');
    if (title) createBoard(title);
  };

  if (!id) return <div>Project not found</div>;

  return (
    <div className="project-board">
      <div className="board-actions">
        <div className="action-left">
          <div className="board-info">
             <div className="board-avatars">
                <img src="https://i.pravatar.cc/150?u=1" alt="user" />
                <img src="https://i.pravatar.cc/150?u=2" alt="user" />
                <button className="add-member-btn">+</button>
             </div>
             <span className="divider" />
             <div className="board-stats">
                <span>{boards.length} Boards</span>
             </div>
          </div>
        </div>

        <div className="action-right">
          <button className="btn-secondary glass">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="btn-secondary glass">
            <ArrowUpDown size={18} />
            <span>Sort</span>
          </button>
          <button className="btn-primary" onClick={handleAddBoard}>
            <Plus size={18} />
            <span>Add Board</span>
          </button>
        </div>
      </div>

      <div className="board-container">
        {boards.length === 0 ? (
          <div className="empty-board">
            <p>No boards yet. Start by adding one!</p>
            <button className="btn-primary" onClick={handleAddBoard}>Add First Board</button>
          </div>
        ) : (
          <div className="boards-scroll-area">
            {boards.map((board) => (
              <BoardColumn key={board.id} board={board} />
            ))}
            <button className="add-board-column glass" onClick={handleAddBoard}>
              <Plus size={24} />
              <span>Add Column</span>
            </button>
          </div>
        )}
      </div>

      <TaskModal />
    </div>
  );
};

export default ProjectBoard;
