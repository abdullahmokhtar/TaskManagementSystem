import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTaskById } from "../util/http";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTaskById(id);
      setTask(data);
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <h1>Task Details</h1>
      {task && (
        <div className="w-75 bg-white m-auto shadow p-3">
          <input value={task.Title} className="form-control w-50 my-2" disabled />
          <input value={task.Description} className="form-control w-50 my-2" disabled />
          <input value={task.Status} className="form-control w-50 my-3" disabled />
          <Link to={`/edit/${task.Id}`} className="btn btn-primary">Edit</Link>
          <button className="btn btn-danger mx-3">Delete</button>
          <Link to=".." className="btn btn-info">Back</Link>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
