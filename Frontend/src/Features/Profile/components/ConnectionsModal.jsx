import React, { useState } from "react";

const ConnectionsModal = ({ isOpen, onClose, type }) => {
  // Default mock data matching the user's screenshots
  const defaultFollowers = [
    {
      id: "f1",
      username: "dibyo_banerjee__",
      fullname: "Dibyo Banerjee",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
      isFollowing: false,
      isCurrentUser: true // Can't follow yourself, shows dark outline Follow button
    },
    {
      id: "f2",
      username: "_ambidextrous_dev",
      fullname: "Sabyasachi",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80",
      isFollowing: false
    },
    {
      id: "f3",
      username: "strange__187",
      fullname: "Mainak Majumder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      isFollowing: false
    }
  ];

  const defaultFollowing = [
    {
      id: "fg1",
      username: "ioutstanding_oishani",
      fullname: "Oishani Chakraborty",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
      isFollowing: true
    }
  ];

  // Local state to manage users list and allow interactive toggling
  const [usersList, setUsersList] = useState(() => 
    type === "followers" ? defaultFollowers : defaultFollowing
  );

  if (!isOpen) return null;

  const handleFollowToggle = (userId) => {
    setUsersList((prevList) =>
      prevList.map((u) => {
        if (u.id === userId && !u.isCurrentUser) {
          return { ...u, isFollowing: !u.isFollowing };
        }
        return u;
      })
    );
  };

  return (
    <div className="modal-overlay connections-overlay" onClick={onClose}>
      <div className="connections-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="connections-modal-header">
          <h3 className="modal-title">
            {type === "followers" ? "Followers" : "Following"}
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="connections-modal-body">
          {usersList.length === 0 ? (
            <div className="connections-empty">No users found.</div>
          ) : (
            <div className="connections-list">
              {usersList.map((userItem) => (
                <div key={userItem.id} className="connection-row">
                  {/* User Avatar */}
                  <img
                    src={userItem.avatar}
                    alt={userItem.fullname}
                    className="connection-avatar"
                  />

                  {/* User Names */}
                  <div className="connection-info">
                    <span className="connection-username">{userItem.username}</span>
                    <span className="connection-fullname">{userItem.fullname}</span>
                  </div>

                  {/* Follow/Following Action Button */}
                  <div className="connection-action">
                    {userItem.isCurrentUser ? (
                      <button className="conn-btn btn-self-follow">
                        Follow
                      </button>
                    ) : userItem.isFollowing ? (
                      <button
                        className="conn-btn btn-following"
                        onClick={() => handleFollowToggle(userItem.id)}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="conn-btn btn-follow"
                        onClick={() => handleFollowToggle(userItem.id)}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsModal;
