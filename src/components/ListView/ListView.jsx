import React, { useEffect, useState } from 'react'
import styles from './ListView.module.css'
import { Link } from 'react-router-dom'
import "../../index.css"
import { PiArrowBendUpLeftDuotone } from "react-icons/pi";
import { useSelector } from 'react-redux'
import Task from '../Task/Task';
import TaskModal from '../TaskModal/TaskModal';

const ListView = () => {
    // gets tasks from taskSlice.js and saves it to 'tasks'
    const { tasks } = useSelector((state) => state.tasks);

    // loops 'tasks' and return those values in 'tasks' we are using
    const listviewTasks = tasks.map((task) => {
        return {
            id: task.id,
            title: task.title,
            deadline: task.deadline,
            columnId: task.columnId,
            responsible: task.responsible
        };
    });

    // 'Link' handling routing between pages
    // maps out 'listviewTasks' through 'Task.jsx' component 
    return (
        <>
            <div className={styles.listview__container}>
                <Link to={"/"} className={styles.listview__return__btn}> <h3><PiArrowBendUpLeftDuotone /></h3></Link>
                    {listviewTasks.map(task => (
                        <Task task={task} key={task.id} cssClassname={true} />
                    ))}
            </div>
            <TaskModal />
        </>
    )
}

export default ListView