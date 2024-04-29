import styles from './ListView.module.css'
import { Link } from 'react-router-dom'
import "../../index.css"
import { PiArrowBendUpLeftDuotone } from "react-icons/pi";
import { useSelector } from 'react-redux'
import Task from '../Task/Task';
import { useState } from 'react';
import TaskModal from '../TaskModal/TaskModal';

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

    // Filter tasks by user
    // Find user by ID
    // If there is no user object, return all formatted tasks
    // Go through the tasks array and map the ID of all responsible users in the task.rerrsponsible array
    // Check if the current user has an ID that matches and return the task 
    // Set listviewTask state to the new filtered array for rendering
    const handleFilter = (id) => {
        const currentUser = users.find((user) => id === user.id);
        if(!currentUser){
            setListviewTasks(formatedTasks)
            return   
        }
        const currentTasks = tasks
            .filter((task) => {
                const responsibleID = task.responsible.map(user => user.id)
                const bool = responsibleID.includes(currentUser.id)
                return bool
            });
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
                        <option value="">All users</option>
                        {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                </div>
                {listviewTasks.length ? listviewTasks.map(task => (
                    <Task task={task} key={task.id} cssClassname={true} />
                )) : <p>Den valda användaren har inga tasks!</p>}
            </div>
            <TaskModal />
        </>
    )
}

export default ListView