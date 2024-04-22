import React, { useReducer } from 'react';

const initialState = {
  tasks: [],
  taskInput: '',
  dateInput: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TASK_INPUT':
      return { ...state, taskInput: action.payload };
    case 'SET_DATE_INPUT':
      return { ...state, dateInput: action.payload };
    case 'ADD_TASK':
      if (state.taskInput.trim() === '' || state.dateInput.trim() === '') return state;
      const newTask = {
        description: state.taskInput,
        date: state.dateInput,
        completed: false
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        taskInput: '',
        dateInput: ''
      };
    case 'TOGGLE_TASK_COMPLETION':
      const newTasks = [...state.tasks];
      newTasks[action.payload].completed = !newTasks[action.payload].completed;
      return { ...state, tasks: newTasks };
    case 'REMOVE_TASK':
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(action.payload, 1);
      return { ...state, tasks: updatedTasks };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTaskInputChange = (e) => {
    dispatch({ type: 'SET_TASK_INPUT', payload: e.target.value });
  };

  const handleDateInputChange = (e) => {
    dispatch({ type: 'SET_DATE_INPUT', payload: e.target.value });
  };

  const addTask = () => {
    dispatch({ type: 'ADD_TASK' });
  };

  const toggleTaskCompletion = (index) => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: index });
  };

  const removeTask = (index) => {
    dispatch({ type: 'REMOVE_TASK', payload: index });
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <div>
        <input
          type="text"
          placeholder="Descrição da tarefa"
          value={state.taskInput}
          onChange={handleTaskInputChange}
        />
        <input
          type="date"
          value={state.dateInput}
          onChange={handleDateInputChange}
        />
        <button onClick={addTask}>Adicionar Tarefa</button>
      </div>
      <ul>
        {state.tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.description} - {task.date}
            </span>
            <button onClick={() => removeTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
