import React, { useState, useEffect } from "react";

const EditProfileModal = ({ handleProfileData, profileData, setProfileData, isOpen, onClose, profile }) => {
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");

  // Synchronize state with profile data when modal opens or profile changes
  useEffect(() => {
    if (isOpen && profile) {
      setFullname(profile.fullname || "");
      setBio(profile.bio || "");
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSave = () => {
    
    onClose();
  };

  return (
    <div className="modal-overlay edit-profile-overlay" onClick={onClose}>
      <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="edit-profile-header">
          <h3 className="modal-title">Edit Profile</h3>
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
        <div className="edit-profile-body">

          {/* Display Name Input */}
          <div className="form-group">
            <label className="form-label">DISPLAY NAME</label>
            <input
              type="text"
              className="form-input"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter display name"
            />
          </div>

          {/* Bio Input */}
          <div className="form-group">
            <label className="form-label">BIO</label>
            <textarea
              className="form-textarea"
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Save Button */}
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
