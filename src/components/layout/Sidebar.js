import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  Layout
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';
import './Layout.css';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { logout, user } = useAuth();
  const { projects, createProject } = useProjects();
  const navigate = useNavigate();

  const handleAddProject = () => {
    const name = prompt('Enter project name:');
    if (name) {
      const id = createProject(name, 'My project description');
      navigate(`/project/${id}`);
    }
  };

  return (
    <aside className={`sidebar glass ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <span className="logo-text">FlowTask</span>}
        <button 
          className="collapse-btn glass" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BarChart3 size={20} />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        
        <div className="nav-group">
          <div className="nav-group-header">
            <Layout size={16} />
            {!isCollapsed && <span>Projects</span>}
            {!isCollapsed && (
              <button className="add-project-btn" onClick={handleAddProject}>
                <PlusCircle size={16} />
              </button>
            )}
          </div>
          <div className="nav-projects-list">
            {projects.map((project) => (
              <NavLink 
                key={project.id} 
                to={`/project/${project.id}`} 
                className={({ isActive }) => `nav-project ${isActive ? 'active' : ''}`}
              >
                <div className="project-dot" />
                {!isCollapsed && <span>{project.name}</span>}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="user-profile">
            <img src={user?.avatar} alt={user?.name} className="avatar" />
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
        )}
        <button className="nav-item logout-btn" onClick={logout}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
