import React, { useState } from "react";
import "../styles/PostCard.scss";

const PostCard = ({ post, isLiked, handleLike, handleUnlike }) => {
  const { _id, caption, imgurl, user, createdAt } = post;
  const { fullname, username, profileImage } = user;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getRelativeTime = (dateString) => {
    if (!dateString) return "JUST NOW";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "JUST NOW";
    if (diffMins < 60) return `${diffMins} MINUTES AGO`;
    if (diffHours < 24)
      return `${diffHours} ${diffHours === 1 ? "HOUR" : "HOURS"} AGO`;
    return `${diffDays} ${diffDays === 1 ? "DAY" : "DAYS"} AGO`;
  };

  const parseHashtags = (text) => {
    if (!text) return [];
    const matches = text.match(/#[a-zA-Z0-9_]+/g);
    return matches ? matches : [];
  };

  const hashtags = parseHashtags(caption);
  const cleanCaption = caption
    ? caption.replace(/#[a-zA-Z0-9_]+/g, "").trim()
    : "";

  return (
    <article className="post-card">
      {/* Header */}
      <header className="post-header">
        <div className="post-author-info">
          <img src={profileImage} alt={fullname} className="author-avatar" />
          <div className="author-details">
            <h3 className="author-name">{fullname}</h3>
            <p className="post-meta">
              @{username} • {getRelativeTime(createdAt)}
            </p>
          </div>
        </div>
        <button className="menu-btn" aria-label="More options">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
        </button>
      </header>

      {/* Image */}
      <div className="post-image-wrapper">
        <img
          src={imgurl}
          alt="Post content"
          className="post-image"
          loading="lazy"
        />
      </div>

      {/* Footer / Interaction */}
      <footer className="post-footer">
        <div className="interaction-bar">
          <div className="left-interactions">
            {/* On click triggers onLike event prop */}
            <button
              onClick={() =>
                isLiked ? handleUnlike(post._id)  : handleLike(post._id)
              }
              className={`action-btn like-btn ${isLiked ? "liked" : ""}`}
              aria-label={isLiked ? "Unlike post" : "Like post"}
            >
              {isLiked ? (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="heart-filled"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="heart-outline"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
            </button>

            <button className="action-btn comment-btn" aria-label="Comment">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <button className="action-btn share-btn" aria-label="Share">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <button
            onClick={toggleBookmark}
            className={`action-btn bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark post"}
          >
            {isBookmarked ? (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Caption & Hashtags */}
        <div className="post-caption-section">
          <p className="caption-text">
            <span className="caption-username">{username || "anonymous"}</span>{" "}
            {cleanCaption}
          </p>
          {hashtags.length > 0 && (
            <div className="post-tags">
              {hashtags.map((tag, index) => (
                <span key={index} className="tag-pill">
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </footer>
    </article>
  );
};

export default PostCard;
