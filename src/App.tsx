import React, { useState } from 'react';
import { forEachChild } from 'typescript';
import './App.css';

type Task = {
  text: string;
  isFinished: boolean;
  edit: boolean;
  editText: string;
  show: boolean;
};

const topMsg = 'Ievadi darāmo darbiņu!!!';

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTask, setInputTask] = useState('');
  const [error, setError] = useState<string[]>([topMsg]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(event.target.value);
  };

  const editFieldChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTasks = [...tasks];
    newTasks[index].editText = event.target.value;
    setTasks(newTasks);
  };

  const addTaskButtonClickHandler = () => {
    if (inputTask !== '') {
      setTasks([
        ...tasks,
        {
          text: inputTask,
          isFinished: false,
          edit: false,
          editText: '',
          show: true,
        },
      ]);
      setInputTask('');
      setError([topMsg]);
    } else {
      setError(["Neatstāj tukšu pirms spied 'Add Task Pogu' pogu", 'X']);
    }
  };

  // const copyTask = (index: number) => {
  //   const newTasks = [...tasks, {
  //     text: tasks[index].text,
  //     isFinished: tasks[index].isFinished,
  //     edit: tasks[index].edit,
  //     editText: tasks[index].editText,
  //   }];
  //   setTasks(newTasks);
  // };

  const copyTask = (index: number) => {
    const newTasks = [...tasks, tasks[index]];
    setTasks(newTasks);
  };

  const checkboxChangeHandler = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].isFinished = !newTasks[index].isFinished;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    tasks.splice(index, 1);
    setTasks([...tasks]);
  };

  const editTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].edit = !newTasks[index].edit;
    newTasks[index].editText = newTasks[index].text;
    setTasks(newTasks);
  };

  const saveEditedTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].edit = !newTasks[index].edit;
    newTasks[index].text = newTasks[index].editText;
    newTasks[index].editText = '';
    setTasks(newTasks);
  };

  const cancelEditingText = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].edit = !newTasks[index].edit;
    setTasks(newTasks);
  };

  const showCompleted = () => {
    const newTasks = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
      if (newTasks[i].isFinished) {
        newTasks[i].show = true;
      } else {
        newTasks[i].show = false;
      }
    }
    setTasks(newTasks);
  };

  const showMustDo = () => {
    const newTasks = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
      if (newTasks[i].isFinished) {
        newTasks[i].show = false;
      } else {
        newTasks[i].show = true;
      }
    }
    setTasks(newTasks);
  };

  const showAll = () => {
    const newTasks = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
      newTasks[i].show = true;
    }
    setTasks(newTasks);
  };

  // const newTasks = tasks.map(task => {
  //   if (task.isFinished){
  //     task.show = true;
  //   } else {
  //     task.show = false;
  //   }
  //   return task;
  // });

  return (
    <div className="todo-app">
      <h3 className="todo__error-msg">
        {error[0]}{' '}
        <button
          type="button"
          className="todo__error-cancel"
          onClick={() => setError([topMsg])}
        >
          {error[1]}
        </button>
      </h3>
      <input type="text" value={inputTask} onChange={inputChangeHandler} />
      <button type="button" onClick={addTaskButtonClickHandler}>
        Add New Task
      </button>
      <button type="button" onClick={showCompleted}>
        Show Completed
      </button>
      <button type="button" onClick={showMustDo}>Show Must Do </button>
      <button type="button" onClick={showAll}>Show All</button>
      <button type="button" onClick={() => setTasks([])}>
        Delete All
      </button>
      <div>
        {tasks.map((task, index) => (
          <div key={index.toString()} className="todo__task-output">
            {task.show ? (
              <div>
                {!task.edit ? (
                  <div>
                    <input
                      id={`${index}`}
                      checked={task.isFinished}
                      type="checkbox"
                      onChange={() => checkboxChangeHandler(index)}
                    />
                    <label htmlFor={`${index}`} className="todo__task-text">
                      {task.text} - {task.isFinished ? 'Done' : 'Must Do'}
                    </label>
                    <button type="button" onClick={() => editTask(index)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteTask(index)}>
                      Delete
                    </button>
                    <button type="button" onClick={() => copyTask(index)}>
                      Copy This Task (DON'T USE)
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={task.editText}
                      onChange={(event) => editFieldChangeHandler(event, index)}
                    />
                    <button type="button" onClick={() => saveEditedTask(index)}>
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => cancelEditingText(index)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>-</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
