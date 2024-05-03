import ColumnSettings from '../ColumnSettings/ColumnSettings';
import CreateTask from '../createTask/CreateTask';
import Task from '../Task/Task';
import TaskModal from '../Task/TaskModal/TaskModal';
import styles from "./Columns.module.css"
import { useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { addColumn, updateTitle } from '../../feature/columnSlice/columnSlice';
import { updateTask } from '../../feature/taskSlice/taskSlice';
import { useDispatch } from 'react-redux';

const Columns = () => {
    const dispatch = useDispatch();
    const { columns } = useSelector((state) => state.columns);
    const { tasks } = useSelector((state) => state.tasks);
    const [editableColumn, setEditableColumn] = useState(null);

    // Handledrop function
    // Fetches data with key as id
    // Finds the task that has the same id as task.id
    // Updates the moved task with new columnId
    // If task.id is equal to the updated task.id, it sends the updated version of the task; otherwise, 
    //it just sends the task, which means the task that does not match task.id has not moved.
    function handleDrop(e, columnId) {
        e.preventDefault();
        const id = e.dataTransfer.getData('id'); 
        const task = tasks.find(task => task.id === id);
        const updatedTask = { ...task, columnId}
        const updatedTasks = tasks.map(task => {
            return task.id === updatedTask.id ? updatedTask : task;
        });

        dispatch(updateTask(updatedTasks));
    }



    // ÄNDRINGAR 
    // Update title utflyttad till slice
    // handleFinishEdit borttagen och utbytt mot setEditableColumn
    // Rendering av add task läggs endast till om columnID matchar ID av första kolumnen i columns
    // Tasks har numera en property som säger vilken kolumn de tillhör, value är kolumnens index (fungerar dåligt när man tar bort kolumner och detta kommer behövas bytas men är det smidigaste med hårdkodade tasks)
    // När vi sen gör tasks så kan vi lägga till tasks.column som ID:t av första kolumen.
    // La till else return i move-funktionen för att förhindra att kolumnerna flyttades för långt

    
    return (
        
        <div className={styles.main}>
            {/* {columns.map(column => console.log(column.title))} */}
            {columns.map(column => (
                <div

                    onDragOver={(e) => { e.preventDefault() }}
                    onDrop={(e) => {handleDrop(e, column.id)}}
                    className={styles.tasks__column} key={column.id}>
                    <div className={styles.column__header__container}>
                        {editableColumn === column.id ? (
                            <input
                                type='text'
                                value={column.title}
                                onChange={(e) => dispatch(updateTitle({id: column.id, title: e.target.value}))}
                                autoFocus
                                onBlur={() => setEditableColumn(null)} // Call handleTitleEditFinish on blur
                            />
                        ) : (
                            <h2 className={styles.column__header} onDoubleClick={() => setEditableColumn(column.id)}>
                                {column.title}
                            </h2>
                        )}
                        <ColumnSettings column={column}/>
                    </div>
                    <div className={styles.tasks__list}>
                        {column.id === columns[0].id && <CreateTask /> }
                        {tasks.map(task => (
                            task.columnId === column.id &&
                            <Task task={task} key={task.id}/>
                        ))}
                    </div>
                </div>
            ))}
           <button className={styles.add__column__button} onClick={() => dispatch(addColumn())}>
                <span className={styles.plus__icon}>+</span> Add a list
            </button>
            <TaskModal />
        </div>
    );
}

export default Columns;