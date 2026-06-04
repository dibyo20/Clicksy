import React, { useState, useRef } from "react";
import "../styles/CreatePostModal.scss";

const CreatePostModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  user,
  isSubmitting = false,
  error = ""
}) => {
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const { fullname, profileImage } = user || {};

  const handleFileChange = (e) => {
    setLocalError("");
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setLocalError("Please select an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setLocalError("File is too large. Maximum size is 5MB.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setLocalError("");
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setLocalError("Please drop an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setLocalError("File is too large. Maximum size is 5MB.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setLocalError("Please select an image first.");
      return;
    }

    setLocalError("");
    // Delegate submission to custom hook/state/api handler prop
    if (onSubmit) {
      onSubmit({ 
        caption, 
        image: selectedFile,
        onSuccess: () => {
          setCaption("");
          setSelectedFile(null);
          setImagePreview(null);
        }
      });
    }
  };

  const displayError = error || localError;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Create New Post</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
            {displayError && <div className="error-message">{displayError}</div>}

            {/* Author info */}
            <div className="modal-author">
              <img
                src={profileImage || "https://ik.imagekit.io/ufnhisesq/instagram-posts/istockphoto-2177842022-1024x1024.jpg"}
                alt={fullname || "User Avatar"}
                className="author-avatar"
              />
              <span className="author-name">{fullname || "Clickly Member"}</span>
            </div>

            {/* Caption text area */}
            <div className="form-group caption-group">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind? Add #hashtags..."
                maxLength={400}
                required
              />
            </div>

            {/* File upload/preview area */}
            <div
              className={`upload-area ${imagePreview ? "has-preview" : ""}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => !imagePreview && fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden-input"
              />

              {imagePreview ? (
                <div className="preview-container">
                  <img src={imagePreview} alt="Selected preview" className="preview-img" />
                  <button type="button" className="remove-preview-btn" onClick={removeSelectedImage} aria-label="Remove image">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon-wrapper">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <p className="main-prompt">Drag your photo here or click to browse</p>
                  <p className="sub-prompt">Supports JPEG, PNG up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          <footer className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting || !selectedFile}>
              {isSubmitting ? (
                <div className="btn-spinner-container">
                  <span className="spinner"></span>
                  <span>Sharing...</span>
                </div>
              ) : (
                "Share Post"
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;