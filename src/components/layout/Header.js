import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { useFilterAndSort } from '../../hooks/useFilterAndSort';
import { useProjects } from '../../hooks/useProjects';
import './Layout.css';

const Header = () => {
  const { filters, setSearching } = useFilterAndSort();
  const { currentProject } = useProjects();

  return (
    <header className="header glass">
      <div className="header-left">
        <h1 className="header-title">
          {currentProject ? currentProject.name : 'Dashboard'}
        </h1>
      </div>

      <div className="header-middle">
        <div className="search-bar glass">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tasks, projects..." 
            value={filters.search}
            onChange={(e) => setSearching(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn glass">
          <HelpCircle size={20} />
        </button>
        <button className="header-icon-btn glass">
          <Bell size={20} />
          <div className="notification-dot" />
        </button>
      </div>
    </header>
  );
};

export default Header;
