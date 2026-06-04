import React, { useState } from "react";
import CreatePostModal from "../components/CreatePostModal.jsx";
import Post from "../components/Post.jsx";
import "../styles/Feed.scss";
import { useAuth } from "../../Auth/hooks/useAuth.js";

const Feed = () => {
  const { user, loading } = useAuth();

  const [activeTab, setActiveTab] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="feed-loader-container">
        <div className="spinner"></div>
        <p>Loading Clicksy...</p>
      </div>
    );
  }

  const { fullname = "Test", profileImage = "https://ik.imagekit.io/ufnhisesq/instagram-posts/istockphoto-2177842022-1024x1024.jpg" } = user || {};
  {console.log(profileImage)}

  const navigationItems = [
    {
      name: "Home",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: "Reels",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <path d="M3 9h18" />
          <path d="M8 4l3 5" />
          <path d="M15 4l3 5" />
          <polygon points="10 13 16 16 10 19 10 13" />
        </svg>
      ),
    },
    {
      name: "Notifications",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      name: "Messages",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      name: "Profile",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="feed-container">
      {/* Mobile Top Header */}
      <header className="mobile-top-header">
        <h1 className="logo-text">Clicksy</h1>
        <button
          className="icon-btn"
          aria-label="Messages"
          onClick={() => setActiveTab("Messages")}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </button>
      </header>

      {/* Main Grid Layout */}
      <div className="feed-layout">
        {/* Left Sidebar */}
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

            <button className="create-post-btn">
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
              <img
                src={
                  profileImage 
                }
                alt={fullname}
                className="user-avatar"
              />
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

        {/* Center Content Area */}
        <Post />
      </div>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="mobile-bottom-nav">
        {navigationItems.map(({ name, icon }) => (
          <button
            key={name}
            className={`mobile-nav-item ${activeTab === name ? "active" : ""}`}
            onClick={() => setActiveTab(name)}
          >
            {icon}
          </button>
        ))}
        {/* FAB on mobile for post creation */}
        <button
          className="mobile-nav-item fab"
          onClick={() => setIsModalOpen(true)}
          aria-label="Create Post"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </nav>

      {/* Create Post Modal Overlay */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Feed;
