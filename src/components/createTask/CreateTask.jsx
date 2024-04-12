import React, { useState } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import "../createTask/createTask.css"

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
        <div className='add-task-container'> 
            <button
                className='add-task-btn'
                onClick={() => setCreateTask(true)} ><AiOutlinePlusCircle />Add Task</button>
            {createTask &&
                <form>
                    <input
                        className='add-task'
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder='Title'
                    
                    />{/* title */}
                    <hr />
                    <textarea
                        className='add-task'
                        type="text"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder='Description...'
                        cols={40}
                        rows={10}
                    
                    />{/* desctiption */}
                    <select>
                        <option value="">{/* en för varje user */}</option>
                    </select>
                    <label>Todo date</label>
                    <input
                        className='add-task'
                        type="date"
                        value={doDate ? doDate : toDaysDate.toLocaleDateString()}
                        onChange={(e) => setDoDate(e.target.value)}
                        min={toDaysDate.toLocaleDateString()}
                        max={dateplusOneYear.toLocaleDateString()}
                    />{/* doDate */}
                    <hr />
                    <label>Deadline</label>
                    <input
                        className='add-task'
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={toDaysDate.toLocaleDateString()}
                        max={dateplusOneYear.toLocaleDateString()}
                    /> {/* deadline date */}
                    <button
                        className='add-task'
                        type='submit'
                        onClick={(e) => addTask(e)}
                    >Add Task</button>
                </form>
            }
        </div>
    )
}



// id: '3',
// title: 'äta',
// description: 'frukost',
// doDate: '',
// deadline: '',
// responible: [],
