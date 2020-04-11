import * as React from "react";
import FormTask from "../components/FormTask";
import { TaskPanelWrapper } from "../components/Styles";

const TaskPanel = () => {
  return (
    <TaskPanelWrapper>
      <FormTask />
    </TaskPanelWrapper>
  );
};

export default TaskPanel;
