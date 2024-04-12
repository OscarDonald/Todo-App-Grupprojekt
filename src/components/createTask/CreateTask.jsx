import React, { useState } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function CreateTask() {
    const [createTask, setCreateTask] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState();
    const [doDate, setDoDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const toDaysDate = new Date();
    const dateplusOneYear = new Date(new Date().setFullYear(toDaysDate.getFullYear() + 1))

    const addTask = (e) => {
        e.preventDefault();
        /* dispatchen */
    }

    return (
        <>
            <button onClick={() => setCreateTask(true)} ><AiOutlinePlusCircle />Add Task</button>
            {createTask &&
                <form>
                    <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />{/* title */}
                    <textarea type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />{/* desctiption */}
                    <select>
                        <option value="">{/* en för varje user */}</option>
                    </select>
                    <input type="date"
                        value={doDate ? doDate : toDaysDate.toLocaleDateString()}
                        onChange={(e) => setDoDate(e.target.value)}
                        min={toDaysDate.toLocaleDateString()}
                        max={dateplusOneYear.toLocaleDateString()}
                    />{/* doDate */}
                    <input type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={toDaysDate.toLocaleDateString()}
                        max={dateplusOneYear.toLocaleDateString()}
                    /> {/* deadline date */}
                    <button type='submit' onClick={(e) => addTask(e)} >Add Task</button>
                </form>
            }
        </>
    )
}



// id: '3',
// title: 'äta',
// description: 'frukost',
// doDate: '',
// deadline: '',
// responible: [],
