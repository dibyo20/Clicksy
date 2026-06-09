import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userPostsCount, setUserPostsCount] = useState(0);  

  return (
    <PostContext.Provider value={{ loading, setLoading, feed, setFeed, userPosts, setUserPosts, userPostsCount, setUserPostsCount}}>
      {children}
    </PostContext.Provider>
  );
};
