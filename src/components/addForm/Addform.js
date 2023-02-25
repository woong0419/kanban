import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import classes from './Addform.module.css';

const Addform = ({ task, setTask, setOpenForm, status }) => {
  const [addedTask, setAddedTast] = useState('');
  const [duedate, setDuedate] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuid(),
      task: addedTask,
      due: duedate,
      status: status,
    };
    setTask([...task, newTask]);
    setOpenForm(false);
  };

  return (
    <form onSubmit={submitHandler} className={classes['add-form']}>
      <div className={classes['add-form-input']}>
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
      <button type='submit'>Add</button>
    </form>
  );
};

export default Addform;
