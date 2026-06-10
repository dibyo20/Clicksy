import React from "react";

const PostGrid = ({ posts }) => {

  return (
    <div className="profile-posts-grid">
      {posts?.map((post) => (
        <div key={post._id || post._id} className="grid-post-card">
          <img
            src={post.imgurl}
            alt={post.caption}
            className="grid-post-img"
            loading="lazy"
          />
          <div className="post-overlay">
            <div className="overlay-stats">
              <span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {post.likesCount || 0}
              </span>
              <span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                </svg>
                {post.commentsCount || 0}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
