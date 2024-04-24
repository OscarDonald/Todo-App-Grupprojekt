import styles from './Task.module.css'
import { useNavigate } from 'react-router-dom';

// renders a task
export default function Task({ task, cssClassname }) {
    const navigate = useNavigate();
    return (

        <div
            // Drag and Drop-function
            draggable
            onDragStart={(e) => { e.dataTransfer.setData('id', task.id) }} // transporterar key('id) med value (task.id)
            className={cssClassname ? `${styles.listview__tasks}` : `${styles.task__card}`}
            onClick={() => navigate(`/${task.id}`)}
            >
            {task.title && <h4>{task.title}</h4>}
            {task.deadline && <p>Deadline: {task.deadline}</p>}
            {task.responsible.length > 0 && <p>Ansvariga: {task.responsible.map(user => user.name + ' ')}</p>}
            {task.column && <p>{task.column}</p>}

        </div>
    );
}