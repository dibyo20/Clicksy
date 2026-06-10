import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import PostGrid from "../components/PostGrid.jsx";
import ConnectionsModal from "../components/ConnectionsModal.jsx";
import EditProfileModal from "../components/EditProfileModal.jsx";
import EditProfilePicModal from "../components/EditProfilePicModal.jsx";
import { useProfile } from "../hooks/useProfile.js";
import { usePost } from "../../Post/hooks/usePost.js";
import "../styles/Profile.scss";

const Profile = () => {
  const { loading, profile, followingCount, followersCount, following, followers, handleProfileData, profilePic, setProfileData, handleProfilePic } = useProfile();
  const { userPosts, userPostsCount } = usePost();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("followers"); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditPicModalOpen, setIsEditPicModalOpen] = useState(false);

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
          loading={loading}
          profile={profile}
          followingCount={followingCount}
          followersCount={followersCount}
          userPostsCount={userPostsCount}
          onViewFollowers={handleViewFollowers}
          onViewFollowing={handleViewFollowing}
          onEditProfile={() => setIsEditModalOpen(true)}
          onEditProfilePic={() => setIsEditPicModalOpen(true)}
        />
        <PostGrid posts={userPosts} />
      </div>

      <ConnectionsModal
        followers={followers}
        following={following}
        key={modalType}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />

      <EditProfileModal
        handleProfileData={handleProfileData}
        setProfileData = {setProfileData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
      />

      <EditProfilePicModal
        handleProfilePic={handleProfilePic}
        isOpen={isEditPicModalOpen}
        onClose={() => setIsEditPicModalOpen(false)}
        profile={profile}
      />
    </main>
  );
};

export default Profile;
