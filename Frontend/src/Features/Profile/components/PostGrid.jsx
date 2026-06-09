import React from "react";

const PostGrid = ({ posts }) => {
  // Pre-selected high-quality coder/developer mock images matching the screenshot
  const mockPosts = [
    { id: 1, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80", likesCount: 128, commentsCount: 14 },
    { id: 2, imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=80", likesCount: 95, commentsCount: 8 },
    { id: 3, imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80", likesCount: 210, commentsCount: 32 },
    { id: 4, imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=80", likesCount: 64, commentsCount: 5 },
    { id: 5, imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80", likesCount: 180, commentsCount: 22 },
    { id: 6, imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&auto=format&fit=crop&q=80", likesCount: 142, commentsCount: 17 }
  ];

  const displayPosts = posts && posts.length > 0 ? posts : mockPosts;

  return (
    <div className="profile-posts-grid">
      {displayPosts.map((post) => (
        <div key={post.id || post._id} className="grid-post-card">
          <img
            src={post.imageUrl || post.image}
            alt={post.caption || "Profile post"}
            className="grid-post-img"
            loading="lazy"
          />
          <div className="post-overlay">
            <div className="overlay-stats">
              {/* Overlay stats showing likes/comments */}
              <span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {post.likesCount || 0}
              </span>
              <span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
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
