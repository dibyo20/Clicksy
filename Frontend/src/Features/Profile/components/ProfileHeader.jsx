import React from "react";

const ProfileHeader = ({ loading, profile, followingCount, followersCount, userPostsCount, onViewFollowers, onViewFollowing, onEditProfile, onEditProfilePic }) => {
  const { fullname, username, profileImage, bio } = profile || {};

  return (
    <div className="profile-header">
      <div className="profile-avatar-wrapper">
        <div className="avatar-ring">
          <img src={profileImage} alt={fullname} className="profile-avatar-img" />
        </div>
        <button className="profile-camera-btn" onClick={onEditProfilePic} aria-label="Change profile picture">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>

      <div className="profile-details">
        <h2 className="profile-name">
          {fullname}
          <span className="badges">
            <svg
              className="badge-verified"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </span>
        </h2>
        <p className="profile-username">{username}</p>
        <p className="profile-bio">{bio}</p>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">{userPostsCount}</span>
          <span className="stat-label">POSTS</span>
        </div>
        <div className="stat-item clickable" onClick={onViewFollowers}>
          <span className="stat-number">{followersCount}</span>
          <span className="stat-label">FOLLOWERS</span>
        </div>
        <div className="stat-item clickable" onClick={onViewFollowing}>
          <span className="stat-number">{followingCount}</span>
          <span className="stat-label">FOLLOWING</span>
        </div>
      </div>

      <div className="profile-tabs-row">
        <div className="posts-tab-active">
          <span>POSTS</span>
        </div>
        <button className="edit-profile-btn" onClick={onEditProfile}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
          </svg>
          <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
