import styles from './Task.module.css'

// renders a task
export default function Task({task}) {
    return (
        <div
            // Drag and Drop-function
            draggable
            onDragStart={(e) => { e.dataTransfer.setData('id', task.id) }}
            //
            
            className={`${styles.task__card}`}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Ska göras: {task.doDate}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Ansvariga: {task.responible.map(user => user.name + ' ')}</p>
        </div>
    );
}