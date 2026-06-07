import { useState } from "react";
import "../styles/UsersModal.scss";

const UsersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock list of users with premium Unsplash avatars
  const [users, setUsers] = useState([
    { 
      id: 1, 
      username: "test1", 
      status: "Follow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
    },
    { 
      id: 2, 
      username: "test2", 
      status: "Follow",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" 
    },
    { 
      id: 3, 
      username: "test3", 
      status: "Follow",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" 
    },
    { 
      id: 4, 
      username: "test4", 
      status: "Follow",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" 
    },
  ]);

  const handleFollowClick = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: user.status === "Follow" ? "Requested" : "Follow",
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="users-modal-overlay" onClick={onClose}>
      <div className="users-modal-window" onClick={(e) => e.stopPropagation()}>
        <header className="users-modal-header">
          <h2 className="users-modal-title">Suggested Users</h2>
          <button className="users-modal-close" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </header>

        <div className="users-modal-content">
          {users.map((u) => (
            <div key={u.id} className="user-card-item">
              <div className="user-card-info">
                <img src={u.avatar} alt={u.username} className="user-card-avatar" />
                <div className="user-card-details">
                  <span className="user-card-name">{u.username}</span>
                  <span className="user-card-subtitle">Suggested for you</span>
                </div>
              </div>
              <button
                className={`user-card-btn ${u.status === "Requested" ? "requested" : "follow"}`}
                onClick={() => handleFollowClick(u.id)}
              >
                {u.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersModal;
