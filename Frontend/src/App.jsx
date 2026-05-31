import React from "react";
import AppRouter from "./AppRouter.jsx";
import { AuthProvider } from "./Features/Auth/auth.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
