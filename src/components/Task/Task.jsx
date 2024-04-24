import styles from './Task.module.css'

// renders a task
export default function Task({ task, cssClassname }) {
    return (

        <div
              // Drag and Drop-function
              draggable
              onDragStart={(e) => { e.dataTransfer.setData('id', task.id) }}
              //
            className={cssClassname ? `${styles.listview__tasks}` : `${styles.task__card}`}>
            {task.title && <h4>{task.title}</h4>}
            {task.deadline && <p>Deadline: {task.deadline}</p>}
            {task.responsible.length > 0 && <p>Ansvariga: {task.responsible.map(user => user.name + ' ')}</p>}
            {task.column && <p>{task.column}</p>}

        </div>
    );
}