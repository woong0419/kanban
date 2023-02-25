import { useState, useRef } from 'react';
import Addform from '../../components/addForm/Addform';
import Task from '../../components/task/Task';
import classes from './Kanban.module.css';

const DATA = [
  { id: '1', task: 'task 1', due: '2023-02-28', status: 'todo' },
  { id: '2', task: 'task 2', due: '2023-03-30', status: 'progress' },
  { id: '3', task: 'task 3', due: '2023-02-28', status: 'todo' },
  { id: '4', task: 'task 4', due: '2023-03-29', status: 'progress' },
  { id: '5', task: 'task 5', due: '2023-03-30', status: 'complete' },
];

const Kanban = () => {
  const [task, setTask] = useState(DATA);
  const [todoAddFormOpen, setTodoAddFormOpen] = useState(false);
  const [progAddFormOpen, setProgAddFormOpen] = useState(false);

  const dragOverItem = useRef(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e, status) => {
    const dropId = e.dataTransfer.getData('id');
    const stat = task.find((item) => item.id === dropId).status;
    if (stat !== status) {
      const newList = task.map((item) => {
        if (item.id === dropId) {
          return { ...item, status: status };
        } else {
          return item;
        }
      });
      setTask(newList);
    }
  };

  return (
    <div className={classes['kanban-container']}>
      <div
        className={classes['kanban-block']}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, 'todo')}
      >
        <div
          className={`${classes['kanban-header']} ${classes['header-todo']}`}
        >
          <h2>TO DO</h2>
          <p>({task.filter((item) => item.status === 'todo').length})</p>
        </div>
        <div className={classes['kanban-list']}>
          {task.map(
            (item) =>
              item.status === 'todo' && (
                <Task
                  key={item.id}
                  item={item}
                  task={task}
                  setTask={setTask}
                  dragOverItem={dragOverItem}
                />
              )
          )}
          <div className={classes['kanban-add-form']}>
            {todoAddFormOpen && (
              <Addform
                setTask={setTask}
                task={task}
                setOpenForm={setTodoAddFormOpen}
                status='todo'
              />
            )}
            <button
              onClick={(e) => {
                setTodoAddFormOpen((prev) => !prev);
              }}
              className={classes['kanban-add-form-button']}
            >
              +Add Task
            </button>
          </div>
        </div>
      </div>
      <div
        className={classes['kanban-block']}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, 'progress')}
      >
        <div
          className={`${classes['kanban-header']} ${classes['header-progress']}`}
        >
          <h2>IN PROGRESS</h2>
          <p>({task.filter((item) => item.status === 'progress').length})</p>
        </div>
        <div className={classes['kanban-list']}>
          {task.map(
            (item) =>
              item.status === 'progress' && (
                <Task key={item.id} item={item} task={task} setTask={setTask} />
              )
          )}
          <div className={classes['kanban-add-form']}>
            {progAddFormOpen && (
              <Addform
                setTask={setTask}
                task={task}
                setOpenForm={setProgAddFormOpen}
                status='progress'
              />
            )}
            <button
              onClick={(e) => {
                setProgAddFormOpen((prev) => !prev);
              }}
              className={classes['kanban-add-form-button']}
            >
              +Add Task
            </button>
          </div>
        </div>
      </div>
      <div
        className={classes['kanban-block']}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, 'complete')}
      >
        <div
          className={`${classes['kanban-header']} ${classes['header-complete']}`}
        >
          <h2>COMPLETE</h2>
          <p>({task.filter((item) => item.status === 'complete').length})</p>
        </div>
        <div className={classes['kanban-list']}>
          {task.map(
            (item) =>
              item.status === 'complete' && (
                <Task key={item.id} item={item} task={task} setTask={setTask} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Kanban;
