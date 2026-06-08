import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  return (
    <UserContext.Provider
      value={{ loading, setLoading, suggestedUsers, setSuggestedUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};
