const ComingSoon = ({ title }) => {
  return (
    <main className="main-content">
      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="coming-soon-icon-wrapper">
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="coming-soon-icon"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3>{title} Feature</h3>
          <p>We're working hard to bring this feature to Clicksy. Stay tuned!</p>
          <div className="coming-soon-badge">Coming Soon</div>
        </div>
      </div>
    </main>
  );
};

export default ComingSoon;
