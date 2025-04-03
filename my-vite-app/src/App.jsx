import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [activeCard, setActiveCard] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = () => {
    const newTasks = tasks.filter((_, index) => index !== currentTaskIndex);
    setTasks(newTasks);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex] = {
      ...updatedTasks[currentTaskIndex],
      task: editedTaskText
    };
    setTasks(updatedTasks);
    setShowEditModal(false);
  };

  const onDrop = (status, position) => {
    if (activeCard === null) return;
    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((_, index) => index !== activeCard);
    
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status
    });

    setTasks(updatedTasks);
    setActiveCard(null);
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      
      <main className="app_main">
        <div className="columns_container">
          <TaskColumn
            title="To Do Tasks"
            tasks={tasks}
            status="todo"
            setActiveCard={setActiveCard}
            onDrop={onDrop}
            onDelete={(index) => {
              setCurrentTaskIndex(index);
              setShowDeleteModal(true);
            }}
            onEdit={(index) => {
              setCurrentTaskIndex(index);
              setEditedTaskText(tasks[index].task);
              setShowEditModal(true);
            }}
          />
          <TaskColumn
            title="In Progress Tasks"
            tasks={tasks}
            status="doing"
            setActiveCard={setActiveCard}
            onDrop={onDrop}
            onDelete={(index) => {
              setCurrentTaskIndex(index);
              setShowDeleteModal(true);
            }}
            onEdit={(index) => {
              setCurrentTaskIndex(index);
              setEditedTaskText(tasks[index].task);
              setShowEditModal(true);
            }}
          />
          <TaskColumn
            title="Completed Tasks"
            tasks={tasks}
            status="done"
            setActiveCard={setActiveCard}
            onDrop={onDrop}
            onDelete={(index) => {
              setCurrentTaskIndex(index);
              setShowDeleteModal(true);
            }}
            onEdit={(index) => {
              setCurrentTaskIndex(index);
              setEditedTaskText(tasks[index].task);
              setShowEditModal(true);
            }}
          />
        </div>
      </main>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered className="delete-modal">
        <Modal.Header closeButton className="modal-header-delete">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-delete">
          <p>Are you sure you want to delete this task?</p>
          <div className="task-preview">
            <p>"{tasks[currentTaskIndex]?.task}"</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-delete">
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} className="delete-btn">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered className="edit-modal">
        <Modal.Header closeButton className="modal-header-edit">
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-edit">
          <input
            type="text"
            className="edit-task-input"
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
            autoFocus
          />
        </Modal.Body>
        <Modal.Footer className="modal-footer-edit">
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit} className="save-btn">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;