import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeTask, editTask } from '../../feature/taskSlice/taskSlice';


function TaskModal() {
    const { tasks } = useSelector((state) => state.tasks);
    const { columns } = useSelector((state) => state.columns);
    const {users} = useSelector(state => state.users)
    const { id } = useParams();
    const [show, setShow] = useState(false)
    const [taskData, setTaskData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const [availableUsers, setAvailableUsers] = useState(users);
    const [responsibles, setResponsibles] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState();
    const [doDate, setDoDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const toDaysDate = new Date().toLocaleDateString();
    const dateplusOneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString();

    const handleResponsibles = (targetUser) => {
        const newUser = availableUsers.find((user) => user.name === targetUser);
        setResponsibles([...responsibles, newUser]);
        const updatedAvailableUsers = availableUsers.filter((user) => user.name !== targetUser);
        setAvailableUsers(updatedAvailableUsers);
    }

    const handleRemoveResponsibleUser = (e) => {
        const userName = e.target.textContent;
        const targetUser = responsibles.find((user) => user.name === userName);
        setAvailableUsers([...availableUsers, targetUser]);
        const upadatedResponsibles = responsibles.filter((user) => user.name !== userName);
        setResponsibles(upadatedResponsibles);
        setTaskData({...taskData, responsibles: upadatedResponsibles})
    }

    const resetLocalStates = () => {
        setTaskTitle('');
        setTaskDescription('');
        setResponsibles([]);
        setDoDate('');
        setDeadline('');
        setAvailableUsers(users);
    }

    useEffect(() => {
        const task = tasks.find(task => task.id == id)
        if(task){
            setTaskData(task);
            setTaskTitle(task.title)
            setTaskDescription(task.description)
            setDoDate(task.doDate)
            setDeadline(task.deadline)
            setResponsibles(task.responsible)
            setShow(true);
        }
    }, [id]);

    const handleClose = () => {
        setShow(false)
        navigate('/');
        resetLocalStates();
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this task?");
        if (isConfirmed) {
            dispatch(removeTask(taskData.id));
            handleClose();
            resetLocalStates();
        }
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
        resetLocalStates();
        handleClose();
    }



    return (
        <>
            {taskData && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ?  <input 
                    type='text' value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    /> : <h2>{taskTitle}</h2>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isEditing ? (
                        <>
                            <textarea 
                                type="text" 
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />

                            <select onChange={(e) => handleResponsibles(e.target.value)}>
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
                                    <ul>
                                        {responsibles.map((user, index) => <li onClick={handleRemoveResponsibleUser} key={user.name || index}>{user.name}
                                        </li>)}
                                    </ul>
                                </div>
                            }
                            <input
                                id='todo-date'
                                type="date"
                                value={doDate ? doDate : toDaysDate}
                                onChange={(e) => setDoDate(e.target.value)}
                                min={toDaysDate}
                                max={dateplusOneYear}
                            />
                            <label htmlFor="deadline-input">Deadline</label>
                            <input
                                id='deadline-input'
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                min={toDaysDate}
                                max={dateplusOneYear}
                            />
                        </>
                    ) : (
                        <>
                            <p>{taskDescription}</p>
                            <p>{doDate}</p>
                            <p>{deadline}</p>
                            {responsibles.map((user) => <p key={user.id}>{user.name}</p>)}
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
                        <Button variant= "primary" onClick={handleEdit}>
                            Edit
                        </Button>
                    )}

                    <Button variant="secondary" onClick={handleDelete}>
                        Delete Task
                    </Button>
                </Modal.Footer>
            </Modal>}

        </>
    );
}

export default TaskModal;