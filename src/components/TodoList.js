import React, { useState, useEffect } from "react";

function TodoList() {
  // Definimos el estado inicial de la lista de tareas como un arreglo vacío.
  const [tasks, setTasks] = useState([]);

  // Definimos el estado para la tarea actual que se está escribiendo en el formulario.
  const [newTask, setNewTask] = useState("");

  // Función para agregar una nueva tarea a la lista.
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Reinicia el campo de entrada
    }
  };

  // Función para eliminar una tarea de la lista.
  const deleteTask = (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    // Simulación de carga de tareas iniciales
    const initialTasks = ["Tarea 1", "Tarea 2", "Tarea 3"];
    setTasks(initialTasks);
  }, []);

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default TodoList;
