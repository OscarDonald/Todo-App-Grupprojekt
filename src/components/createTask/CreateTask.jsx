import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../feature/taskSlice/taskSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import "../createTask/createTask.css";

export default function CreateTask() {

    const [isShowModal, setIsShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState();
    const [responsibles, setResponsibles] = useState([]);
    const [doDate, setDoDate] = useState('');
    const [deadline, setDeadline] = useState('');

    const dispatch = useDispatch();
    const toDaysDate = new Date().toLocaleDateString();
    const dateplusOneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()

    const createTask = (e) => {
        e.preventDefault();
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            doDate: doDate,
            deadline: deadline,
            responible: responsibles,
        }
        dispatch(addTask(newTask));
        resetLocalStates();
    }

    const resetLocalStates = () => {
        setTaskTitle('');
        setTaskDescription('');
        setResponsibles([]);
        setDoDate('');
        setDeadline('');
        setIsShowModal(false);
    }

    return (
        <div className='add-task-container'>
            <button
                className='add-task-btn'
                onClick={() => setIsShowModal(prev => !prev)} ><AiOutlinePlusCircle />Add Task</button>
            {isShowModal &&
                <form onSubmit={(e) => createTask(e)}>
                    <input
                        className='add-task'
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder='Title'
                        required
                    />
                    <hr />
                    <textarea
                        className='add-task'
                        type="text"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder='Description...'
                        cols={40}
                        rows={10}
                    />
                    <select>
                        {/* spara valda users i setResponisbles(...responsibles, user) */}
                        {/* {userSlice.map(user => <option value={user.name} >{user.name}</option>)} */}
                        <option value="">user1</option>
                    </select>
                    {responsibles &&
                        <ul>
                            {/* eventuellt en useEffect här varje gång responsibles uppdateras? funkar de så? */}
                            {responsibles.map(user => <li>{user}</li>)}
                        </ul>}
                    <label htmlFor="todo-date">Todo date</label>
                    <input
                        id='todo-date'
                        className='add-task'
                        type="date"
                        value={doDate ? doDate : toDaysDate}
                        onChange={(e) => setDoDate(e.target.value)}
                        min={toDaysDate}
                        max={dateplusOneYear}
                    />
                    <hr />
                    <label htmlFor="deadline-input">Deadline</label>
                    <input
                        id='deadline-input'
                        className='add-task'
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={toDaysDate}
                        max={dateplusOneYear}
                    />
                    <button className='add-task' type='submit'>Add Task</button>
                </form>
            }
        </div>
    )
}