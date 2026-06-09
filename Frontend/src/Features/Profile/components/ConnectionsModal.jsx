import React, { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile.js";
import { useUser } from "../../User/hooks/useUser.js";

const ConnectionsModal = ({ isOpen, onClose, type, followers, following }) => {
  const { setFollowers, setFollowersCount, setFollowingCount, profile } = useProfile();
  const { handleFollowUser, handleUnfollowUser } = useUser();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (type === "followers") {
      setUsersList(followers || []);
    } else {
      const followingList = (following || []).map((user) => ({
        ...user,
        isFollowing: true,
      }));
      setUsersList(followingList);
    }
  }, [type, followers, following]);

  if (!isOpen) return null;

  const handleRemoveFollower = (targetUsername) => {
    // 1. Remove from local list state
    setUsersList((prevList) => prevList.filter((u) => u.username !== targetUsername));
    // 2. Remove from profile context followers list
    setFollowers((prev) => (prev ? prev.filter((u) => u.username !== targetUsername) : []));
    // 3. Decrement followers count in profile context
    setFollowersCount((prev) => Math.max(0, prev - 1));
  };

  const handleFollowingToggle = async (targetUser) => {
    const currentState = targetUser.isFollowing; // true (following), false (not following), "requested"

    if (currentState === true) {
      // Transition: Following -> Follow
      setUsersList((prevList) =>
        prevList.map((u) =>
          u.username === targetUser.username ? { ...u, isFollowing: false } : u
        )
      );
      setFollowingCount((prev) => Math.max(0, prev - 1));
      try {
        await handleUnfollowUser(targetUser.username);
      } catch (error) {
        // Rollback
        setUsersList((prevList) =>
          prevList.map((u) =>
            u.username === targetUser.username ? { ...u, isFollowing: true } : u
          )
        );
        setFollowingCount((prev) => prev + 1);
        console.error("Failed to unfollow user:", error);
      }
    } else if (currentState === false) {
      // Transition: Follow -> Requested (Pending status)
      setUsersList((prevList) =>
        prevList.map((u) =>
          u.username === targetUser.username ? { ...u, isFollowing: "requested" } : u
        )
      );
      try {
        await handleFollowUser(targetUser.username);
      } catch (error) {
        // Rollback
        setUsersList((prevList) =>
          prevList.map((u) =>
            u.username === targetUser.username ? { ...u, isFollowing: false } : u
          )
        );
        console.error("Failed to follow user:", error);
      }
    } else if (currentState === "requested") {
      // Transition: Requested -> Follow (Cancel pending follow request)
      setUsersList((prevList) =>
        prevList.map((u) =>
          u.username === targetUser.username ? { ...u, isFollowing: false } : u
        )
      );
      try {
        await handleUnfollowUser(targetUser.username);
      } catch (error) {
        // Rollback
        setUsersList((prevList) =>
          prevList.map((u) =>
            u.username === targetUser.username ? { ...u, isFollowing: "requested" } : u
          )
        );
        console.error("Failed to cancel request:", error);
      }
    }
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
              {usersList.map((userItem) => {
                const isCurrentUser = profile && userItem.username === profile.username;
                return (
                  <div key={userItem._id || userItem.id} className="connection-row">
                    {/* User Avatar */}
                    <img
                      src={userItem.profileImage || userItem.avatar || "https://ik.imagekit.io/ufnhisesq/instagram-posts/istockphoto-2177842022-1024x1024.jpg"}
                      alt={userItem.fullname}
                      className="connection-avatar"
                    />

                    {/* User Names */}
                    <div className="connection-info">
                      <span className="connection-username">{userItem.username}</span>
                      <span className="connection-fullname">{userItem.fullname}</span>
                    </div>

                    {/* Action Button */}
                    <div className="connection-action">
                      {type === "followers" ? (
                        <button
                          className="conn-btn btn-remove"
                          onClick={() => handleRemoveFollower(userItem.username)}
                        >
                          Remove
                        </button>
                      ) : isCurrentUser ? (
                        <button className="conn-btn btn-self-follow">
                          Follow
                        </button>
                      ) : userItem.isFollowing === true ? (
                        <button
                          className="conn-btn btn-following"
                          onClick={() => handleFollowingToggle(userItem)}
                        >
                          Following
                        </button>
                      ) : userItem.isFollowing === "requested" ? (
                        <button
                          className="conn-btn btn-requested"
                          onClick={() => handleFollowingToggle(userItem)}
                        >
                          Requested
                        </button>
                      ) : (
                        <button
                          className="conn-btn btn-follow"
                          onClick={() => handleFollowingToggle(userItem)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsModal;
