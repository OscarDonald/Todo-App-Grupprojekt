import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../feature/taskSlice/taskSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import styles from "./createTask.module.css";

// returns a 'add task' button
// if its klicked a form to creat a tasks displays
export default function CreateTask() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState();
    const [responsibles, setResponsibles] = useState([]);
    const [doDate, setDoDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const { users } = useSelector(state => state.users);
    const [availableUsers, setAvailableUsers] = useState(users);

    const dispatch = useDispatch();
    const toDaysDate = new Date().toLocaleDateString();
    const dateplusOneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()

    // adds all local states to 'newTask' object and dispatch it to 'taskSlice'
    const createTask = (e) => {
        e.preventDefault();
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            doDate: doDate,
            deadline: deadline,
            responible: responsibles,
            column: 0,
        }
        dispatch(addTask(newTask));
        resetLocalStates();
    }

    // resets all local states to its inizial values
    const resetLocalStates = () => {
        setTaskTitle('');
        setTaskDescription('');
        setResponsibles([]);
        setDoDate('');
        setDeadline('');
        setAvailableUsers(users);
        setIsShowModal(false);
    }

    // Finds the user in the availableUsers array whose name matches the targetUser.
    // Adds the found user to the responsibles array
    // Remove the user from the list of available users.
    // Update the list of available users.
    const handleResponsibles = (targetUser) => {
        const newUser = availableUsers.find((user) => user.name === targetUser);
        setResponsibles([...responsibles, newUser]);
        const updatedAvailableUsers = availableUsers.filter((user) => user.name !== targetUser);
        setAvailableUsers(updatedAvailableUsers);
    }

    // Get the user's name from the event target.
    // Find the responsible user with this name.
    // Add this user to the available users list.
    // Remove the user from the responsibles list.
    // Update the responsibles list.
    const handleRemoveResponsibleUser = (e) => {
        const userName = e.target.textContent;
        const targetUser = responsibles.find((user) => user.name === userName);
        setAvailableUsers([...availableUsers, targetUser]);
        const upadatedResponsibles = responsibles.filter((user) => user.name !== userName);
        setResponsibles(upadatedResponsibles);
    }

    return (
        !isShowModal ? (
            <div className={styles.add__task__container}>
                <button
                    className={styles.add__task__btn}
                    onClick={() => {
                        setIsShowModal(prev => !prev);
                        setAvailableUsers(users);
                    }} ><AiOutlinePlusCircle />Add Task</button>
            </div>
        ) : (
            <form className={styles.add__task__form} onSubmit={(e) => createTask(e)}>
                <i className={styles.closeBtn__add__task__modal} onClick={() => setIsShowModal(false)} ><RxCross2 /></i>
                <input
                    className={styles.add__task}
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder='Title'
                    required
                />
                <hr />
                <textarea
                    className={styles.add__task}
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder='Description...'
                    cols={40}
                    rows={10}
                />
                <select onChange={(e) => handleResponsibles(e.target.value)}>
                    <option>select a responible user</option>
                    {availableUsers && availableUsers.map((user) =>
                        <option
                            key={user.id}
                            value={user.name}>{user.name}
                        </option>
                    )}
                </select>

                {responsibles.length > 0 &&
                    <div>
                        <label>Responsible</label>
                        <ul className={styles.responsible__user__ul}>
                            {responsibles.map((user, index) => <li className={styles.responsible__user__li} onClick={handleRemoveResponsibleUser} key={user.name || index}>{user.name}
                            </li>)}
                        </ul>
                    </div>
                }
                <label htmlFor="todo-date">Todo date</label>
                <input
                    id='todo-date'
                    className={styles.add__task}
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
                    className={styles.add__task}
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    min={toDaysDate}
                    max={dateplusOneYear}
                />
                <button className={styles.add__task} type='submit'>Add Task</button>
            </form>
        )
    )
};
