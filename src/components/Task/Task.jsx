import styles from './Task.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// returns rendering of a task
export default function Task({ task, cssClassname }) {
    const { columns } = useSelector((state) => state.columns);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            // Drag and Drop-function
            draggable
            onDragStart={(e) => { e.dataTransfer.setData('id', task.id) }} // transporterar key('id) med value (task.id)
            className={cssClassname ? `${styles.listview__tasks}` : `${styles.task__card}`}
            onClick={() => navigate(location.pathname.includes('listview') ? `/listview/${task.id}` : `/${task.id}`)}
            >
            <div className={styles.listview__container__left}>
                {task.title && <h4>{task.title}</h4>}
                {task.deadline && <p className={styles.listview__deadline}>Deadline: {task.deadline}</p>}
            </div>
            <div className={styles.listview__container__right}>
                {task.responsible.length > 0 &&
                    <div className={styles.listview__responsible__container}>
                        {task.responsible.map(user => <p className={styles.listview__responsible} key={user.id}>{user.name}</p>)}
                    </div>}
                {task.columnId &&
                    <div className={styles.listview__column__title__container}>
                        <p className={styles.listview__column__title}>
                            {columns.map(column => column.id === task.columnId ? column.title : null)}
                            {task.column}</p>
                    </div>
                }
            </div>
        </div>
    );
}