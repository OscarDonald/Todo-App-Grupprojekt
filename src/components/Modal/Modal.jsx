import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeTask } from '../../feature/taskSlice/taskSlice';


function TaskModal({show, setShow}) {
    const [taskData, setTaskData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate()
    const handleClose = () => {
        setShow(false)
        navigate('/');
    };

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(removeTask(taskData.id))
        handleClose();
    }

    const { tasks } = useSelector((state) => state.tasks);
    const { id } = useParams();

    useEffect(() => {
        const task = tasks.find(task => task.id == id)
        setTaskData(task);
    }, [id]);


    return (
        <>
            {taskData && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{taskData.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Edit
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete Task
                    </Button>
                </Modal.Footer>
            </Modal>}

        </>
    );
}

export default TaskModal;