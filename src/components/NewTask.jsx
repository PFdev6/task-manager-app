import * as React from "react";
import { FormGroup, Input } from "reactstrap";

const NewTask = props => {
  const [header, setHeader] = React.useState("");
  const [content, setContent] = React.useState("");
  const [endDate, setEndDate] = React.useState(
    new Date().toISOString().substr(0, 16)
  );
  const typeTask = props.typeTask === "Subtask" ? props.typeTask : "Task";
  const id = props.id;
  const headerName = `header_${id}`;
  const contentName = `content_${id}`;
  const endDateName = `endDate_${id}`;

  return (
    <>
      <FormGroup>
        <Input
          required={true}
          type="text"
          name={headerName}
          value={header}
          onChange={e => setHeader(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="textarea"
          name={contentName}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          required={true}
          type="datetime-local"
          name={endDateName}
          value={endDate}
          min={new Date().toISOString().substr(0, 16)}
          onChange={e => setEndDate(e.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default NewTask;
