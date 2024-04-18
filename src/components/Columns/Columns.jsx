import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import './Columns.css';

const Columns = () => {
    const [columns, setColumns] = useState([
        { id: 1, title: 'To Do' },
        { id: 2, title: 'Doing' },
        { id: 3, title: 'Done' }
    ]);

    const { tasks } = useSelector((state) => state.tasks); // Assuming Redux state structure

    const [editableColumn, setEditableColumn] = useState(null);
    const [activeSettingsColumn, setActiveSettingsColumn] = useState(null);

    const handleTitleChange = (id, newTitle) => {
        const updatedColumns = columns.map(column => {
            if (column.id === id) {
                return { ...column, title: newTitle };
            }
            return column;
        });
        setColumns(updatedColumns);
    };

    const handleDeleteColumn = (id) => {
        setColumns(columns.filter(column => column.id !== id));
        setActiveSettingsColumn(null);
    };

    const handleMoveColumn = (id, direction) => {
        const columnIndex = columns.findIndex(column => column.id === id);
        const newColumns = [...columns];
        const columnToMove = newColumns.splice(columnIndex, 1)[0];
        if (direction === 'left' && columnIndex > 0) {
            newColumns.splice(columnIndex - 1, 0, columnToMove);
        } else if (direction === 'right' && columnIndex < columns.length - 1) {
            newColumns.splice(columnIndex + 1, 0, columnToMove);
        }
        setColumns(newColumns);
        setActiveSettingsColumn(null);
    };

    const handleCopyColumn = (id) => {
        const columnToCopy = columns.find(column => column.id === id);
        setColumns([...columns, { id: Date.now(), title: columnToCopy.title }]);
        setActiveSettingsColumn(null);
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
                        <div className='settings-menu'>
                            {activeSettingsColumn === column.id && (
                                <ul className='settings-options'>
                                    <li onClick={() => handleDeleteColumn(column.id)}>Delete list</li>
                                    <li onClick={() => handleMoveColumn(column.id, 'left')}>Move left</li>
                                    <li onClick={() => handleMoveColumn(column.id, 'right')}>Move right</li>
                                    <li onClick={() => handleCopyColumn(column.id)}>Copy list</li>
                                </ul>
                            )}
                            <button className='settings-button' onClick={() => setActiveSettingsColumn(column.id)}>
                                ⋮
                            </button>
                        </div>
                    </div>
                    <div className='tasks-list'>
                  {column.title === 'To Do' && tasks.map(task => (
                    <div key={task.id}
                    className='task-card'>
                              {console.log(task.responible)}
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <p>Ska göras: {task.doDate}</p>
                                <p>Deadline: {task.deadline}</p>
                            <p>Ansvariga: {task.responible.map(user => user.name + ' ')}</p>
                
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button className='add-column-button' onClick={() => setColumns([...columns, { id: Date.now(), title: 'New List' }])}>
                Add a list
            </button>
        </div>
    );
}

export default Columns;
