import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/LogoutButton.scss";

/**
 * Layer 4: UI Presentation Component for Authentication Logout.
 * Uses useAuth hook (Layer 3) to execute backend signout and navigate cleanly.
 */
const LogoutButton = ({ variant = "sidebar", showText = true, className = "", title = "Logout" }) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogoutClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await handleLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "pill":
        return "logout-btn-pill";
      case "icon":
        return "logout-btn-icon";
      case "sidebar":
      default:
        return "logout-btn-sidebar";
    }
  };

  return (
    <div className="logout-btn-wrapper">
      <button
        type="button"
        onClick={onLogoutClick}
        disabled={isLoggingOut}
        className={`${getVariantClass()} ${className}`}
        aria-label="Logout"
        title={title}
      >
        {isLoggingOut ? (
          <div className="logout-spinner" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        )}

        {variant !== "icon" && showText && (
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        )}
      </button>
    </div>
  );
};

export default LogoutButton;
