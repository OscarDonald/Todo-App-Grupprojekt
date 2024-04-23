import React, { useEffect, useState } from 'react'
import styles from './ListView.module.css'
import { Link } from 'react-router-dom'
import "../../index.css"
import { useSelector } from 'react-redux'
import Task from '../Task/Task';

const ListView = () => {

    const { tasks } = useSelector((state) => state.tasks);

    const listviewTasks = tasks.map((task) => {
        return {
            id: task.id,
            title: task.title,
            deadline: task.deadline,
            column: task.column,
            responsible: task.responsible
        };
    });

    console.log(listviewTasks)
    return (
        <>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}> <li style={{ listStyle: 'none' }}><h3>Gå tillbaka</h3></li></Link>

            <div className={styles.listview__container}>
                <div className={styles.listview__tasks}>
                    {listviewTasks.map(task => (
                        <Task task={task} key={task.id} />
                    ))}
                </div>

            </div>
        </>
    )
}

export default ListView