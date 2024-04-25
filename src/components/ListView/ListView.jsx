import React, { useEffect, useState } from 'react'
import styles from './ListView.module.css'
import { Link } from 'react-router-dom'
import "../../index.css"
import { useSelector } from 'react-redux'
import Task from '../Task/Task';

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
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}> <li style={{ listStyle: 'none' }}><h3>Gå tillbaka</h3></li></Link>
            <div className={styles.listview__container}>
                    {listviewTasks.map(task => (
                        <Task task={task} key={task.id} cssClassname={true} />
                    ))}
            </div>
        </>
    )
}

export default ListView