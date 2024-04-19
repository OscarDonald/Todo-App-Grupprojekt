import ColumnSettings from '../ColumnSettings/ColumnSettings';
import CreateTask from '../CreateTask/CreateTask';
import Task from '../Task/Task';
import './Columns.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { addColumn } from '../../feature/columnSlice/columnSlice';
import { useDispatch } from 'react-redux';
import { CiSettings } from "react-icons/ci";

const Columns = () => {
    const dispatch = useDispatch();
    const { columns } = useSelector((state) => state.columns);
    const { tasks } = useSelector((state) => state.tasks); // Assuming Redux state structure
    const [editableColumn, setEditableColumn] = useState(null);

    const handleTitleChange = (id, newTitle) => {
        const updatedColumns = columns.map(column => {
            if (column.id === id) {
                return { ...column, title: newTitle };
            }
            return column;
        });
        setColumns(updatedColumns);
    };
    
    return (
        <div className='main'>
            {columns.map(column => (
                <div className='tasks-column' key={column.id}>
                    <div className='column-header-container'>
                        {editableColumn === column.id ? (
                            <input
                            type='text'
                                value={column.title}
                                onChange={e => handleTitleChange(column.id, e.target.value)}
                                autoFocus
                                onBlur={() => handleTitleEditFinish(column.id, column.title)} // Call handleTitleEditFinish on blur
                            />
                        ) : (
                            <h2 className='column-header' onClick={() => setEditableColumn(null)}>
                                {column.title}
                            </h2>
                        )}
                        <ColumnSettings column={column} />
                    </div>
                    <div className='tasks-list'>
                        {column.title === 'To Do' && tasks.map(task => (
                            <Task task={task} key={task.id}/>
                        ))}
                        {/* {columns[0] && <CreateTask /> } */}
                    </div>
                </div>
            ))}
            <button className='add-column-button' onClick={() => dispatch(addColumn())}>
                Add a list
            </button>
        </div>
    );
}

export default Columns;

// const handleDeleteColumn = (id) => {
//     setColumns(columns.filter(column => column.id !== id));
//     setActiveSettingsColumn(null);
// };

// const handleMoveColumn = (id, direction) => {
//     const columnIndex = columns.findIndex(column => column.id === id);
//     const columnToMove = columns.find(column => column.id === id);
//     const newColumns = [...columns];
//     // const columnToMove = newColumns.splice(columnIndex, 1)[0];
//     if(columnIndex === 0 || columnIndex === columns.length - 1) return
//     if (direction === 'left' && columnIndex > 0) {
//         newColumns.splice(columnIndex - 1, 0, columnToMove);
//     } else if (direction === 'right' && columnIndex < columns.length - 1) {
//         newColumns.splice(columnIndex + 1, 0, columnToMove);
//     }
//     setColumns(newColumns);
//     setActiveSettingsColumn(null);
// };

// const handleCopyColumn = (id) => {
//     const columnToCopy = columns.find(column => column.id === id);
//     setColumns([...columns, { id: Date.now(), title: columnToCopy.title }]);
//     setActiveSettingsColumn(null);
// };