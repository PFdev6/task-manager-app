import * as React from "react";

import RootContainer from "./containers/RootContainer";

import AuthContextProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <RootContainer />
    </AuthContextProvider>
  );
};

export default App;
