import React from "react";

const MobileHeader = ({ setActiveTab }) => {
  return (
    <header className="mobile-top-header">
      <h1 className="logo-text">Clicksy</h1>
      <button className="icon-btn" aria-label="Messages" onClick={() => setActiveTab && setActiveTab("Messages")}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </button>
    </header>
  );
};

export default MobileHeader;