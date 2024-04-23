import styles from './Task.module.css'
import {useNavigate} from 'react-router-dom'

// renders a task
export default function Task({ task, setShow }) {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/${task.id}`);
        setShow(true);
    }

    return (
        <div className={styles.task__card}  onClick={handleClick}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Ska göras: {task.doDate}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Ansvariga: {task.responible.map(user => user.name + ' ')}</p>
        </div>
    )
}