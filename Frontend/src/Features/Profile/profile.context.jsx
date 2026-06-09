import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, loading, setLoading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
