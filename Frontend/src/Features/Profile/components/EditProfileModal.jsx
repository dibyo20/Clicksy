import React, { useState, useEffect } from "react";

const EditProfileModal = ({ isOpen, onClose, profile }) => {
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);

  // Synchronize state with profile data when modal opens or profile changes
  useEffect(() => {
    if (isOpen && profile) {
      setFullname(profile.fullname || "");
      setBio(profile.bio || "");
      setProfilePic(profile.profileImage || "");
      setProfilePicFile(null);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Saving changes:", { fullname, bio, profilePicFile });
    // The user will integrate their four-layer architecture here later.
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
          {/* Change Profile Picture */}
          <div className="form-group">
            <label className="form-label">PROFILE PICTURE</label>
            <div
              className="banner-upload-box profile-pic-upload-box"
              onClick={() => document.getElementById("profile-pic-input").click()}
              style={{
                backgroundImage: profilePic ? `url(${profilePic})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              {/* Blur/dark overlay for visual contrast when hover/image exists */}
              <div className={`upload-overlay ${profilePic ? "has-image" : ""}`}>
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="upload-icon"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="upload-text">Change profile picture</span>
              </div>
            </div>
            <input
              id="profile-pic-input"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
          </div>

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
