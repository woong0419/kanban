import { useState } from 'react';
import classes from './EditForm.module.css';

const EditForm = ({ item, task, setTask, setEditFormOpen, setBtnOpen }) => {
  const [addedTask, setAddedTast] = useState(item.task);
  const [duedate, setDuedate] = useState(item.due);

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = {
      id: item.id,
      task: addedTask,
      due: duedate,
      status: item.status,
    };
    const newList = task.map((i) => {
      if (i.id === item.id) {
        return newTask;
      } else {
        return i;
      }
    });
    setTask(newList);
    setEditFormOpen(false);
    setBtnOpen(false);
  };

  return (
    <form onSubmit={submitHandler} className={classes['edit-form']}>
      <div className={classes['edit-form-input']}>
        <label>
          Task:
          <input
            type='text'
            value={addedTask}
            onChange={(e) => {
              setAddedTast(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Duedate:
          <input
            type='date'
            value={duedate}
            onChange={(e) => {
              e.preventDefault();
              setDuedate(e.target.value);
            }}
          />
        </label>
      </div>
      <button type='submit'>Edit</button>
    </form>
  );
};

export default EditForm;
