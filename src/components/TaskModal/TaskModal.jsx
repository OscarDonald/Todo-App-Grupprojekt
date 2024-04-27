import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeTask, editTask } from '../../feature/taskSlice/taskSlice';
import {setAvailableUsers, setTaskTitle, setTaskDescription, setDoDate, setDeadline, handleResponsibles, handleRemoveResponsibleUser, resetLocalStates, setStates} from '../../feature/modalSlice/modalSlice';



function TaskModal() {
    const { availableUsers, responsibles, taskTitle, taskDescription, doDate, deadline} = useSelector((state) => state.modals)
    const { users } = useSelector(state => state.users);
    const { tasks } = useSelector((state) => state.tasks);
    const { columns } = useSelector((state) => state.columns);
    const { id } = useParams();

    const [show, setShow] = useState(false)
    const [taskData, setTaskData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const toDaysDate = new Date().toLocaleDateString();
    const dateplusOneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString();


    // Find task with id corresponding with id from params
    // If there is a task set available users to all users
    // Set taskdata state to task to be able to access task information outside of the useEffect
    // Set 
    useEffect(() => {
        const task = tasks.find(task => task.id == id)
        if(!task) return
        dispatch(setAvailableUsers(users));
        setTaskData(task);
        dispatch(setStates(task))
        setShow(true);
        
    }, [id]);

    const handleClose = () => {
        const currentPage = location.pathname.substring(0, location.pathname.lastIndexOf('/'))
        navigate(currentPage);
        setShow(false)
        dispatch(resetLocalStates());
    };

    const handleDelete = () => {
        dispatch(removeTask(taskData.id))
        handleClose();
        dispatch(resetLocalStates());
    }

    const handleEdit = () => {
        setIsEditing(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...taskData,
            title: taskTitle,
            description: taskDescription,
            doDate: doDate,
            deadline: deadline,
            responsible: responsibles,
        }
        dispatch(editTask(updatedTask));
        dispatch(resetLocalStates());
        handleClose();
    }

    return (
        <>
            {taskData && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ?  <input 
                    type='text' value={taskTitle}
                    onChange={(e) => dispatch(setTaskTitle(e.target.value))}
                    /> : <h2>{taskTitle}</h2>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isEditing ? (
                        <>
                            <textarea 
                                type="text" 
                                value={taskDescription}
                                onChange={(e) => dispatch(setTaskDescription(e.target.value))}
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
                            {responsibles &&
                                <div>
                                    <label>Responsible</label>
                                    <ul>
                                        {responsibles.map((user, index) => <li onClick={(e) => dispatch(handleRemoveResponsibleUser(e.target.textContent))} key={user.name || index}>{user.name}
                                        </li>)}
                                    </ul>
                                </div>
                            }
                            <input 
                                id='todo-date'
                                type="date"
                                value={doDate ? doDate : toDaysDate}
                                onChange={(e) => dispatch(setDoDate(e.target.value))}
                                min={toDaysDate}
                                max={dateplusOneYear}
                            />
                            <label htmlFor="deadline-input">Deadline</label>
                            <input
                                id='deadline-input'
                                type="date"
                                value={deadline}
                                onChange={(e) => dispatch(setDeadline(e.target.value))}
                                min={toDaysDate}
                                max={dateplusOneYear}
                            />
                        </>
                    ) : (
                        <>
                            <p>{taskDescription}</p>
                            <p>{doDate}</p>
                            <p>{deadline}</p>
                            {responsibles && responsibles.map((user) => <p key={user.id}>{user.name}</p>)}
                            {columns.find(column => column.id === taskData.columnId).title}      
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? (
                        <Button variant="secondary" onClick={(e) => handleSubmit(e)}>
                            Save
                        </Button>

                    ):(
                        <Button variant="secondary" onClick={handleEdit}>
                            Edit
                        </Button>
                    )}
                    <Button variant="primary" onClick={handleDelete}>
                        Delete Task
                    </Button>
                </Modal.Footer>
            </Modal>}

        </>
    );
}

export default TaskModal;