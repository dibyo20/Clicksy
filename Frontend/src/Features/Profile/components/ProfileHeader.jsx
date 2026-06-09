import React from "react";

const ProfileHeader = ({ user, onViewFollowers, onViewFollowing }) => {
  // Use user data if available, fallback to mock data matching the screenshot
  const fullname = user?.fullname || "Dibyo Banerjee";
  const username = user?.username ? `@${user.username}` : "@dibyo_banerjee__";
  const profileImage = user?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
  const bio = user?.bio || "Full Stack Developer | Building scalable web applications | Coffee lover ☕";
  const postsCount = user?.postsCount !== undefined ? user.postsCount : 128;
  const followersCount = user?.followersCount || "3.4K";
  const followingCount = user?.followingCount !== undefined ? user.followingCount : 512;

  return (
    <div className="profile-header">
      {/* Avatar Container with glowing border and online dot */}
      <div className="profile-avatar-wrapper">
        <div className="avatar-ring">
          <img src={profileImage} alt={fullname} className="profile-avatar-img" />
        </div>
        <span className="online-badge" />
      </div>

      {/* User Details */}
      <div className="profile-details">
        <h2 className="profile-name">
          {fullname}
          <span className="badges">
            {/* Verified Badge */}
            <svg
              className="badge-verified"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {/* Sparkles Badge */}
            <svg
              className="badge-sparkles"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M9 21.5L7.75 16.5L2.75 15.25L7.75 14L9 9L10.25 14L15.25 15.25L10.25 16.5L9 21.5ZM19 12.5L18.4 10.1L16 9.5L18.4 8.9L19 6.5L19.6 8.9L22 9.5L19.6 10.1L19 12.5ZM16.5 6.5L16.05 4.7L14.25 4.25L16.05 3.8L16.5 2L16.95 3.8L18.75 4.25L16.95 4.7L16.5 6.5Z" />
            </svg>
            {/* Trophy Badge */}
            <svg
              className="badge-trophy"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
              <path d="M12 2a6 6 0 0 1 6 6c0 3.3-2.18 6.08-5.12 7.02l-.88.29-.88-.29A7.26 7.26 0 0 1 6 8a6 6 0 0 1 6-6z" />
            </svg>
          </span>
        </h2>
        <p className="profile-username">{username}</p>
        <p className="profile-bio">{bio}</p>
      </div>

      {/* Stats Row */}
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">{postsCount}</span>
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

      {/* Tabs Row + Edit Button */}
      <div className="profile-tabs-row">
        <div className="posts-tab-active">
          <span>POSTS</span>
        </div>
        <button className="edit-profile-btn">
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
