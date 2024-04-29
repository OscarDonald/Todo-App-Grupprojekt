import styles from './Task.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// returns rendering of a task
export default function Task({ task, cssClassname }) {
    const { columns } = useSelector((state) => state.columns);
    const location = useLocation();
    console.log(location.pathname)

    function getColumnClassName(columnId) {
        const columnObject = columns.find(column => columnId === column.id)
        switch (columnObject.title) {
            case "Todo":
                return styles.column__todo;
            case "Doing":
                return styles.column__doing;
            case "Done":
                return styles.column__done;
            default:
                return styles.column__default;
        }
    }

    const navigate = useNavigate();
    return (
        <div
            // Drag and Drop-function
            draggable
            onDragStart={(e) => { e.dataTransfer.setData('id', task.id) }} // transport key('id) with value (task.id)
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
                        {task.responsible.map(user => <p className={styles.listview__responsible} key={user.id}>{user.initials}</p>)}
                    </div>}
                {task.columnId &&
                    <div className={`${styles.listview__column__title__container} ${getColumnClassName(task.columnId)}` }>
                        <p className={`${styles.listview__column__title}`}>
                            {columns.map(column => column.id === task.columnId ? column.title : null)}
                            {task.column}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}