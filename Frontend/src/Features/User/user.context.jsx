import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [requestedUsers, setRequestedUsers] = useState([]);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        suggestedUsers,
        setSuggestedUsers,
        requestedUsers,
        setRequestedUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
