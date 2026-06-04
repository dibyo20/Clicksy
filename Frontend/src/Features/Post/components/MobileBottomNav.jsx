import React from "react";

const MobileBottomNav = ({ 
  activeTab, 
  setActiveTab, 
  navigationItems, 
  setIsModalOpen 
}) => {
  return (
    <nav className="mobile-bottom-nav">
      {navigationItems.map(({ name, icon }) => (
        <button
          key={name}
          className={`mobile-nav-item ${activeTab === name ? "active" : ""}`}
          onClick={() => setActiveTab && setActiveTab(name)}
        >
          {icon}
        </button>
      ))}
      {/* FAB on mobile for post creation */}
      <button className="mobile-nav-item fab" onClick={() => setIsModalOpen && setIsModalOpen(true)} aria-label="Create Post">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </nav>
  );
};

export default MobileBottomNav;