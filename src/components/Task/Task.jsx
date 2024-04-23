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
            {task.title && <h4>{task.title}</h4>}
            {task.description && <p>{task.description}</p>}
            {task.doDate && <p>Ska göras: {task.doDate}</p>}
            {task.deadline && <p>Deadline: {task.deadline}</p>}
            {task.responsible.length > 0 && <p>Ansvariga: {task.responsible.map(user => user.name + ' ')}</p>}

        </div>
    )
}