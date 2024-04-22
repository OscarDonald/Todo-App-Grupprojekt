import { useState, useEffect, useRef } from "react";
import { removeColumn, moveColumn, copyColumn } from "../../feature/columnSlice/columnSlice";
import { useDispatch } from "react-redux";
import { CiSettings } from "react-icons/ci";
import './ColumnSettings.css'

// returns a button for 'settings' if its klicked a menu shows with 'delete list', 'move right/left', 'copy list' 
export default function ColumnSettings({column}) {
    const dispatch = useDispatch();
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
        <div className='settings-menu' ref={wrapperRef}>
            <button className='settings-button' onClick={() => setIsOpen(prev => !prev)}>
                <CiSettings className="settings__icon"/>
            </button>
            {isOpen && (
                <ul className='settings-options'>
                    <li onClick={() => dispatch(removeColumn(column.id))}>Delete list</li>
                    <li onClick={() => dispatch(moveColumn({id: column.id, direction: 'left'}))}>Move left</li>
                    <li onClick={() => dispatch(moveColumn({id: column.id, direction: 'right'}))}>Move right</li>
                    <li onClick={() => dispatch(copyColumn(column.id))}>Copy list</li>
                </ul>
            )}
        </div>
    )
}