import React from "react";
import { usePost } from "../hooks/usePost.js";
import { useAuth } from "../../Auth/hooks/useAuth.js";
import PostCard from "./PostCard.jsx";

const Post = () => {
  const { feed, loading } = usePost();
  
  const { user } = useAuth();
  const { profileImage } = user || {};

  if (loading || !feed) {
    return (
      <main className="main-content">
        <div className="skeletons-container">
          {[1, 2].map((n) => (
            <div key={n} className="skeleton-post">
              <div className="skeleton-header">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-info">
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line micro"></div>
                </div>
              </div>
              <div className="skeleton-image"></div>
              <div className="skeleton-footer">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      {/* Stories row */}
      <section className="stories-bar">
        {/* Add Story */}
        <div className="story-item add-story">
          <div className="story-avatar-wrapper">
            <img
              src={profileImage}
              alt="Add Story"
              className="story-avatar"
              // onError={(e) => {
              //   e.target.src = "https://ik.imagekit.io/ufnhisesq/instagram-posts/istockphoto-2177842022-1024x1024.jpg";
              // }}
            />
            <div className="plus-badge">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <span className="story-username">Add Story</span>
        </div>

        {/* Mock Follower Stories */}
        <div className="story-item">
          <div className="story-avatar-wrapper ring-active">
            <img src="https://ik.imagekit.io/ufnhisesq/instagram-posts/istockphoto-2177842022-1024x1024.jpg" alt="Test1" className="story-avatar" />
          </div>
          <span className="story-username">Test1</span>
        </div>

        <div className="story-item">
          <div className="story-avatar-wrapper ring-active">
            <img src="https://ik.imagekit.io/ufnhisesq/instagram-posts/istockphoto-2177842022-1024x1024.jpg" alt="Test2" className="story-avatar" />
          </div>
          <span className="story-username">Test2</span>
        </div>

        <div className="story-item">
          <div className="story-avatar-wrapper ring-active">
            <img src="https://ik.imagekit.io/ufnhisesq/instagram-posts/istockphoto-2177842022-1024x1024.jpg" alt="Test3" className="story-avatar" />
          </div>
          <span className="story-username">Test3</span>
        </div>
      </section>

      {/* Posts list */}
      <section className="posts-section">
        {feed.length > 0 ? (
          feed.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              isLiked={false}
              likesCount={0}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon-wrapper">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3>No Posts Yet</h3>
            <p>Follow members or create posts to see updates on your clickly feed.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Post;