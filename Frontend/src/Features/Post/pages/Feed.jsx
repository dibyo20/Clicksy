import React, { useState } from "react";
import CreatePostModal from "../components/CreatePostModal.jsx";
import MobileBottomNav from "../components/MobileBottomNav.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import Post from "../components/Post.jsx";
import SideBar from "../components/SideBar.jsx";
import "../styles/Feed.scss";
import { useAuth } from "../../Auth/hooks/useAuth.js";

const Feed = () => {
  const { user, loading } = useAuth();
  // console.log(user);

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
      <MobileHeader setActiveTab={setActiveTab} />

      <div className="feed-layout">
        <SideBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigationItems={navigationItems}
          user={user}
          setIsModalOpen={setIsModalOpen}
        />

        <Post />
      </div>

      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigationItems={navigationItems}
        setIsModalOpen={setIsModalOpen}
      />

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Feed;
