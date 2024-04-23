import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

function TaskModal({show, setShow}) {
    const [taskData, setTaskData] = useState(null);

    const handleClose = () => setShow(false);

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
                    <p>{taskData.description}</p>
                    <p>Ska göras: {taskData.doDate}</p>
                    <p>Deadline: {taskData.deadline}</p>
                    <p>Ansvariga: {taskData.responible.map(user => user.name + ' ')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Edit
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Delete Task
                    </Button>
                </Modal.Footer>
            </Modal>}
            
        </>
    );
}

export default TaskModal;