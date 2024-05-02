import { useState, useEffect, useRef } from "react";
import { removeColumn, moveColumn, copyColumn } from "../../feature/columnSlice/columnSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxDotsHorizontal } from "react-icons/rx";
import styles from './ColumnSettings.module.css'
import { Link } from "react-router-dom";
import taskSlice from "../../feature/taskSlice/taskSlice";


// returns a button for 'settings' if its klicked a menu shows with 'delete list', 'move right/left', 'copy list' 
export default function ColumnSettings({ column }) {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const confirmDelete = () => {
    const sameColumnId = tasks.some(task => task.columnId === column.id);

    const confirmDlt = sameColumnId ?
      window.confirm('Please delete or move tasks in list before deleting.') :
      window.confirm('Do you want to delete this list?');
    
    if (!sameColumnId) {
      dispatch(removeColumn(column.id));
      // window.location.reload();
      ;
    }
  };

    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    
    // Function to detect click outside menu
    // If detected modal is closed and active column reset
    // Cleanup function removes eventlisteners to prevent them stacking
    // Dependency array of wrapperRef
    // IIFE to initiate on load with wrapper ref as parameter
    (function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setIsOpen(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    })(wrapperRef)

  return (
    <div className={styles.settings__menu} ref={wrapperRef}>
      <button className={styles.settings__button} onClick={() => setIsOpen(prev => !prev)}>
        <RxDotsHorizontal className={styles.settings__icon} />
      </button>
      {isOpen && (
        <ul className={styles.settings__options}>
          <li onClick={confirmDelete}>Delete list</li>
          <li onClick={() => dispatch(moveColumn({ id: column.id, direction: 'left' }))}>Move left</li>
          <li onClick={() => dispatch(moveColumn({ id: column.id, direction: 'right' }))}>Move right</li>
          <li onClick={() => dispatch(copyColumn(column.id))}>Copy list</li>
          <Link to={"/listview"} style={{ textDecoration: "none", color: "black" }}><li>ListView</li></Link>
        </ul>
      )}
    </div>
  )
}