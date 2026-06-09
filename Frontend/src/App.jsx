import React from "react";
import AppRouter from "./AppRouter.jsx";
import { AuthProvider } from "./Features/Auth/auth.context.jsx";
import { PostContextProvider } from "./Features/Post/post.context.jsx";
import { UserContextProvider } from "./Features/User/user.context.jsx";
import { ProfileContextProvider } from "./Features/Profile/profile.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <UserContextProvider>
          <ProfileContextProvider>
            <AppRouter />
          </ProfileContextProvider>
        </UserContextProvider>
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
