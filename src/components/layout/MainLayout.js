import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';
import { usePersistedState } from '../../hooks/usePersistedState';

const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = usePersistedState('sidebar-collapsed', false);

  return (
    <div className={`main-layout ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="content-area">
        <Header />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
