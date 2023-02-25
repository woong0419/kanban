import { useRef, useState } from 'react';
import EditForm from '../addForm/EditForm';
import classes from './Task.module.css';

const Task = ({ item, task, setTask }) => {
  const [btnOpen, setBtnOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const dragOverItem = useRef(null);

  const deleteHandler = (e) => {
    setTask(task.filter((i) => i.id !== item.id));
    setBtnOpen(false);
  };

  const dragStartHandler = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const dragEnterHandler = (e, id) => {
    dragOverItem.current = id;
  };

  const dragEndHandler = (e) => {
    e.preventDefault();
    let newList = [...task];
    const dropId = e.dataTransfer.getData('id');
    const dropIdIndex = newList.findIndex((obj) => obj.id === dropId);
    const overIdIndex = newList.findIndex(
      (obj) => obj.id === dragOverItem.current
    );
    const draggedItem = newList.splice(dropIdIndex, 1)[0];
    newList.splice(overIdIndex, 0, draggedItem);
    dragOverItem.current = null;
    setTask(newList);
  };

  return (
    <div
      className={classes['task-card']}
      draggable
      onDragStart={(e) => {
        dragStartHandler(e, item.id);
      }}
      onDragEnter={(e) => {
        dragEnterHandler(e, item.id);
      }}
      onDrop={(e) => {
        dragEndHandler(e);
      }}
    >
      <div className={classes['task-card-header']}>
        <p>{item.task}</p>
        <button onClick={(e) => setBtnOpen((prev) => !prev)}>...</button>
        {btnOpen && (
          <div className={classes['task-card-opt']}>
            <button onClick={(e) => setEditFormOpen((prev) => !prev)}>
              Edit
            </button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        )}
      </div>
      <div className={classes['task-card-date']}>
        <p>{item.due}</p>
      </div>
      {editFormOpen && (
        <EditForm
          item={item}
          task={task}
          setTask={setTask}
          setEditFormOpen={setEditFormOpen}
          setBtnOpen={setBtnOpen}
        />
      )}
    </div>
  );
};

export default Task;
