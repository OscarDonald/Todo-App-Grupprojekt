import { useState } from 'react';
import { useSelector } from 'react-redux';

const TaskList = () => {
    const { tasks } = useSelector((state) => state.tasks);
    const [list, setList] = useState(false);

    const taskListStyle = {
        zIndex: '100',
        position: 'absolute',
        top: '0',
        right: '160px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        listStyle: 'none',
        padding: '10px',
        borderRadius: '10px',
        background: '#fff'
    }

    const liStyle = {
        padding: '10px',
        borderRadius: '5px',
        background: '#ddd',
        whiteSpace: 'nowrap'
    }

    const buttonStyle = {
        transform: 'translateY(40%)',
        color: 'white',
        cursor: 'pointer',
        userSelect: 'none'
    }

  return (
    <>
    <p onClick={() => setList(!list)} style={buttonStyle}>TaskList</p>
    {list &&
    <ul style={taskListStyle}>
        {tasks.map(task => <li key={task.id} style={liStyle}>{task.title}</li>)}
    </ul>}
    </>
  )
}

export default TaskList;