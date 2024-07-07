import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      setTitleError("Task name is required");
      return;
    }
    if (!description) {
      setDescriptionError("Task description is required");
      return;
    }
    const { data } = await axios
      .post("http://localhost:3000/tasks", {
        title,
        description,
        status: "pending",
      })
      .catch((err) => {
        const error = new Error(err.response.data);
        error.code = err.response.status;
        throw error;
      });
    navigate("/home");
  };
  return (
    <form>
      <label>Task Name:</label>
      <input
        type="text"
        name="taskName"
        className="form-control"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <span className="text-danger d-block fw-bold">{titleError}</span>
      <label>Task Description:</label>
      <textarea
        name="taskDescription"
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="text-danger d-block fw-bold">{descriptionError}</span>

      <button type="submit" onClick={submitHandler} className="btn btn-primary">
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
