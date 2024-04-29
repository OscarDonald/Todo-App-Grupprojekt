import styles from './ListView.module.css'
import { Link } from 'react-router-dom'
import "../../index.css"
import { PiArrowBendUpLeftDuotone } from "react-icons/pi";
import { useSelector } from 'react-redux'
import Task from '../Task/Task';
import { useState } from 'react';

const ListView = () => {
    // gets tasks from taskSlice.js and saves it to 'tasks'
    const { tasks } = useSelector((state) => state.tasks);
    const { users } = useSelector((state) => state.users);

    // loops 'tasks' and return those values in 'tasks' we are using
    const formatedTasks = tasks.map((task) => {
        return {
            id: task.id,
            title: task.title,
            deadline: task.deadline,
            columnId: task.columnId,
            responsible: task.responsible
        };
    });

    const [listviewTasks, setListviewTasks] = useState(formatedTasks)

    const handleFilter = (id) => {
        // console.log(users, 'users')
        console.log(typeof id, 'id')
        const currentUser = users.find((user) => id === user.id);
        // console.log(tasks, 'tasks')
        const currentTasks = tasks
            .filter((task) => {
                console.log(task.responsible, 'task')
                    console.log(currentUser, 'currentUser')
                    const user = task.responsible.includes(currentUser)
                    console.log(user, 'user')
                return user
            });
        // console.log(currentTasks)
        setListviewTasks(currentTasks)
    }

    // 'Link' handling routing between pages
    // maps out 'listviewTasks' through 'Task.jsx' component 
    return (
        <>
            <div className={styles.listview__container}>
                <div className={styles.listview__header}>
                    <Link to={"/"} style={{ color: 'white' }}> <h3><PiArrowBendUpLeftDuotone /></h3></Link>
                    <select
                        className={styles.ListView__filter__btn}
                        onChange={(e) => handleFilter(e.target.value)}
                    >
                        <option value="">Filter by name</option>
                        {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                </div>
                {listviewTasks.map(task => (
                    <Task task={task} key={task.id} cssClassname={true} />
                ))}
            </div>
        </>
    )
}

export default ListView