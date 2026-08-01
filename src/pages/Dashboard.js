import React from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Users, Clock, ArrowRight, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { projects, createProject } = useProjects();
  const navigate = useNavigate();

  const handleCreateProject = () => {
    const name = prompt('Enter project name:');
    if (name) {
      const id = createProject(name, 'A new project for the team.');
      navigate(`/project/${id}`);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="welcome">
          <h2>Hello, {user?.name.split(' ')[0]} 👋</h2>
          <p>Here's what's happening with your projects today.</p>
        </div>
        <button className="btn-primary" onClick={handleCreateProject}>
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-icon p-bg"><FolderKanban /></div>
          <div className="stat-info">
            <span className="stat-label">Active Projects</span>
            <span className="stat-value">{projects.length}</span>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon s-bg"><Users /></div>
          <div className="stat-info">
            <span className="stat-label">Team Members</span>
            <span className="stat-value">12</span>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon a-bg"><Clock /></div>
          <div className="stat-info">
            <span className="stat-label">Tasks Pending</span>
            <span className="stat-value">24</span>
          </div>
        </div>
      </div>

      <section className="projects-section">
        <div className="section-header">
          <h3>Recent Projects</h3>
          <Link to="/projects" className="view-all">View all <ArrowRight size={16} /></Link>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state glass">
             <FolderKanban size={48} className="empty-icon" />
             <p>No projects found. Create your first one!</p>
             <button className="btn-primary" onClick={handleCreateProject}>Get Started</button>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="projects-grid"
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                variants={item}
                className="project-card glass"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="project-card-header">
                  <h4>{project.name}</h4>
                  <div className="project-tag">Active</div>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-footer">
                  <div className="avatars">
                    <img src="https://i.pravatar.cc/150?u=1" alt="user" />
                    <img src="https://i.pravatar.cc/150?u=2" alt="user" />
                    <div className="more">+3</div>
                  </div>
                  <span className="progress">75% Complete</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
