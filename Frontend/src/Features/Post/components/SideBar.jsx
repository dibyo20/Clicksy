import React from "react";

const Sidebar = ({
  activeTab,
  setActiveTab,
  navigationItems,
  user,
  setIsModalOpen,
}) => {
  const { fullname, profileImage } = user || {};
  // console.log(fullname, profileImage);

  return (
    <aside className="left-sidebar">
      <div className="sidebar-header">
        <h1 className="logo-text">Clicksy</h1>
        <span className="logo-subtitle">Premium Social</span>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map(({ name, icon }) => (
          <button
            key={name}
            className={`nav-item ${activeTab === name ? "active" : ""}`}
            onClick={() => setActiveTab(name)}
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{name}</span>
          </button>
        ))}

        <button
          className="create-post-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create Post</span>
        </button>
      </nav>

      {/* Current User Card */}
      <div className="sidebar-footer">
        <div className="user-profile-summary">
          <img src={profileImage} alt={fullname} className="user-avatar" />
          <div className="user-info">
            <span className="user-name">{fullname}</span>
            {/* <span className="user-badge">PRO MEMBER</span> */}
          </div>
        </div>
        <button className="settings-btn" aria-label="Logout/Settings">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
