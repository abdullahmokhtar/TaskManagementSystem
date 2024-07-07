import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/${id}`);
        setTitle(response.data.Title);
        setDescription(response.data.Description);
        setStatus(response.data.Status);
      } catch (error) {
        if (error.response.status === 404) {
          navigate("/not-found", { replace: true });
        } else {
          throw error;
        }
      }
    };
    fetchData();
  }, [id, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError("Task name is required");
      return;
    }

    if (!description.trim()) {
      setDescriptionError("Task description is required");
      return;
    }
    console.log(status);
    const { data } = await axios
      .put(`http://localhost:3000/tasks/${id}`, {
        title,
        description,
        status: status,
      })
      .catch((err) => {
        const error = new Error(err.response.data);
        error.code = err.response.status;
        throw error;
      });
    navigate("/home");
  };
  console.log(id);
  return (
    <form>
      <label>Task Name:</label>
      <input
        type="text"
        name="taskName"
        className="form-control"
        value={title}
        onChange={(e) => {
          if (titleError !== "") setTitleError("");
          setTitle(e.target.value);
        }}
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
      <select
        class="form-select my-2"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option defaultValue>Status</option>
        <option value="pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit" onClick={submitHandler} className="btn btn-primary">
        Save Task
      </button>
    </form>
  );
};

export default Edit;
