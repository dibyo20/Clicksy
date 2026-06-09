import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import PostGrid from "../components/PostGrid.jsx";
import ConnectionsModal from "../components/ConnectionsModal.jsx";
import { useAuth } from "../../Auth/hooks/useAuth.js";
import "../styles/Profile.scss";

const Profile = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("followers"); // 'followers' or 'following'

  const handleViewFollowers = () => {
    setModalType("followers");
    setIsModalOpen(true);
  };

  const handleViewFollowing = () => {
    setModalType("following");
    setIsModalOpen(true);
  };

  return (
    <main className="main-content profile-main">
      <div className="profile-container">
        <ProfileHeader
          user={user}
          onViewFollowers={handleViewFollowers}
          onViewFollowing={handleViewFollowing}
        />
        <PostGrid posts={user?.posts} />
      </div>

      <ConnectionsModal
        key={modalType}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </main>
  );
};

export default Profile;
