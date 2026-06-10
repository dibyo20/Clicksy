import React, { useState, useEffect } from "react";

const EditProfileModal = ({ handleProfileData, isOpen, onClose, profile }) => {
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (isOpen && profile) {
      setFullname(profile.fullname || "");
      setBio(profile.bio || "");
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSave = () => {
    handleProfileData(fullname, bio);
    onClose();
  };

  return (
    <div className="modal-overlay edit-profile-overlay" onClick={onClose}>
      <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
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

        <div className="edit-profile-body">

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

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
