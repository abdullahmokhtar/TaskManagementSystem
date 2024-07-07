import React, { useEffect, useState } from "react";
import "./Tasks.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  useEffect(() => {
    // Fetch tasks from API
    async function getTasks() {
      const data = await fetch("http://localhost:3000/tasks");
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const tasksData = await data.json();
      console.log(tasksData);
      setTasks(tasksData);
    }
    getTasks();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task.Id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-10">
            <div class="card mask-custom">
              <div class="card-body p-4 text-white">
                <div class="text-center pt-3 pb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                    alt="Check"
                    width="60"
                  />
                  <h2 class="my-4">Task List</h2>
                </div>

                <Link to="/create" className="btn btn-primary">
                  Create Task
                </Link>
                <table class="table text-white mb-0">
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
                            task.Status === "Completed" &&
                            "text-decoration-line-through"
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

                    <tr class="fw-normal">
                      <th>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar 1"
                        />
                        <span class="ms-2">Alice Mayer</span>
                      </th>
                      <td class="align-middle">
                        <span>Call Sam For payments</span>
                      </td>
                      <td class="align-middle">
                        <h6 class="mb-0">
                          <span class="badge bg-danger">High priority</span>
                        </h6>
                      </td>
                      <td class="align-middle">
                        <a href="#!" data-mdb-tooltip-init title="Done">
                          <i class="fas fa-check fa-lg text-success me-3"></i>
                        </a>
                        <a href="#!" data-mdb-tooltip-init title="Remove">
                          <i class="fas fa-trash-alt fa-lg text-warning"></i>
                        </a>
                      </td>
                    </tr>
                    <tr class="fw-normal">
                      <th>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                          alt="avatar 1"
                        />
                        <span class="ms-2">Kate Moss</span>
                      </th>
                      <td class="align-middle">Make payment to Bluedart</td>
                      <td class="align-middle">
                        <h6 class="mb-0">
                          <span class="badge bg-success">Low priority</span>
                        </h6>
                      </td>
                      <td class="align-middle">
                        <a href="#!" data-mdb-tooltip-init title="Done">
                          <i class="fas fa-check fa-lg text-success me-3"></i>
                        </a>
                        <a href="#!" data-mdb-tooltip-init title="Remove">
                          <i class="fas fa-trash-alt fa-lg text-warning"></i>
                        </a>
                      </td>
                    </tr>
                    <tr class="fw-normal">
                      <th>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                          alt="avatar 1"
                        />
                        <span class="ms-2">Danny McChain</span>
                      </th>
                      <td class="align-middle">Office rent</td>
                      <td class="align-middle">
                        <h6 class="mb-0">
                          <span class="badge bg-warning">Middle priority</span>
                        </h6>
                      </td>
                      <td class="align-middle">
                        <a href="#!" data-mdb-tooltip-init title="Done">
                          <i class="fas fa-check fa-lg text-success me-3"></i>
                        </a>
                        <a href="#!" data-mdb-tooltip-init title="Remove">
                          <i class="fas fa-trash-alt fa-lg text-warning"></i>
                        </a>
                      </td>
                    </tr>
                    <tr class="fw-normal">
                      <th>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                          alt="avatar 1"
                        />
                        <span class="ms-2">Alexa Chung</span>
                      </th>
                      <td class="align-middle">Office grocery shopping</td>
                      <td class="align-middle">
                        <h6 class="mb-0">
                          <span class="badge bg-danger">High priority</span>
                        </h6>
                      </td>
                      <td class="align-middle">
                        <a href="#!" data-mdb-tooltip-init title="Done">
                          <i class="fas fa-check fa-lg text-success me-3"></i>
                        </a>
                        <a href="#!" data-mdb-tooltip-init title="Remove">
                          <i class="fas fa-trash-alt fa-lg text-warning"></i>
                        </a>
                      </td>
                    </tr>
                    <tr class="fw-normal">
                      <th class="border-0">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                        />
                        <span class="ms-2">Ben Smith</span>
                      </th>
                      <td class="border-0 align-middle">
                        Ask for Lunch to Clients
                      </td>
                      <td class="border-0 align-middle">
                        <h6 class="mb-0">
                          <span class="badge bg-success">Low priority</span>
                        </h6>
                      </td>
                      <td class="border-0 align-middle">
                        <a href="#!" data-mdb-tooltip-init title="Done">
                          <i class="fas fa-check fa-lg text-success me-3"></i>
                        </a>
                        <a href="#!" data-mdb-tooltip-init title="Remove">
                          <i class="fas fa-trash-alt fa-lg text-warning"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
