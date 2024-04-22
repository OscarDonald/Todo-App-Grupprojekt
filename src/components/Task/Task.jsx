import './Task.css'

// renders a task
export default function Task({task}) {
    return (
        <div className='task-card'>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Ska göras: {task.doDate}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Ansvariga: {task.responible.map(user => user.name + ' ')}</p>
        </div>
    )
}