import * as React from "react";
import FormTask from "../components/FormTask";
import { TaskPanelWrapper } from "../components/Styles";
import { Button } from "reactstrap";
import TaskContainer from "./TaskContainer";

const TaskPanel = () => {
  const addTaskLabel = "Add Task";
  const tasksLabel = "Task List";
  const [currentView, setCurrentView] = React.useState(<TaskContainer />);
  const [viewState, setViewState] = React.useState(true);
  const [buttonLabel, setButtonLabel] = React.useState(addTaskLabel);

  return (
    <TaskPanelWrapper>
      <Button
        onClick={e => {
          setViewState(!viewState);
          viewState
            ? setCurrentView(<TaskContainer />)
            : setCurrentView(<FormTask />);
          viewState ? setButtonLabel(addTaskLabel) : setButtonLabel(tasksLabel);
        }}
        block={true}
      >
        {buttonLabel}
      </Button>

      {currentView}
    </TaskPanelWrapper>
  );
};

export default TaskPanel;
