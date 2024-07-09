/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "./Tasks.module.css";
import { Link } from "react-router-dom";
import { deleteTask, getAllTasks } from "../util/http";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  useEffect(() => {
    // Fetch tasks from API
    async function getTasks() {
      const { data } = await getAllTasks();

      setTasks(data);
    }
    getTasks();
  }, []);

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const { status } = await deleteTask(id);
        const updatedTasks = tasks.filter((task) => task.Id !== id);
        if (status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
        setTasks(updatedTasks);
      } catch (error) {}
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card mask-custom">
              <div className="card-body p-4 text-white">
                <div className="text-center pt-3 pb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                    alt="Check"
                    width="60"
                  />
                  <h2 className="my-4">Task List</h2>
                </div>

                <Link to="/create" className="btn btn-primary">
                  Create Task
                </Link>
                {tasks?.length === 0 && (
                  <h2 className="text-warning text-center">
                    There is no tasks add some
                  </h2>
                )}
                {tasks?.length > 0 && (
                  <table className="table text-white mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks?.map((task) => (
                        <tr key={task.Id} className="fw-normal">
                          <td
                            className={
                              task.Status === "Completed"
                                ? "text-decoration-line-through"
                                : ""
                            }
                          >
                            {task.Title}
                          </td>
                          <td
                            className={`${
                              task.Status === "Completed" &&
                              "badge bg-success mt-2"
                            }
                            ${
                              task.Status.toLowerCase() === "pending" &&
                              "badge bg-primary mt-2"
                            }
                               ${
                                 task.Status === "In Progress" &&
                                 "badge bg-secondary mt-2"
                               }
                            `}
                          >
                            {task.Status}
                          </td>
                          <td>
                            <Link
                              to={`/taskDetails/${task.Id}`}
                              className="btn btn-info text-white"
                            >
                              Details
                            </Link>
                            <Link
                              to={`/edit/${task.Id}`}
                              className="btn btn-warning mx-2 text-white"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteHandler(task.Id)}
                              className=" btn btn-danger text-white"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
