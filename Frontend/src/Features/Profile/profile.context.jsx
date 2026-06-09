import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, loading, setLoading, following, setFollowing, followers, setFollowers, followingCount, setFollowingCount, followersCount, setFollowersCount }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
