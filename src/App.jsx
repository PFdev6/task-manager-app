import * as React from "react";

import RootContainer from "./containers/RootContainer";

import AuthContextProvider from "./contexts/AuthContext";
import TaskContextProvider from "./contexts/TaskContext";

const App = () => {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <RootContainer />
      </TaskContextProvider>
    </AuthContextProvider>
  );
};

export default App;
