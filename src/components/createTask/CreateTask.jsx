import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../feature/taskSlice/taskSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import styles from "./createTask.module.css";
import {setAvailableUsers, setTaskTitle, setTaskDescription, setDoDate, setDeadline, handleResponsibles, handleRemoveResponsibleUser, resetLocalStates} from '../../feature/modalSlice/modalSlice';


// returns a 'add task' button
// if its klicked a form to creat a tasks displays
export default function CreateTask() {
    const { availableUsers, responsibles, taskTitle, taskDescription, doDate, deadline} = useSelector((state) => state.modals)
    const { users } = useSelector(state => state.users);
    const { columns } = useSelector((state) => state.columns)
    const [isShowModal, setIsShowModal] = useState(false);
    const dispatch = useDispatch();

    const toDaysDate = new Date().toLocaleDateString();
    const dateplusOneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString();

    // adds all local states to 'newTask' object and dispatch it to 'taskSlice'
    const createTask = (e) => {
        e.preventDefault();
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            doDate: doDate,
            deadline: deadline,
            responsible: responsibles,
            columnId: columns[0].id,
        }
        dispatch(addTask(newTask));
        dispatch(resetLocalStates());
        setIsShowModal(false);
    }

    return (
        !isShowModal ? (
            <div className={styles.add__task__container}>
                <button
                    className={styles.add__task__btn}
                    onClick={() => {
                        setIsShowModal(prev => !prev);
                        dispatch(setAvailableUsers(users));
                    }} ><AiOutlinePlusCircle />Add Task</button>
            </div>
        ) : (
            <form className={styles.add__task__form} onSubmit={(e) => createTask(e)}>
                <div className={styles.addtask__modal__header}>
                    <input
                        className={styles.add__task__title}
                        type="text"
                        value={taskTitle}
                        onChange={(e) => dispatch(setTaskTitle(e.target.value))}
                        placeholder='Title'
                        required
                    />
                    <i className={styles.closeBtn__add__task__modal} onClick={() => setIsShowModal(false)} ><RxCross2 /></i>
                </div>
                <hr />
                <textarea
                    className={styles.add__task__description}
                    type="text"
                    value={taskDescription}
                    onChange={(e) => dispatch(setTaskDescription(e.target.value))}
                    placeholder='Description...'
                    cols={40}
                    rows={10}
                />
                <select onChange={(e) => dispatch(handleResponsibles(e.target.value))}>
                    <option>select a responsible user</option>
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
                            {responsibles.map((user, index) => <li className={styles.responsible__user__li} onClick={(e) => dispatch(handleRemoveResponsibleUser(e.target.textContent))} key={user.name || index}>{user.name}
                            </li>)}
                        </ul>
                    </div>
                }
                <label htmlFor="todo-date">Todo date</label>
                <input
                    id='todo-date'
                    className={styles.add__task__btn}
                    type="date"
                    value={doDate ? doDate : toDaysDate}
                    onChange={(e) => dispatch(setDoDate(e.target.value))}
                    min={toDaysDate}
                    max={dateplusOneYear}
                />
                <hr />
                <label htmlFor="deadline-input">Deadline</label>
                <input
                    id='deadline-input'
                    className={styles.add__task__btn}
                    type="date"
                    value={deadline}
                    onChange={(e) => dispatch(setDeadline(e.target.value))}
                    min={toDaysDate}
                    max={dateplusOneYear}
                />
                <button className={styles.add__task__btn} type='submit'>Add Task</button>
            </form>
        )
    )
}
